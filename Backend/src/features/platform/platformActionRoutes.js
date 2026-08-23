import express from "express"; // Express framework for building APIs
import catchAsyncError from "../../middleware/catchAsyncError.js";
import { createPromotionBanners, deletePromotionBanner, getAllPromotionBanners, getPromotionBannerById, togglePromotionBannerStatus, updatePromotionBanner } from "./promotionBannerController.js";
import { isUserAuth } from "../../middleware/auth.js";
import { upload } from "../../middleware/multer.js";
import { authorizeRole } from "../../middleware/authorizeRole.js";
import { createFoodCategories, deleteFoodCategory, getAllFoodCategories, getFoodCategory, toggleFoodCategoryStatus, updateFoodCategory } from "./foodCategoryController.js";

// Creating an instance of Express Router
const platformActionRouter = express.Router();

// PLATFORM ACTION ROUTES -------------------- //

/* PROMOTION BANNEER API'S ↓ ------------------------------------- */

// Create Promotion Banner [POST] - 'http://localhost:5000/api/platformAction/createBanner'
platformActionRouter.post("/createBanner", isUserAuth, authorizeRole("admin"), upload.array("image", 10), catchAsyncError(createPromotionBanners));

// Get All Promotion Banners [GET] - "http://localhost:5000/api/platformAction/getBanners"
platformActionRouter.get("/getBanners", catchAsyncError(getAllPromotionBanners));

// Get Single Promotion Banner [GET] - "http://localhost:5000/api/platformAction/getBanner/BANNER_ID"
platformActionRouter.get("/getBanner/:id", catchAsyncError(getPromotionBannerById));

// Update Promotion Banner [PUT] - "http://localhost:5000/api/platformAction/updateBanner/BANNER_ID"
platformActionRouter.put("/updateBanner/:id", isUserAuth, authorizeRole("admin"), upload.single("image"), catchAsyncError(updatePromotionBanner));

// Delete Promotion Banner [DELETE] - "http://localhost:5000/api/platformAction/deleteBanner/BANNER_ID"
platformActionRouter.delete("/deleteBanner/:id", isUserAuth, authorizeRole("admin"), catchAsyncError(deletePromotionBanner));

// Toggle Promotion Banner Status [PATCH] - "http://localhost:5000/api/platformAction/toggleBannerStatus/BANNER_ID"
platformActionRouter.patch("/toggleBannerStatus/:id", isUserAuth, authorizeRole("admin"), catchAsyncError(togglePromotionBannerStatus));

/* FOOD TOP CATEGORY API'S ↓ ------------------------------------- */

// Create Food Categories [POST] - "http://localhost:5000/api/platformAction/createFoodCategory"
platformActionRouter.post("/createFoodCategory", isUserAuth, authorizeRole("admin"), upload.array("image", 20), catchAsyncError(createFoodCategories));

// Get All Food Categories [GET] - "http://localhost:5000/api/platformAction/getAllFoodCategories"
platformActionRouter.get("/getAllFoodCategories", catchAsyncError(getAllFoodCategories));

// Get Single Food Category [GET] - "http://localhost:5000/api/platformAction/getFoodCategory/:id"
platformActionRouter.get("/getFoodCategory/:id", catchAsyncError(getFoodCategory));

// Delete Food Category [DELETE] - "http://localhost:5000/api/platformAction/deleteFoodCategory/CATEGORY_ID"
platformActionRouter.delete("/deleteFoodCategory/:id", isUserAuth, authorizeRole("admin"), catchAsyncError(deleteFoodCategory));

// Toggle Food Category Status [PATCH] - "http://localhost:5000/api/platformAction/toggleFoodCategoryStatus/CATEGORY_ID"
platformActionRouter.patch("/toggleFoodCategoryStatus/:id", isUserAuth, authorizeRole("admin"), catchAsyncError(toggleFoodCategoryStatus));

// Update Food Category [PUT] - "http://localhost:5000/api/platformAction/updateFoodCategory/CATEGORY_ID"
platformActionRouter.put("/updateFoodCategory/:id", isUserAuth, authorizeRole("admin"), upload.single("image"), catchAsyncError(updateFoodCategory));

export default platformActionRouter; // export user router