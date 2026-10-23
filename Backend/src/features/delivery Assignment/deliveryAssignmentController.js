import DeliveryAssignment from "../../models/deliveryAssignment.modal.js";
import Order from "../../models/order.modal.js";
import ErrorHandler from "../../utils/errorHandler.js";
import { calculateDistance } from "../../utils/utilityFunctions.js";

// Get available delivery assignments
export const getAvailableAssignments = async (req, res, next) => {

    // getting delivery assignments for delivery boys
    const assignments = await DeliveryAssignment.find({
        broadcastedTo: req.user._id,
        assignedTo: null,
        status: "broadcasted"
    }).populate("order").populate("shop", "name image address mobileNumber deliveryTime");

    // return status
    return res.status(200).json({
        success: true,
        message: "Available assignments fetched successfully",
        assignments
    });

};

// Accept a delivery assignment using transaction
export const acceptDeliveryAssignment = async (req, res, next) => {

    // create session
    const session = await DeliveryAssignment.startSession();

    try {

        let assignment;
        let order;

        await session.withTransaction(async () => {

            assignment = await DeliveryAssignment.findOneAndUpdate(
                {
                    _id: req.params.id,
                    broadcastedTo: req.user._id,
                    assignedTo: null,
                    status: "broadcasted"
                },
                {
                    $set: {
                        assignedTo: req.user._id,
                        status: "assigned",
                        acceptedAt: new Date()
                    }
                },
                {
                    new: true,
                    session
                }
            );

            if (!assignment) {
                throw new ErrorHandler(
                    "This delivery assignment is no longer available",
                    409
                );
            }

            order = await Order.findOneAndUpdate(
                {
                    _id: assignment.order,
                    deliveryAssignment: assignment._id,
                    deliveryBoy: null,
                    status: "out_for_delivery"
                },
                {
                    $set: {
                        deliveryBoy: req.user._id
                    }
                },
                {
                    new: true,
                    session
                }
            );

            if (!order) {
                throw new ErrorHandler(
                    "Order is no longer available",
                    409
                );
            }
        });

        // Populate assignment details after successful acceptance
        assignment = await DeliveryAssignment.findById(assignment._id)
            .populate({
                path: "order",
                populate: {
                    path: "user",
                    select: "fullName mobileNumber"
                }
            })
            .populate("shop", "name image address mobileNumber deliveryTime");

        return res.status(200).json({
            success: true,
            message: "Delivery assignment accepted successfully",
            assignment
        });

    } catch (error) {

        return next(error);

    } finally {

        await session.endSession();

    }

};

// Get a specific delivery assignment by ID
export const getDeliveryAssignmentById = async (req, res, next) => {

    const assignment = await DeliveryAssignment.findOne({
        _id: req.params.id,
        $or: [
            { broadcastedTo: req.user._id },
            { assignedTo: req.user._id }
        ]
    })
        .populate({
            path: "order",
            populate: {
                path: "user",
                select: "fullName mobileNumber email"
            }
        })
        .populate("shop", "name image address mobileNumber deliveryTime");

    if (!assignment) {
        return next(
            new ErrorHandler("Delivery assignment not found", 404)
        );
    }

    const [deliveryBoyLongitude, deliveryBoyLatitude] = req.user.location?.coordinates || [];

    const hasDeliveryBoyLocation =
        Number.isFinite(deliveryBoyLatitude) &&
        Number.isFinite(deliveryBoyLongitude) &&
        !(deliveryBoyLatitude === 0 && deliveryBoyLongitude === 0);
    const distanceToShop = hasDeliveryBoyLocation
        ? Number(calculateDistance(
            deliveryBoyLatitude,
            deliveryBoyLongitude,
            assignment.shop.address.latitude,
            assignment.shop.address.longitude
        ).toFixed(2))
        : null;

    const assignmentData = assignment.toObject();
    
    assignmentData.distanceToShop = distanceToShop;

    return res.status(200).json({
        success: true,
        message: "Delivery assignment fetched successfully",
        assignment: assignmentData
    });

};

