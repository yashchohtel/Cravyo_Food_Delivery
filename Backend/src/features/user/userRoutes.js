import express from "express";
import catchAsyncError from "../../middleware/catchAsyncError.js";
import { updateDeliveryBoyStatus, updateUserLocation } from "./userController.js";
import { isUserAuth } from "../../middleware/auth.js";
import { authorizeRole } from "../../middleware/authorizeRole.js";

const userRouter = express.Router();

// USER ROUTES -------------------- //

// Update User Location [PUT] - 'http://localhost:5001/api/user/updateUserLocation'
userRouter.put("/updateUserLocation", isUserAuth, catchAsyncError(updateUserLocation));


// Update Delivery Boy Status [PUT] - 'http://localhost:5001/api/user/updateDeliveryBoyStatus'
userRouter.put("/updateDeliveryBoyStatus", isUserAuth, authorizeRole("deliveryBoy"), catchAsyncError(updateDeliveryBoyStatus));


export default userRouter;