import FoodItem from "../../models/food.item.model.js";
import Shop from "../../models/shop.model.js";
import ErrorHandler from "../../utils/errorHandler.js";
import { deleteFromCloudinary, uploadBufferToCloudinary } from "../../utils/uploadImage.js";

// Create Food Item
export const createFoodItem = async (req, res, next) => {

    // Find shop
    const shop = await Shop.findById(req.body.shop);

    if (!shop) {
        return next(new ErrorHandler("Shop not found", 404));
    }

    if (shop.owner.toString() !== req.user._id.toString()) {
        return next(new ErrorHandler("You are not authorized to add food item to this shop", 403));
    }

    // Check food item image
    if (!req.file) {
        return next(new ErrorHandler("Food item image is required", 400));
    }

    let image = null;

    try {

        // Upload food item image to Cloudinary
        image = await uploadBufferToCloudinary(req.file.buffer, "cravyo/food-items");

        // Create food item
        const foodItem = await FoodItem.create({
            name: req.body.name,
            image: image.secure_url,
            imagePublicId: image.public_id,
            description: req.body.description,
            price: Number(req.body.price),
            category: req.body.category,
            isVeg: req.body.isVeg,
            isAvailable: req.body.isAvailable,
            preparationTime: Number(req.body.preparationTime),
            discount: Number(req.body.discount),
            shop: shop._id
        });

        // Add food item to shop
        shop.foodItems.push(foodItem._id);

        await shop.save();

        res.status(201).json({
            success: true,
            message: "Food item created successfully",
            foodItem,
        });

    } catch (error) {

        // Delete uploaded image if food item creation fails
        if (image?.public_id) {
            await deleteFromCloudinary(image.public_id);
        }

        return next(error);
    }

};

// Get Single Food Item
export const getFoodItem = async (req, res, next) => {

    // Find food item
    const foodItem = await FoodItem.findById(req.params.id).populate("shop", "name");

    if (!foodItem) {
        return next(new ErrorHandler("Food item not found", 404));
    }

    res.status(200).json({
        success: true,
        message: "Food item fetched successfully",
        foodItem,
    });

};

// Get All Food Items
export const getAllFoodItems = async (req, res, next) => {

    // Find all food items
    const foodItems = await FoodItem.find().populate("shop", "name");

    res.status(200).json({
        success: true,
        message: "Food items fetched successfully",
        foodItems,
    });

};

// Update Food Item
export const updateFoodItem = async (req, res, next) => {

    // Find food item
    const foodItem = await FoodItem.findById(req.params.id);

    if (!foodItem) {
        return next(new ErrorHandler("Food item not found", 404));
    }

    // Find shop
    const shop = await Shop.findById(foodItem.shop);

    if (!shop) {
        return next(new ErrorHandler("Shop not found", 404));
    }

    // Check shop ownership
    if (shop.owner.toString() !== req.user._id.toString()) {
        return next(new ErrorHandler("You are not authorized to update this food item", 403));
    }

    // Update food item name
    if (req.body.name !== undefined) {
        foodItem.name = req.body.name;
    }

    // Update description
    if (req.body.description !== undefined) {
        foodItem.description = req.body.description;
    }

    // Update price
    if (req.body.price !== undefined) {
        foodItem.price = Number(req.body.price);
    }

    // Update category
    if (req.body.category !== undefined) {
        foodItem.category = req.body.category;
    }

    // Update vegetarian status
    if (req.body.isVeg !== undefined) {
        foodItem.isVeg = req.body.isVeg;
    }

    // Update availability
    if (req.body.isAvailable !== undefined) {
        foodItem.isAvailable = req.body.isAvailable;
    }

    // Update preparation time
    if (req.body.preparationTime !== undefined) {
        foodItem.preparationTime = Number(req.body.preparationTime);
    }

    // Update discount
    if (req.body.discount !== undefined) {

        const discount = Number(req.body.discount);

        if (discount < 0 || discount > 100) {
            return next(new ErrorHandler("Discount must be between 0 and 100 percent", 400));
        }

        foodItem.discount = discount;
    }

    // Replace food item image
    if (req.file) {

        const oldPublicId = foodItem.imagePublicId;

        const newImage = await uploadBufferToCloudinary(req.file.buffer, "cravyo/food-items");

        foodItem.image = newImage.secure_url;
        foodItem.imagePublicId = newImage.public_id;

        // Delete old image
        if (oldPublicId) {
            await deleteFromCloudinary(oldPublicId);
        }
    }

    await foodItem.save();

    res.status(200).json({
        success: true,
        message: "Food item updated successfully",
        foodItem
    });

};

