import DeliveryAssignment from "../../models/deliveryAssignment.modal.js";
import Order from "../../models/order.modal.js";
import ErrorHandler from "../../utils/errorHandler.js";

// Get available delivery assignments
export const getAvailableAssignments = async (req, res, next) => {

    // getting delivery assignments for delivery boys
    const assignments = await DeliveryAssignment.find({
        broadcastedTo: req.user._id,
        assignedTo: null,
        status: "broadcasted"
    }).populate("order").populate("shop", "name image address");

    // return status
    return res.status(200).json({
        success: true,
        message: "Available assignments fetched successfully",
        assignments
    });

};

// Get a specific delivery assignment by ID
export const getDeliveryAssignmentById = async (req, res, next) => {

    // find assignment 
    const assignment = await DeliveryAssignment.findOne({
        _id: req.params.id,
        $or: [
            { broadcastedTo: req.user._id },
            { assignedTo: req.user._id }
        ]
    })
        .populate("order")
        .populate("shop", "name image address");

    if (!assignment) {
        return next(new ErrorHandler("Delivery assignment not found", 404));
    }

    return res.status(200).json({
        success: true,
        message: "Delivery assignment fetched successfully",
        assignment
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

        return res.status(200).json({
            success: true,
            message: "Delivery assignment accepted successfully",
            assignment,
            order
        });

    } catch (error) {

        return next(error);

    } finally {

        await session.endSession();

    }

};