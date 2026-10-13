import express from "express";
import catchAsyncError from "../../middleware/catchAsyncError.js";
import { authorizeRole } from "../../middleware/authorizeRole.js";
import { isUserAuth } from "../../middleware/auth.js";
import { getAvailableAssignments } from "./deliveryAssignmentController.js";

const deliveryAssignmentRouter = express.Router();

// Get Available Delivery Assignments [GET] - "http://localhost:5001/api/deliveryAssignment/available"
deliveryAssignmentRouter.get("/available", isUserAuth, authorizeRole("deliveryBoy"), catchAsyncError(getAvailableAssignments));

export default deliveryAssignmentRouter;