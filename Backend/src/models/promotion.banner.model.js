import mongoose from "mongoose";

// Creating a promotion banner schema
const promotionBannerSchema = new mongoose.Schema({

    // Promotion banner image URL from Cloudinary
    image: {
        type: String,
        required: [true, "Promotion banner image is required"],
        trim: true,
    },

    // cloudinary public id
    publicId: {
        type: String,
        required: true,
        trim: true,
    },

    // title
    title: {
        type: String,
        trim: true,
        maxlength: [100, "Title cannot exceed 100 characters"],
    },


    // Where this promotion banner will be displayed
    location: {
        type: String,
        enum: ["home"],
        default: "home",
        required: true,
    },

    // Promotion banner display order
    order: {
        type: Number,
        default: 0,
    },

    // Show / hide promotion banner
    isActive: {
        type: Boolean,
        default: true,
    },

}, { timestamps: true });


// Create promotion banner model
const PromotionBanner = mongoose.model("PromotionBanner", promotionBannerSchema);

// Export promotion banner model
export default PromotionBanner;