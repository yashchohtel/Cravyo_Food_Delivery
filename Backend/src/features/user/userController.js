import User from "../../models/user.model.js";
import ErrorHandler from "../../utils/errorHandler.js";
import { deleteFromCloudinary, uploadBufferToCloudinary } from "../../utils/uploadImage.js";

const getUserData = (user) => ({
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    mobileNumber: user.mobileNumber,
    profileImage: user.profileImage,
    roles: user.roles,
    isDeliveryBoyActive: user.isDeliveryBoyActive,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
});

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

// UPDATE DELIVERY BOY STATUS
export const updateDeliveryBoyStatus = async (req, res, next) => {

    // Extract delivery boy status
    const { isDeliveryBoyActive } = req.body;

    // Validate delivery boy status
    if (typeof isDeliveryBoyActive !== "boolean") {
        return next(new ErrorHandler("Valid delivery boy status is required", 400));
    }

    // Extract authenticated user id
    const { id } = req.user;

    // Find user
    const user = await User.findById(id);

    // Check if user exists
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    // Update delivery boy status
    user.isDeliveryBoyActive = isDeliveryBoyActive;

    // Save updated user
    await user.save();

    // Send success response
    res.status(200).json({
        success: true,
        message: `Delivery boy is now ${isDeliveryBoyActive ? "online" : "offline"}`,
        isDeliveryBoyActive: user.isDeliveryBoyActive
    });

};

// UPDATE PROFILE IMAGE
export const updateProfileImage = async (req, res, next) => {

    if (!req.file) {
        return next(new ErrorHandler("Profile image is required", 400));
    }

    const user = await User.findById(req.user.id);

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    const uploadedImage = await uploadBufferToCloudinary(
        req.file.buffer,
        "cravyo/profile-images"
    );
    const oldImagePublicId = user.profileImagePublicId;

    user.profileImage = uploadedImage.secure_url;
    user.profileImagePublicId = uploadedImage.public_id;
    await user.save();

    if (oldImagePublicId) {
        await deleteFromCloudinary(oldImagePublicId);
    }

    res.status(200).json({
        success: true,
        message: "Profile photo updated successfully",
        user: getUserData(user),
    });
};

// BECOME DELIVERY PARTNER
export const becomeDeliveryPartner = async (req, res, next) => {

    const {
        fullName,
        email,
        mobileNumber,
        vehicleType,
        vehicleNumber,
        deliveryAddress
    } = req.body;

    if (!fullName || !email || !mobileNumber || !vehicleType || !deliveryAddress) {
        return next(new ErrorHandler("Please complete all required delivery partner details", 400));
    }

    const user = await User.findById(req.user.id);

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    user.roles.addToSet("deliveryBoy");
    user.deliveryPartnerDetails = {
        fullName,
        email,
        mobileNumber,
        vehicleType,
        vehicleNumber,
        deliveryAddress
    };
    await user.save();

    res.status(200).json({
        success: true,
        message: "You are now a delivery partner",
        user: getUserData(user),
    });
};

