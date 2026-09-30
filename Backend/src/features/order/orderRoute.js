import express from "express";
import { isUserAuth } from "../../middleware/auth.js";
import catchAsyncError from "../../middleware/catchAsyncError.js";
import { createOrder } from "./orderController.js";

// Creating an instance of Express Router
const orderRouter = express.Router();

// Create Order [POST] - "http://localhost:5000/api/order/createOrder"
orderRouter.post("/createOrder", isUserAuth, catchAsyncError(createOrder));

export default orderRouter;