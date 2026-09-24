import express from "express"; // Express framework for building APIs
import { isUserAuth } from "../../middleware/auth.js";
import { authorizeRole } from "../../middleware/authorizeRole.js";
import catchAsyncError from "../../middleware/catchAsyncError.js";
import { upload } from "../../middleware/multer.js";
import { createShop, deleteShop, getMyShop, getNearbyRestaurants, updateShop, updateShopStatus } from "./shopController.js";

// Creating an instance of Express Router
const shopRouter = express.Router();

// Create Shop [POST] - "http://localhost:5000/api/shop/createShop"
shopRouter.post("/createShop", isUserAuth, upload.single("image"), catchAsyncError(createShop));

// Get My Shop [GET] - "/api/shop/getMyShop"
shopRouter.get("/getMyShop", isUserAuth, authorizeRole("restaurantOwner"), catchAsyncError(getMyShop));

// Update Shop [PUT] - "http://localhost:5000/api/shop/updateShop/SHOP_ID"
shopRouter.put("/updateShop/:id", isUserAuth, authorizeRole("restaurantOwner"), upload.single("image"), catchAsyncError(updateShop));

// Delete Shop [DELETE] - "http://localhost:5000/api/shop/deleteShop/SHOP_ID"
shopRouter.delete("/deleteShop/:id", isUserAuth, authorizeRole("restaurantOwner"), catchAsyncError(deleteShop));

// Update Shop Status [PUT] - "http://localhost:5000/api/shop/updateStatus/SHOP_ID"
shopRouter.put("/updateStatus/:id", isUserAuth, authorizeRole("restaurantOwner"), catchAsyncError(updateShopStatus));

// Get Nearby Restaurants [GET] - "/api/shop/getNearbyRestaurants"
shopRouter.get("/getNearbyRestaurants", isUserAuth, catchAsyncError(getNearbyRestaurants));

export default shopRouter; // export shop routerrt