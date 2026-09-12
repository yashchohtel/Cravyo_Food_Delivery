import mongoose from "mongoose";

// Creating a category schema
const foodCategorySchema = new mongoose.Schema({

    // Category name
    name: {
        type: String,
        required: [true, "Category name is required"],
        trim: true,
    },

    // Category image URL from Cloudinary
    image: {
        type: String,
        required: [true, "Category image is required"],
        trim: true,
    },

    // Category image public ID from Cloudinary
    imagePublicId: {
        type: String,
        required: true,
    },

    // Category display order
    order: {
        type: Number,
        default: 0,
    },

    // Show / hide category
    isActive: {
        type: Boolean,
        default: true,
    },

    // Show category on Home Top Categories
    isTopCategory: {
        type: Boolean,
        default: false,
    },

}, { timestamps: true });

// Create category model
const FoodCategory = mongoose.model("FoodCategory", foodCategorySchema);

// export modal
export default FoodCategory;