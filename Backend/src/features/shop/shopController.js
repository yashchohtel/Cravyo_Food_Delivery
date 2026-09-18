import FoodItem from "../../models/food.item.model.js";
import Shop from "../../models/shop.model.js";
import User from "../../models/user.model.js";
import ErrorHandler from "../../utils/errorHandler.js";
import { deleteFromCloudinary, uploadBufferToCloudinary } from "../../utils/uploadImage.js";

// Create Shop
export const createShop = async (req, res, next) => {

    // Check shop image
    if (!req.file) {
        return next(new ErrorHandler("Shop image is required", 400));
    }

    // Check shop name
    if (!req.body.name) {
        return next(new ErrorHandler("Shop name is required", 400));
    }

    // Check if user already has a shop
    const existingShop = await Shop.findOne({ owner: req.user._id });

    if (existingShop) {
        return next(new ErrorHandler("You can create only one shop", 400));
    }

    let image;

    try {

        // Upload shop image to Cloudinary
        image = await uploadBufferToCloudinary(req.file.buffer, "cravyo/shops");

        // Create shop
        const shop = await Shop.create({
            name: req.body.name,
            image: image.secure_url,
            imagePublicId: image.public_id,
            description: req.body.description,
            openingTime: req.body.openingTime,
            closingTime: req.body.closingTime,
            foodType: req.body.foodType,
            owner: req.user._id,
            address: {
                street: req.body.street,
                city: req.body.city,
                state: req.body.state,
                pincode: req.body.pincode,
                mapLocation: req.body.mapLocation,
                latitude: Number(req.body.latitude),
                longitude: Number(req.body.longitude)
            }
        });

        // update user role when resturent is created successfully
        const user = await User.findByIdAndUpdate(
            req.user._id,
            { $addToSet: { roles: "restaurantOwner" } },
            { new: true }
        );
        
        res.status(201).json({
            success: true,
            message: "Shop created successfully",
            shop,
            user
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

    try {

        // Find shop
        const shop = await Shop.findById(req.params.id);

        if (!shop) {
            return next(new ErrorHandler("Shop not found", 404));
        }

        // Check shop ownership
        if (shop.owner.toString() !== req.user._id.toString()) {
            return next(new ErrorHandler("You are not authorized to update this shop", 403));
        }

        // Update shop name
        if (req.body.name !== undefined) {
            shop.name = req.body.name;
        }

        // Update shop description
        if (req.body.description !== undefined) {
            shop.description = req.body.description;
        }

        // Update opening time
        if (req.body.openingTime !== undefined) {
            shop.openingTime = req.body.openingTime;
        }

        // Update closing time
        if (req.body.closingTime !== undefined) {
            shop.closingTime = req.body.closingTime;
        }

        // Update food type
        if (req.body.foodType !== undefined) {
            shop.foodType = req.body.foodType;
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

        if (req.body.mapLocation !== undefined) {
            shop.address.mapLocation = req.body.mapLocation;
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
            shop
        });

    } catch (error) {

        return next(new ErrorHandler("Shop update failed. Please try again.", 500));
    }
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