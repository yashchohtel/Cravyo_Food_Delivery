import multer from "multer"; // Import multer for handling file uploads
import path from "path";

// Multer memory storage - file will be in RAM/buffer temporaryu
const storage = multer.memoryStorage();

// Multer file filter
const imageFilter = (req, file, cb) => {

    // allowed forment
    const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];

    // get file extension
    const extension = path.extname(file.originalname).toLowerCase();

    // show error if file now allowed
    if (allowedExtensions.includes(extension)) {
        cb(null, true);
    } else {
        cb(new Error("Only images are allowed!"));
    }
};

// Create multer upload middleware
export const upload = multer({
    storage: storage,
    fileFilter: imageFilter,
    limits: {
        fileSize: 20 * 1024 * 1024 // 20 MB
    }
}); 