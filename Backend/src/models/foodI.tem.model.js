import mongoose from "mongoose";

// Creating a food item schema
const foodItemSchema = new mongoose.Schema({

    // Name of the food item
    name: {
        type: String,
        required: true,
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
        required: true,
        trim: true
    },

    // Price of the food item
    price: {
        type: Number,
        required: true,
        min: 0
    },

    // Category of the food item
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
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

    // Number of times the food item has been ordered
    totalOrders: {
        type: Number,
        default: 0
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
    }

}, {timestamps: true});

const FoodItem = mongoose.model("FoodItem", foodItemSchema);

export default FoodItem;