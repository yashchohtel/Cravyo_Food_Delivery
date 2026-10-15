import DeliveryAssignment from "../models/deliveryAssignment.modal.js";
import User from "../models/user.model.js";

// Calculate distance between two locations
export const calculateDistance = (lat1, lon1, lat2, lon2) => {

    const R = 6371;

    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
};

// CREATE DELIVERY ASSIGNMENT
export const createDeliveryAssignment = async (order, restaurant) => {

    // Check if assignment already exists
    if (order.deliveryAssignment) {
        return;
    }

    // Find delivery boys who already have an active assigned order
    const busyDeliveryBoyIds = await DeliveryAssignment.distinct(
        "assignedTo",
        {
            status: "assigned",
            assignedTo: { $ne: null }
        }
    );

    // Find nearby available delivery boys
    const deliveryBoys = await User.find({
        
        roles: "deliveryBoy",
        isDeliveryBoyActive: true,

        // Exclude delivery boys who are already busy
        _id: { $nin: busyDeliveryBoyIds },

        // Exclude default or invalid locations
        "location.coordinates": { $ne: [0, 0] },

        // Find delivery boys within 5 km of the restaurant
        location: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [
                        restaurant.address.longitude,
                        restaurant.address.latitude
                    ]
                },
                $maxDistance: 5000
            }
        }
    }).select("_id");

    // If no delivery boy is available
    if (deliveryBoys.length === 0) {
        return;
    }

    // Get delivery boy IDs
    const deliveryBoyIds = deliveryBoys.map(
        (deliveryBoy) => deliveryBoy._id
    );

    // Create delivery assignment
    const assignment = await DeliveryAssignment.create({
        order: order._id,
        shop: restaurant._id,
        shopOrderId: order._id,
        broadcastedTo: deliveryBoyIds,
        status: "broadcasted"
    });

    // Attach assignment to order
    order.deliveryAssignment = assignment._id;

    // Save order
    await order.save();

    return assignment;
};