// Mark Order as Picked Up
export const markOrderPickedUp = async (req, res, next) => {

    // Find and update the assigned delivery assignment
    const assignment = await DeliveryAssignment.findOneAndUpdate(
        {
            _id: req.params.id,
            assignedTo: req.user._id,
            status: "assigned",
            orderPicked: false
        },
        {
            $set: {
                orderPicked: true
            }
        },
        {
            new: true
        }
    )
        .populate({
            path: "order",
            populate: {
                path: "user",
                select: "fullName mobileNumber email"
            }
        })
        .populate("shop", "name image address mobileNumber deliveryTime");

    // Check if assignment was found and updated
    if (!assignment) {
        return next(
            new ErrorHandler(
                "Assignment not found or order already picked up",
                404
            )
        );
    }

    // Return success response
    return res.status(200).json({
        success: true,
        message: "Order marked as picked up successfully",
        assignment
    });

};

// Mark Order as Delivered
export const markOrderDelivered = async (req, res, next) => {

    // Create session
    const session = await DeliveryAssignment.startSession();

    try {

        let assignment;

        await session.withTransaction(async () => {

            // Find and update the assigned delivery assignment
            assignment = await DeliveryAssignment.findOneAndUpdate(
                {
                    _id: req.params.id,
                    assignedTo: req.user._id,
                    status: "assigned",
                    orderPicked: true
                },
                {
                    $set: {
                        status: "completed"
                    }
                },
                {
                    new: true,
                    session
                }
            );

            // Check if assignment is valid
            if (!assignment) {
                throw new ErrorHandler(
                    "Assignment not found or order has not been picked up",
                    409
                );
            }

            // Update order status to delivered
            const order = await Order.findOneAndUpdate(
                {
                    _id: assignment.order,
                    deliveryAssignment: assignment._id,
                    deliveryBoy: req.user._id,
                    status: "out_for_delivery"
                },
                {
                    $set: {
                        status: "delivered"
                    }
                },
                {
                    new: true,
                    session
                }
            );

            // Check if order was updated
            if (!order) {
                throw new ErrorHandler(
                    "Order cannot be marked as delivered",
                    409
                );
            }

        });

        // Populate assignment details
        assignment = await DeliveryAssignment.findById(assignment._id)
            .populate({
                path: "order",
                populate: {
                    path: "user",
                    select: "fullName mobileNumber email"
                }
            })
            .populate("shop", "name image address mobileNumber deliveryTime");

        // Return success response
        return res.status(200).json({
            success: true,
            message: "Order marked as delivered successfully",
            assignment
        });

    } catch (error) {

        return next(error);

    } finally {

        await session.endSession();

    }

};

// Cancel Order from Delivery Boy Side
export const cancelDeliveryOrder = async (req, res, next) => {

    // Create session
    const session = await DeliveryAssignment.startSession();

    try {

        let assignment;

        await session.withTransaction(async () => {

            // Find and update the assigned delivery assignment
            assignment = await DeliveryAssignment.findOneAndUpdate(
                {
                    _id: req.params.id,
                    assignedTo: req.user._id,
                    status: "assigned",
                    orderPicked: true
                },
                {
                    $set: {
                        status: "cancelled"
                    }
                },
                {
                    new: true,
                    session
                }
            );

            // Check if assignment is valid
            if (!assignment) {
                throw new ErrorHandler(
                    "Assignment not found or order is not eligible for cancellation",
                    409
                );
            }

            // Update order status to cancelled
            const order = await Order.findOneAndUpdate(
                {
                    _id: assignment.order,
                    deliveryAssignment: assignment._id,
                    deliveryBoy: req.user._id,
                    status: "out_for_delivery"
                },
                {
                    $set: {
                        status: "cancelled"
                    }
                },
                {
                    new: true,
                    session
                }
            );

            // Check if order was updated
            if (!order) {
                throw new ErrorHandler(
                    "Order cannot be cancelled",
                    409
                );
            }

        });

        // Populate assignment details
        assignment = await DeliveryAssignment.findById(assignment._id)
            .populate({
                path: "order",
                populate: {
                    path: "user",
                    select: "fullName mobileNumber email"
                }
            })
            .populate("shop", "name image address mobileNumber deliveryTime");

        // Return success response
        return res.status(200).json({
            success: true,
            message: "Order cancelled successfully",
            assignment
        });

    } catch (error) {

        return next(error);

    } finally {

        await session.endSession();

    }

};
