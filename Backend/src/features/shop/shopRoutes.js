import express from "express"; // Express framework for building APIs
import { isUserAuth } from "../../middleware/auth.js";
import { authorizeRole } from "../../middleware/authorizeRole.js";
import catchAsyncError from "../../middleware/catchAsyncError.js";
import { upload } from "../../middleware/multer.js";
import { createShop, deleteShop, getShop, updateShop } from "./shopController.js";

// Creating an instance of Express Router
const shopRouter = express.Router();

// Create Shop [POST] - "http://localhost:5000/api/shop/createShop"
shopRouter.post("/createShop", isUserAuth, authorizeRole("restaurantOwner"), upload.single("image"), catchAsyncError(createShop));

// Get Single Shop [GET] - "http://localhost:5000/api/shop/getShop/SHOP_ID"
shopRouter.get("/getShop/:id", catchAsyncError(getShop));

// Update Shop [PUT] - "http://localhost:5000/api/shop/updateShop/SHOP_ID"
shopRouter.put("/updateShop/:id", isUserAuth, authorizeRole("restaurantOwner"), upload.single("image"), catchAsyncError(updateShop));

// Delete Shop [DELETE] - "http://localhost:5000/api/shop/deleteShop/SHOP_ID"
shopRouter.delete("/deleteShop/:id", isUserAuth, authorizeRole("restaurantOwner"), catchAsyncError(deleteShop));

export default shopRouter; // export shop router