// Delete Food Item
export const deleteFoodItem = async (req, res, next) => {

    // Find food item
    const foodItem = await FoodItem.findById(req.params.id);

    if (!foodItem) {
        return next(new ErrorHandler("Food item not found", 404));
    }

    // Find shop
    const shop = await Shop.findById(foodItem.shop);

    if (!shop) {
        return next(new ErrorHandler("Shop not found", 404));
    }

    // Check shop ownership
    if (shop.owner.toString() !== req.user._id.toString()) {
        return next(new ErrorHandler("You are not authorized to delete this food item", 403));
    }

    // Delete food item image from Cloudinary
    if (foodItem.imagePublicId) {
        await deleteFromCloudinary(foodItem.imagePublicId);
    }

    // Delete food item
    await FoodItem.findByIdAndDelete(req.params.id);

    // Remove food item from shop
    await Shop.findByIdAndUpdate(
        foodItem.shop,
        {
            $pull: {
                foodItems: foodItem._id
            }
        }
    );

    res.status(200).json({
        success: true,
        message: "Food item deleted successfully"
    });

};

// Add Food Item Review
export const addFoodItemReview = async (req, res, next) => {

    const foodItem = await FoodItem.findById(req.params.id);

    if (!foodItem) {
        return next(new ErrorHandler("Food item not found", 404));
    }

    if (!req.body.rating) {
        return next(new ErrorHandler("Rating is required", 400));
    }

    const rating = Number(req.body.rating);

    if (rating < 1 || rating > 5) {
        return next(new ErrorHandler("Rating must be between 1 and 5", 400));
    }

    foodItem.reviews.push({
        user: req.user._id,
        rating,
        comment: req.body.comment || ""
    });

    const totalRating = foodItem.reviews.reduce((sum, review) => sum + review.rating, 0);

    foodItem.totalReviews = foodItem.reviews.length;
    foodItem.rating = totalRating / foodItem.totalReviews;

    await foodItem.save();

    res.status(201).json({
        success: true,
        message: "Review added successfully",
        foodItem
    });

};

// Get Food Item Reviews
export const getFoodItemReviews = async (req, res, next) => {

    const foodItem = await FoodItem.findById(req.params.id).populate("reviews.user", "name");

    if (!foodItem) {
        return next(new ErrorHandler("Food item not found", 404));
    }

    res.status(200).json({
        success: true,
        message: "Reviews fetched successfully",
        reviews: foodItem.reviews
    });

};

// Delete Food Item Review
export const deleteFoodItemReview = async (req, res, next) => {

    const foodItem = await FoodItem.findById(req.params.id);

    if (!foodItem) {
        return next(new ErrorHandler("Food item not found", 404));
    }

    const review = foodItem.reviews.id(req.params.reviewId);

    if (!review) {
        return next(new ErrorHandler("Review not found", 404));
    }

    if (review.user.toString() !== req.user._id.toString()) {
        return next(new ErrorHandler("You are not authorized to delete this review", 403));
    }

    review.deleteOne();

    const totalRating = foodItem.reviews.reduce((sum, review) => sum + review.rating, 0);

    foodItem.totalReviews = foodItem.reviews.length;
    foodItem.rating = foodItem.totalReviews > 0 ? totalRating / foodItem.totalReviews : 0;

    await foodItem.save();

    res.status(200).json({
        success: true,
        message: "Review deleted successfully"
    });

};