import express from "express";
import catchAsyncError from "../../middleware/catchAsyncError.js";
import { authorizeRole } from "../../middleware/authorizeRole.js";
import { isUserAuth } from "../../middleware/auth.js";
import { acceptDeliveryAssignment, getAvailableAssignments, getDeliveryAssignmentById } from "./deliveryAssignmentController.js";

const deliveryAssignmentRouter = express.Router();

// Get Available Delivery Assignments [GET] - "http://localhost:5001/api/deliveryAssignment/available"
deliveryAssignmentRouter.get("/available", isUserAuth, authorizeRole("deliveryBoy"), catchAsyncError(getAvailableAssignments));

// Accept a delivery assignment [PUT] - "/api/deliveryAssignment/acceptOrder/:id"
deliveryAssignmentRouter.put("/acceptOrder/:id", isUserAuth, authorizeRole("deliveryBoy"), catchAsyncError(acceptDeliveryAssignment));

// Get a specific delivery assignment
deliveryAssignmentRouter.get("/:id", isUserAuth, authorizeRole("deliveryBoy"), catchAsyncError(getDeliveryAssignmentById));

export default deliveryAssignmentRouter;