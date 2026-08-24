import FoodCategory from "../../models/foodCategoryModel.js";
import ErrorHandler from "../../utils/errorHandler.js";
import { deleteFromCloudinary, uploadBufferToCloudinary } from "../../utils/uploadImage.js";

// Create Food Categories
export const createFoodCategories = async (req, res, next) => {

    // Check images
    if (!req.files || req.files.length === 0) {
        return next(new ErrorHandler("At least one category image is required", 400));
    }

    // Check category data
    if (!req.body.categoriesData) {
        return next(new ErrorHandler("Category data is required", 400));
    }

    // variable to store category data
    let categoriesData;

    try {
        categoriesData = JSON.parse(req.body.categoriesData);
    } catch (error) {
        return next(new ErrorHandler("Invalid categoriesData JSON", 400));
    }

    // Validate array
    if (!Array.isArray(categoriesData)) {
        return next(new ErrorHandler("categoriesData must be an array", 400));
    }

    // Images and data count must match
    if (req.files.length !== categoriesData.length) {
        return next(new ErrorHandler("Number of images and category data must be same", 400));
    }

    // variable to store uploded images data
    const uploadedImages = [];

    try {

        // Upload all images
        for (const file of req.files) {

            const image = await uploadBufferToCloudinary(file.buffer, "cravyo/food-categories");

            uploadedImages.push(image);

        }

        // Prepare category documents
        const categories = uploadedImages.map((image, index) => {

            const data = categoriesData[index];

            return {
                name: data.name,
                image: image.secure_url,
                imagePublicId: image.public_id,
                order: Number(data.order ?? index + 1),
                isActive: data.isActive !== undefined ? data.isActive : true,
                isTopCategory: data.isTopCategory !== undefined ? data.isTopCategory : false,
            };

        });

        // Save categories
        const createdCategories = await FoodCategory.insertMany(categories);

        res.status(201).json({
            success: true,
            message: "Food categories created successfully",
            categories: createdCategories,
        });

    } catch (error) {

        // Remove uploaded images if creation fails
        await Promise.all(
            uploadedImages.map((image) =>
                deleteFromCloudinary(image.public_id)
            )
        );

        return next(new ErrorHandler("Food category creation failed. Please try again.", 500));
    }
};

// Get All Food Categories
export const getAllFoodCategories = async (req, res, next) => {

    const categories = await FoodCategory.find().sort({ order: 1 });

    res.status(200).json({
        success: true,
        message: "Food categories fetched successfully",
        categories,
    });

};

// Get Single Food Category
export const getFoodCategory = async (req, res, next) => {

    // Find category
    const category = await FoodCategory.findById(req.params.id);

    if (!category) {
        return next(
            new ErrorHandler("Food category not found", 404)
        );
    }

    res.status(200).json({
        success: true,
        message: "Food category fetched successfully",
        category,
    });

};

// Delete Food Category
export const deleteFoodCategory = async (req, res, next) => {

    // Find category
    const category = await FoodCategory.findById(req.params.id);

    if (!category) {
        return next(
            new ErrorHandler("Food category not found", 404)
        );
    }

    // Delete image from Cloudinary
    if (category.imagePublicId) {
        await deleteFromCloudinary(category.imagePublicId);
    }

    // Delete category
    await FoodCategory.findByIdAndDelete(category._id);

    res.status(200).json({
        success: true,
        message: "Food category deleted successfully",
    });

};

// Toggle Food Category Status
export const toggleFoodCategoryStatus = async (req, res, next) => {

    // Find category
    const category = await FoodCategory.findById(req.params.id);

    if (!category) {
        return next(
            new ErrorHandler("Food category not found", 404)
        );
    }

    // Toggle status
    category.isActive = !category.isActive;

    await category.save();

    res.status(200).json({
        success: true,
        message: `Food category ${category.isActive ? "activated" : "deactivated"} successfully`,
        category,
    });

};

// Update Food Category
export const updateFoodCategory = async (req, res, next) => {

    // Find category
    const category = await FoodCategory.findById(req.params.id);

    if (!category) {
        return next(
            new ErrorHandler("Food category not found", 404)
        );
    }

    const oldOrder = category.order;
    const newOrder = req.body.order !== undefined ? Number(req.body.order) : oldOrder;

    // Reorder categories
    if (newOrder !== oldOrder) {

        // Moving category upward
        if (newOrder < oldOrder) {

            await FoodCategory.updateMany(
                {
                    _id: { $ne: category._id },
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

        // Moving category downward
        else {

            await FoodCategory.updateMany(
                {
                    _id: { $ne: category._id },
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

        category.order = newOrder;
    }

    // Update category name
    if (req.body.name !== undefined) {
        category.name = req.body.name;
    }

    // Update active status
    if (req.body.isActive !== undefined) {
        category.isActive = req.body.isActive;
    }

    // Update top category status
    if (req.body.isTopCategory !== undefined) {
        category.isTopCategory = req.body.isTopCategory;
    }

    // Replace image
    if (req.file) {

        const oldPublicId = category.imagePublicId;

        const newImage = await uploadBufferToCloudinary(req.file.buffer,"cravyo/food-categories");

        category.image = newImage.secure_url;
        category.imagePublicId = newImage.public_id;

        // Delete old image
        if (oldPublicId) {
            await deleteFromCloudinary(oldPublicId);
        }
        
    }

    await category.save();

    res.status(200).json({
        success: true,
        message: "Food category updated successfully",
        category,
    });

};