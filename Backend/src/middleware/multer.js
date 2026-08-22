import multer from "multer"; // Import multer for handling file uploads
import path from "path";

// Multer memory storage - File temporary RAM/buffer mein rahegi
const storage = multer.memoryStorage();

// Multer file filter
// const imageFilter = (req, file, cb) => {

//     console.log("FILE MIME TYPE:", file.mimetype);
//     console.log("FILE NAME:", file.originalname);

//     // Allowed image types
//     const allowed = [
//         "image/jpeg",
//         "image/jpg",
//         "image/png",
//         "image/webp"
//     ];

//     if (allowed.includes(file.mimetype)) {
//         cb(null, true); // Accept image
//     } else {
//         cb(new Error("Only images are allowed!"), false); // Reject file
//     }

// };

const imageFilter = (req, file, cb) => {
    const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];

    const extension = path.extname(file.originalname).toLowerCase();

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