import express from "express";
import { isUserAuth } from "../../middleware/auth.js";
import catchAsyncError from "../../middleware/catchAsyncError.js";
import { createOrder, getMyOrders, getRestaurantOrders } from "./orderController.js";
import { authorizeRole } from "../../middleware/authorizeRole.js";

// Creating an instance of Express Router
const orderRouter = express.Router();

// Create Order [POST] - "http://localhost:5001/api/order/createOrder"
orderRouter.post("/createOrder", isUserAuth, catchAsyncError(createOrder));

// Get My Orders [GET] - "http://localhost:5001/api/order/myOrders"
orderRouter.get("/myOrders", isUserAuth, catchAsyncError(getMyOrders));

// Get Restaurant Orders [GET] - "http://localhost:5001/api/order/restaurantOrders"
orderRouter.get("/restaurantOrders", isUserAuth, authorizeRole("restaurantOwner"), catchAsyncError(getRestaurantOrders));

export default orderRouter;