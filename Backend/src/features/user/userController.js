import User from "../../models/user.model.js";
import ErrorHandler from "../../utils/errorHandler.js";

// UPDATE USER LOCATION
export const updateUserLocation = async (req, res, next) => {

    // Extract location details
    const { latitude, longitude } = req.body;

    // console.log("Received location update request:", { latitude, longitude });

    // Validate location details
    if (latitude === undefined || longitude === undefined) {
        return next(new ErrorHandler("Latitude and longitude are required", 400));
    }

    // Extract authenticated user id
    const { id } = req.user;

    // Find user
    const user = await User.findById(id);

    // Check if user exists
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    // Update user location
    user.location = {
        type: "Point",
        coordinates: [longitude, latitude]
    };

    // Save updated user
    await user.save();

    // Send success response
    res.status(200).json({
        success: true,
        message: "User location updated successfully",
        location: user.location
    });

};


export const updateDeliveryBoyStatus = async (req, res, next) => {
    try {
        const { isDeliveryBoyActive } = req.body;

        // Validate delivery boy status
        if (typeof isDeliveryBoyActive !== "boolean") {
            return next(new ErrorHandler("Invalid delivery boy status", 400));
        }

        // Update delivery boy status
        const user = await User.findByIdAndUpdate(
            req.user._id,
            { isDeliveryBoyActive },
            { new: true, runValidators: true }
        ).select("isDeliveryBoyActive");

        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        return res.status(200).json({
            success: true,
            message: `You are now ${isDeliveryBoyActive ? "online" : "offline"}`,
            isDeliveryBoyActive: user.isDeliveryBoyActive
        });
    } catch (error) {
        return next(error);
    }
};
