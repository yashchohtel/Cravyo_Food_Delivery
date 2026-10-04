import mongoose from "mongoose";

// create a schema for the delivery assignment
const deliveryAssignmentSchema = new mongoose.Schema({

    // The customer's complete order
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true,
    },

    // The restaurant/shop handling the order
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
        required: true,
    },

    // The order ID inside the restaurant's order system
    shopOrderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },

    // Delivery boys to whom the order was broadcasted
    broadcastedTo: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],

    // The delivery boy who accepted the order
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },

    // Current assignment status
    status: {
        type: String,
        enum: ["broadcasted", "assigned", "completed"],
        default: "broadcasted",
    },

    // When the delivery boy accepted the order
    acceptedAt: {
        type: Date,
        default: null,
    },

}, { timestamps: true });

// create a model for the delivery assignment schema
const DeliveryAssignment = mongoose.model("DeliveryAssignment", deliveryAssignmentSchema);


// export the model
export default DeliveryAssignment;