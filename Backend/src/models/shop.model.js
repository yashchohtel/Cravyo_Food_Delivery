import mongoose from "mongoose";

// Creating a shop schema
const shopSchema = new mongoose.Schema({

    // Name of the shop
    name: {
        type: String,
        required: true,
        trim: true
    },

    // Shop image URL from Cloudinary
    image: {
        type: String,
        required: [true, "Shop image is required"],
        trim: true,
    },

    // Shop image public ID from Cloudinary
    imagePublicId: {
        type: String,
        required: true,
    },

    // Owner of the shop
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    // Address of the shop
    address: {

        // Street or area of the shop
        street: {
            type: String,
            required: true,
            trim: true
        },

        // City of the shop
        city: {
            type: String,
            required: true,
            trim: true
        },

        // State of the shop
        state: {
            type: String,
            required: true,
            trim: true
        },

        // Pincode of the shop
        pincode: {
            type: String,
            required: true,
            trim: true
        },

        // Latitude of the shop
        latitude: {
            type: Number,
            required: true
        },

        // Longitude of the shop
        longitude: {
            type: Number,
            required: true
        }
    },

});

const Shop = mongoose.model("Shop", shopSchema);

export default Shop;