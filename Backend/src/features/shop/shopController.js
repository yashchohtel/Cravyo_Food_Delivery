import FoodItem from "../../models/food.item.model.js";
import Shop from "../../models/shop.model.js";
import ErrorHandler from "../../utils/errorHandler.js";
import { deleteFromCloudinary, uploadBufferToCloudinary } from "../../utils/uploadImage.js";

// Create Shop
export const createShop = async (req, res, next) => {

    // Check shop image
    if (!req.file) {
        return next(new ErrorHandler("Shop image is required", 400));
    }

    // Check shop data
    if (!req.body.name) {
        return next(new ErrorHandler("Shop name is required", 400));
    }

    try {

        // Upload shop image to Cloudinary
        const image = await uploadBufferToCloudinary(req.file.buffer, "cravyo/shops");

        // Create shop
        const shop = await Shop.create({
            name: req.body.name,
            image: image.secure_url,
            imagePublicId: image.public_id,
            owner: req.user._id,
            address: {
                street: req.body.street,
                city: req.body.city,
                state: req.body.state,
                pincode: req.body.pincode,
                latitude: Number(req.body.latitude),
                longitude: Number(req.body.longitude)
            }
        });

        res.status(201).json({
            success: true,
            message: "Shop created successfully",
            shop
        });

    } catch (error) {

        // Remove uploaded image if shop creation fails
        if (image?.public_id) {
            await deleteFromCloudinary(image.public_id);
        }

        return next(new ErrorHandler("Shop creation failed. Please try again.", 500));
    }
};

// Get Single Shop
export const getShop = async (req, res, next) => {

    // Find shop
    // Find shop
    const shop = await Shop.findById(req.params.id)
        .populate("owner", "name")
        .populate("foodItems");

    if (!shop) {
        return next(new ErrorHandler("Shop not found", 404));
    }

    res.status(200).json({
        success: true,
        message: "Shop fetched successfully",
        shop,
    });

};

// Update Shop
export const updateShop = async (req, res, next) => {

    // Find shop
    const shop = await Shop.findById(req.params.id);

    if (!shop) {
        return next(new ErrorHandler("Shop not found", 404));
    }

    // Update shop name
    if (req.body.name !== undefined) {
        shop.name = req.body.name;
    }

    // Update address
    if (req.body.street !== undefined) {
        shop.address.street = req.body.street;
    }

    if (req.body.city !== undefined) {
        shop.address.city = req.body.city;
    }

    if (req.body.state !== undefined) {
        shop.address.state = req.body.state;
    }

    if (req.body.pincode !== undefined) {
        shop.address.pincode = req.body.pincode;
    }

    if (req.body.latitude !== undefined) {
        shop.address.latitude = Number(req.body.latitude);
    }

    if (req.body.longitude !== undefined) {
        shop.address.longitude = Number(req.body.longitude);
    }

    // Replace shop image
    if (req.file) {

        const oldPublicId = shop.imagePublicId;

        const newImage = await uploadBufferToCloudinary(req.file.buffer, "cravyo/shops");

        shop.image = newImage.secure_url;
        shop.imagePublicId = newImage.public_id;

        // Delete old image
        if (oldPublicId) {
            await deleteFromCloudinary(oldPublicId);
        }
    }

    await shop.save();

    res.status(200).json({
        success: true,
        message: "Shop updated successfully",
        shop,
    });

};

// Delete Shop
export const deleteShop = async (req, res, next) => {

    // Find shop
    const shop = await Shop.findById(req.params.id);

    if (!shop) {
        return next(new ErrorHandler("Shop not found", 404));
    }

    // Find food items of the shop
    const foodItems = await FoodItem.find({
        shop: shop._id
    });

    // Delete food item images from Cloudinary
    for (const foodItem of foodItems) {
        if (foodItem.imagePublicId) {
            await deleteFromCloudinary(foodItem.imagePublicId);
        }
    }

    // Delete food items of the shop
    await FoodItem.deleteMany({
        shop: shop._id
    });

    // Delete shop image from Cloudinary
    if (shop.imagePublicId) {
        await deleteFromCloudinary(shop.imagePublicId);
    }

    // Delete shop
    await Shop.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: "Shop deleted successfully",
    });

};