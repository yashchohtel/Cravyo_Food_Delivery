import User from "../../models/user.model.js";
import ErrorHandler from "../../utils/errorHandler.js";

// UPDATE USER LOCATION
export const updateUserLocation = async (req, res, next) => {

    // Extract location details
    const { latitude, longitude } = req.body;

    console.log("Received location update request:", { latitude, longitude });

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