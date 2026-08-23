import express from "express"; // Express framework for building APIs
import catchAsyncError from "../../middleware/catchAsyncError.js";
import { createPromotionBanners, getAllPromotionBanners, getPromotionBannerById, updatePromotionBanner } from "./promotionBannerController.js";
import { isUserAuth } from "../../middleware/auth.js";
import { upload } from "../../middleware/multer.js";
import { authorizeRole } from "../../middleware/authorizeRole.js";

// Creating an instance of Express Router
const platformActionRouter = express.Router();

// PLATFORM ACTION ROUTES -------------------- //

// Create Promotion Banner [POST] - 'http://localhost:5000/api/platformAction/createBanner'
platformActionRouter.post("/createBanner", isUserAuth, authorizeRole("admin"), upload.array("image", 10), catchAsyncError(createPromotionBanners));

// Get All Promotion Banners [GET] - "http://localhost:5000/api/platformAction/getBanners"
platformActionRouter.get("/getBanners", catchAsyncError(getAllPromotionBanners));

// Get Single Promotion Banner [GET] - "http://localhost:5000/api/platformAction/getBanner/BANNER_ID"
platformActionRouter.get("/getBanner/:id", catchAsyncError(getPromotionBannerById));

// Update Promotion Banner [PUT] - "http://localhost:5000/api/platformAction/updateBanner/BANNER_ID"
platformActionRouter.put("/updateBanner/:id", isUserAuth, authorizeRole("admin"), upload.single("image"), catchAsyncError(updatePromotionBanner));

export default platformActionRouter; // export user router