import express from "express"; // Express framework for building APIs
import catchAsyncError from "../../middleware/catchAsyncError.js";
import { createPromotionBanner } from "./promotionBannerController.js";
import { isUserAuth } from "../../middleware/auth.js";

// Creating an instance of Express Router
const platformActionRouter = express.Router();

// PLATFORM ACTION ROUTES -------------------- //

// Create Promotion Banner [POST] - 'http://localhost:5000/api/platformAction/createBanner'
platformActionRouter.post("/createBanner", isUserAuth, catchAsyncError(createPromotionBanner));

export default platformActionRouter; // export user router