import mongoose from "mongoose";

// Creating an order schema
const orderSchema = new mongoose.Schema({

    // User who placed the order
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    // Restaurant details
    restaurant: {

        // Restaurant ID
        restaurantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Shop",
            required: true
        },

        // Restaurant name
        restaurantName: {
            type: String,
            required: true,
            trim: true
        }
    },

    // Delivery assignment record
    deliveryAssignment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DeliveryAssignment",
        default: null
    },

    // Currently assigned delivery boy
    deliveryBoy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },

    // Ordered food items
    items: [{

        // Food item ID
        foodId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "FoodItem",
            required: true
        },

        // Food item name
        name: {
            type: String,
            required: true,
            trim: true
        },

        // Food item image
        image: {
            type: String,
            required: true,
            trim: true
        },

        // Price of one food item
        price: {
            type: Number,
            required: true,
            min: 0
        },

        // Quantity ordered
        quantity: {
            type: Number,
            required: true,
            min: 1
        },

        // Food type
        isVeg: {
            type: Boolean,
            required: true
        }

    }],

    // Delivery address
    deliveryAddress: {

        // Latitude of delivery location
        latitude: {
            type: Number,
            required: true
        },

        // Longitude of delivery location
        longitude: {
            type: Number,
            required: true
        },

        // House or flat number
        houseNumber: {
            type: String,
            required: true,
            trim: true
        },

        // Area of delivery address
        area: {
            type: String,
            required: true,
            trim: true
        },

        // City of delivery address
        city: {
            type: String,
            required: true,
            trim: true
        },

        // Pincode of delivery address
        pincode: {
            type: String,
            required: true,
            trim: true
        }

    },

    // Order pricing details
    pricing: {

        // Total price of food items
        itemTotal: {
            type: Number,
            required: true,
            min: 0
        },

        // Delivery fee
        deliveryFee: {
            type: Number,
            required: true,
            min: 0
        },

        // Taxes and charges
        taxes: {
            type: Number,
            required: true,
            min: 0
        },

        // Final amount to pay
        totalAmount: {
            type: Number,
            required: true,
            min: 0
        }

    },

    // Payment method
    paymentMethod: {
        type: String,
        enum: ["COD", "ONLINE"],
        required: true
    },

    // Current order status
    status: {
        type: String,
        enum: [
            "pending",
            "confirmed",
            "preparing",
            "out_for_delivery",
            "delivered",
            "cancelled"
        ],
        default: "pending"
    }

}, { timestamps: true });

// Creating Order model
const Order = mongoose.model("Order", orderSchema);

export default Order;