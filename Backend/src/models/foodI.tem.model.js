import mongoose from "mongoose";

// Creating a food item schema
const foodItemSchema = new mongoose.Schema({

    // Name of the food item
    name: {
        type: String,
        required: [true, "Food item name is required"],
        trim: true
    },

    // Food item image URL from Cloudinary
    image: {
        type: String,
        required: [true, "Food item image is required"],
        trim: true,
    },

    // Food item image public ID from Cloudinary
    imagePublicId: {
        type: String,
        required: true,
    },

    // Description of the food item
    description: {
        type: String,
        required: [true, "Food item description is required"],
        trim: true
    },

    // Price of the food item
    price: {
        type: Number,
        required: [true, "Food item price is required"],
        min: 0
    },

    // Category of the food item
    category: {
        type: String,
        required: [true, "Food item category is required"],
        trim: true
    },

    // Whether the food item is vegetarian
    isVeg: {
        type: Boolean,
        default: true
    },

    // Whether the food item is currently available
    isAvailable: {
        type: Boolean,
        default: true
    },

    // Preparation time of the food item in minutes
    preparationTime: {
        type: Number,
        min: 0
    },

    // Discount percentage on the food item
    discount: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },

    // Average rating of the food item
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },

    // Total number of reviews
    totalReviews: {
        type: Number,
        default: 0
    },

    // Total number of orders
    totalOrders: {
        type: Number,
        default: 0
    },

}, { timestamps: true });

// Create food item model
const FoodItem = mongoose.model("FoodItem", foodItemSchema);

// Export model
export default FoodItem;