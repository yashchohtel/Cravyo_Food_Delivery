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


// Accept a delivery assignment
export const acceptDeliveryAssignment = async (req, res, next) => {

    // Find and atomically accept an available assignment
    const assignment = await DeliveryAssignment.findOneAndUpdate(
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
            new: true
        }
    );

    // If already accepted or unavailable
    if (!assignment) {
        return next(
            new ErrorHandler(
                "This delivery assignment is no longer available",
                409
            )
        );
    }

    // Assign delivery boy directly to the order
    const order = await Order.findOneAndUpdate(
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
            new: true
        }
    );

    // If the order could not be assigned, revert assignment
    if (!order) {

        await DeliveryAssignment.findOneAndUpdate(
            {
                _id: assignment._id,
                assignedTo: req.user._id,
                status: "assigned"
            },
            {
                $set: {
                    assignedTo: null,
                    status: "broadcasted",
                    acceptedAt: null
                }
            }
        );

        return next(
            new ErrorHandler(
                "Order is no longer available",
                409
            )
        );
    }

    return res.status(200).json({
        success: true,
        message: "Delivery assignment accepted successfully",
        assignment,
        order
    });

};
