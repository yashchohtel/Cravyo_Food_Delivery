





import ErrorHandler from "../../utils/errorHandler.js";
import PromotionBanner from "../../models/promotionBannerSchema.js";
import { deleteFromCloudinary, uploadBufferToCloudinary } from "../../utils/uploadImage.js";

/* PROMOTION BANNEER API'S ↓ ------------------------------------- */

// Create Promotion Banners
export const createPromotionBanners = async (req, res, next) => {

    // Check files
    if (!req.files || req.files.length === 0) {
        return next(new ErrorHandler("At least one image is required", 400));
    }

    // Check banner data
    if (!req.body.bannersData) {
        return next(new ErrorHandler("Banner data is required", 400));
    }

    // Parse banner data
    let bannersData;

    try {
        bannersData = JSON.parse(req.body.bannersData);
    } catch (error) {
        return next(new ErrorHandler("Invalid bannersData JSON", 400));
    }

    // Check array
    if (!Array.isArray(bannersData)) {
        return next(new ErrorHandler("bannersData must be an array", 400));
    }

    // Images and data count must match
    if (req.files.length !== bannersData.length) {
        return next(
            new ErrorHandler("Number of images and banner data must be same", 400)
        );
    }

    // to store data of uploded image
    const uploadedImages = [];

    try {

        // Upload all images
        const uploadResults = await Promise.allSettled(

            // call upload buffer to cloudinary by maping files
            req.files.map((file) =>
                uploadBufferToCloudinary(file.buffer, "cravyo/promotion-banners")
            )

        );

        // Collect successful uploads
        uploadResults.forEach((result) => {

            if (result.status === "fulfilled") {
                uploadedImages.push(result.value);
            }

        });

        // Check upload failure
        const uploadFailed = uploadResults.some(result => result.status === "rejected");

        // If upload fails
        if (uploadFailed) {

            // Remove successful uploads
            await Promise.allSettled(
                uploadedImages.map(image => deleteFromCloudinary(image.public_id))
            );

            // return error
            return next(new ErrorHandler("Banner creation failed. Please try again.", 500));

        }

        // Prepare MongoDB documents
        const banners = uploadedImages.map((image, index) => {

            const data = bannersData[index];

            return {
                image: image.secure_url,
                publicId: image.public_id,
                title: data.title || "",
                location: data.location || "home",
                order: Number(data.order ?? index + 1),
                isActive: data.isActive !== undefined ? data.isActive : true,
            };

        });

        // Save banners
        const createdBanners = await PromotionBanner.insertMany(banners);

        // Response
        res.status(201).json({
            success: true,
            message: "Promotion banners created successfully",
            banners: createdBanners,
        });

    } catch (error) {

        // Remove uploaded images if DB operation fails
        if (uploadedImages.length > 0) {

            await Promise.allSettled(
                uploadedImages.map(image => deleteFromCloudinary(image.public_id))
            );

        }

        console.log("CREATE PROMOTION BANNERS ERROR:", error);

        // return response
        return next(new ErrorHandler("Banner creation failed. Please try again.", 500));
    }

};

// Get All Promotion Banners
export const getAllPromotionBanners = async (req, res, next) => {

    // find banner sorted by order
    const banners = await PromotionBanner.find().sort({ order: 1 });

    // return response
    res.status(200).json({
        success: true,
        count: banners.length,
        banners,
    });

};

// Get Single Promotion Banner
export const getPromotionBannerById = async (req, res, next) => {

    // Find banner by ID
    const banner = await PromotionBanner.findById(req.params.id);

    // Check banner
    if (!banner) {
        return next(new ErrorHandler("Promotion banner not found", 404));
    }

    // Response
    res.status(200).json({
        success: true,
        banner,
    });

};

// Update Promotion Banner
export const updatePromotionBanner = async (req, res, next) => {

    // Find existing banner
    const banner = await PromotionBanner.findById(req.params.id);

    if (!banner) {
        return next(new ErrorHandler("Promotion banner not found", 404));
    }

    // variable to store new image
    let newImage = null;

    try {

        // Upload new image if provided
        if (req.file) {
            newImage = await uploadBufferToCloudinary(req.file.buffer, "cravyo/promotion-banners");
        }

        // Prepare update data
        const updateData = {};

        // update image and publicId
        if (newImage) {
            updateData.image = newImage.secure_url;
            updateData.publicId = newImage.public_id;
        }

        // update location
        if (req.body.location !== undefined) {
            updateData.location = req.body.location;
        }

        // update active status
        if (req.body.isActive !== undefined) {
            updateData.isActive = req.body.isActive === "true";
        }

        // Handle order update
        if (req.body.order !== undefined) {

            const newOrder = Number(req.body.order);
            const oldOrder = banner.order;

            if (newOrder !== oldOrder) {

                // Moving banner upward
                if (newOrder < oldOrder) {

                    await PromotionBanner.updateMany(
                        {
                            _id: { $ne: banner._id },
                            order: {
                                $gte: newOrder,
                                $lt: oldOrder,
                            },
                        },
                        {
                            $inc: { order: 1 },
                        }
                    );

                }

                // Moving banner downward
                else {

                    await PromotionBanner.updateMany(
                        {
                            _id: { $ne: banner._id },
                            order: {
                                $gt: oldOrder,
                                $lte: newOrder,
                            },
                        },
                        {
                            $inc: { order: -1 },
                        }
                    );

                }

                updateData.order = newOrder;
            }
        }

        // Update MongoDB
        const updatedBanner = await PromotionBanner.findByIdAndUpdate(
            req.params.id,
            updateData,
            {
                new: true,
                runValidators: true,
            }
        );

        // Delete old image after successful DB update
        if (newImage && banner.publicId) {
            await deleteFromCloudinary(banner.publicId);
        }

        // Response
        res.status(200).json({
            success: true,
            message: "Promotion banner updated successfully",
            banner: updatedBanner,
        });

    } catch (error) {

        // Delete newly uploaded image if update fails
        if (newImage?.public_id) {
            await deleteFromCloudinary(newImage.public_id);
        }

        console.log("UPDATE PROMOTION BANNER ERROR:", error);

        return next(
            new ErrorHandler("Banner update failed. Please try again.", 500)
        );
    }

};

// Delete Promotion Banner
export const deletePromotionBanner = async (req, res, next) => {

    // Find banner
    const banner = await PromotionBanner.findById(req.params.id);

    if (!banner) {
        return next(new ErrorHandler("Promotion banner not found", 404));
    }

    // Delete image from Cloudinary
    if (banner.publicId) {
        await deleteFromCloudinary(banner.publicId);
    }

    // Delete banner from MongoDB
    await PromotionBanner.findByIdAndDelete(banner._id);

    // Response
    res.status(200).json({
        success: true,
        message: "Promotion banner deleted successfully",
    });

};

// Toggle Promotion Banner Status
export const togglePromotionBannerStatus = async (req, res, next) => {

    // Find banner
    const banner = await PromotionBanner.findById(req.params.id);

    if (!banner) {
        return next(new ErrorHandler("Promotion banner not found", 404));
    }

    // Toggle status
    banner.isActive = !banner.isActive;

    await banner.save();

    res.status(200).json({
        success: true,
        message: `Promotion banner ${banner.isActive ? "activated" : "deactivated"} successfully`,
        banner,
    });

};