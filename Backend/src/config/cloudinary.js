import { v2 as cloudinary } from 'cloudinary'; // import cloduinary
import dotenv from "dotenv"; // Import dotenv for environment variables

// configure dotenv
dotenv.config();

console.log("CLOUDINARY ENV CHECK:", {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY
        ? `******${process.env.CLOUDINARY_API_KEY.slice(-4)}`
        : undefined,
    api_secret_exists: Boolean(process.env.CLOUDINARY_API_SECRET),
    api_secret_length: process.env.CLOUDINARY_API_SECRET?.length,
});

// Configure Cloudinary 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// export Cloudinary for image uploads
export default cloudinary;