import express from "express";
import catchAsyncError from "../../middleware/catchAsyncError.js";
import { updateUserLocation } from "./userController.js";
import { isUserAuth } from "../../middleware/auth.js";

const userRouter = express.Router();

// USER ROUTES -------------------- //

// Update User Location [PUT] - 'http://localhost:5001/api/user/updateUserLocation'
userRouter.put("/updateUserLocation", isUserAuth, catchAsyncError(updateUserLocation));


export default userRouter;