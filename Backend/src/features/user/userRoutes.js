import express from "express";
import catchAsyncError from "../../middleware/catchAsyncError.js";
import { becomeDeliveryPartner, updateDeliveryBoyStatus, updateProfileImage, updateUserLocation } from "./userController.js";
import { isUserAuth } from "../../middleware/auth.js";
import { authorizeRole } from "../../middleware/authorizeRole.js";
import { upload } from "../../middleware/multer.js";

const userRouter = express.Router();

// USER ROUTES -------------------- //

// Update User Location [PUT] - 'http://localhost:5001/api/user/updateUserLocation'
userRouter.put("/updateUserLocation", isUserAuth, catchAsyncError(updateUserLocation));

// Update Delivery Boy Status [PUT] - 'http://localhost:5001/api/user/updateDeliveryBoyStatus'
userRouter.put("/updateDeliveryBoyStatus", isUserAuth, authorizeRole("deliveryBoy"), catchAsyncError(updateDeliveryBoyStatus));

// Update Profile Image [PUT] - 'http://localhost:5001/api/user/updateProfileImage'
userRouter.put("/updateProfileImage", isUserAuth, upload.single("image"), catchAsyncError(updateProfileImage));

// Become Delivery Partner [POST] - 'http://localhost:5001/api/user/becomeDeliveryPartner'
userRouter.post("/becomeDeliveryPartner", isUserAuth, catchAsyncError(becomeDeliveryPartner));

export default userRouter;
