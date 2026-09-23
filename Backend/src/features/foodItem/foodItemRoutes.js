import express from "express";
import catchAsyncError from "../../middleware/catchAsyncError.js";
import { isUserAuth } from "../../middleware/auth.js";
import { authorizeRole } from "../../middleware/authorizeRole.js";
import { upload } from "../../middleware/multer.js";
import { addFoodItemReview, createFoodItem, deleteFoodItem, deleteFoodItemReview, getAllFoodItems, getFoodItem, getFoodItemReviews, updateFoodItem } from "./foodItemController.js";

// Creating an instance of Express Router
const foodItemRouter = express.Router();

// FOOD ITEM API'S -------------------- //

// Create Food Item [POST] - "http://localhost:5000/api/foodItem/createFoodItem"
foodItemRouter.post("/createFoodItem", isUserAuth, authorizeRole("restaurantOwner"), upload.single("image"), catchAsyncError(createFoodItem));

// Get Single Food Item [GET] - "http://localhost:5000/api/foodItem/getFoodItem/FOOD_ITEM_ID"
foodItemRouter.get("/getFoodItem/:id", catchAsyncError(getFoodItem));

// Get All Food Items [GET] - "http://localhost:5000/api/foodItem/getAllFoodItems"
foodItemRouter.get("/getAllFoodItems", catchAsyncError(getAllFoodItems));

// Update Food Item [PUT] - "http://localhost:5000/api/foodItem/updateFoodItem/FOOD_ITEM_ID"
foodItemRouter.put("/updateFoodItem/:id", isUserAuth, authorizeRole("restaurantOwner"), upload.single("image"), catchAsyncError(updateFoodItem));

// Delete Food Item [DELETE] - "http://localhost:5000/api/foodItem/deleteFoodItem/FOOD_ITEM_ID"
foodItemRouter.delete("/deleteFoodItem/:id", isUserAuth, authorizeRole("restaurantOwner"), catchAsyncError(deleteFoodItem));

// Add Food Item Review [POST] - "http://localhost:5000/api/foodItem/addReview/FOOD_ITEM_ID"
foodItemRouter.post("/addReview/:id", isUserAuth, catchAsyncError(addFoodItemReview));

// Get Food Item Reviews [GET] - "http://localhost:5000/api/foodItem/getReviews/FOOD_ITEM_ID"
foodItemRouter.get("/getReviews/:id", catchAsyncError(getFoodItemReviews));

// Delete Food Item Review [DELETE] - "http://localhost:5000/api/foodItem/deleteReview/FOOD_ITEM_ID/REVIEW_ID"
foodItemRouter.delete("/deleteReview/:id/:reviewId", isUserAuth, catchAsyncError(deleteFoodItemReview));

export default foodItemRouter; // export food item router