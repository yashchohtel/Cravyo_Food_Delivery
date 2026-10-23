import express from "express";
import catchAsyncError from "../../middleware/catchAsyncError.js";
import { authorizeRole } from "../../middleware/authorizeRole.js";
import { isUserAuth } from "../../middleware/auth.js";
import { acceptDeliveryAssignment, cancelDeliveryOrder, getAvailableAssignments, getDeliveryAssignmentById, getMyDeliveryAssignments, markOrderDelivered, markOrderPickedUp } from "./deliveryAssignmentController.js";

const deliveryAssignmentRouter = express.Router();

// Get Available Delivery Assignments [GET] - "http://localhost:5001/api/deliveryAssignment/available"
deliveryAssignmentRouter.get("/available", isUserAuth, authorizeRole("deliveryBoy"), catchAsyncError(getAvailableAssignments));

// Get active and historical assignments owned by the signed-in delivery boy [GET] - - "http://localhost:5001/api/deliveryAssignment/my-orders"
deliveryAssignmentRouter.get("/my-orders", isUserAuth, authorizeRole("deliveryBoy"), catchAsyncError(getMyDeliveryAssignments));

// Accept a delivery assignment [PUT] - "/api/deliveryAssignment/acceptOrder/:id"
deliveryAssignmentRouter.put("/acceptOrder/:id", isUserAuth, authorizeRole("deliveryBoy"), catchAsyncError(acceptDeliveryAssignment));

// Get a specific delivery assignment - "/api/deliveryAssignment/:id"
deliveryAssignmentRouter.get("/:id", isUserAuth, authorizeRole("deliveryBoy"), catchAsyncError(getDeliveryAssignmentById));

// Mark Order as Picked Up [PUT] - "http://localhost:5001/api/deliveryAssignment/markPickedUp/:id"
deliveryAssignmentRouter.put("/markPickedUp/:id", isUserAuth, authorizeRole("deliveryBoy"), catchAsyncError(markOrderPickedUp));

// Mark Order as Delivered [PUT] - "http://localhost:5001/api/deliveryAssignment/markDelivered/:id"
deliveryAssignmentRouter.put("/markDelivered/:id", isUserAuth, authorizeRole("deliveryBoy"), catchAsyncError(markOrderDelivered));

// Cancel Order from Delivery Boy Side [PUT] - "http://localhost:5001/api/deliveryAssignment/cancelOrder/:id"
deliveryAssignmentRouter.put("/cancelOrder/:id", isUserAuth, authorizeRole("deliveryBoy"), catchAsyncError(cancelDeliveryOrder));

export default deliveryAssignmentRouter;
