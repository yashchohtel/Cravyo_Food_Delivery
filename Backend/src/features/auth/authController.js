import User from "../../models/user.modal.js"; // Import User model
import ErrorHandler from "../../utils/errorHandler.js"; // Import custom error handler
import { sendToken } from "../../utils/sendJwtToken.js"; // import sendToken utility 

// REGISTRATION 
export const registerUser = async (req, res, next) => {

    // Extract user details from request body
    const { fullName, email, password, mobileNumber } = req.body;

    // Check if all required fields are provided
    if (!fullName || !email || !password || !mobileNumber) {
        return next(new ErrorHandler("Missing user details", 400));
    }

    // Check if the email already exists in the database
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
        return next(new ErrorHandler("Email already exists", 400));
    }

    // Check if the mobile number already exists in the database
    const existingMobile = await User.findOne({ mobileNumber });

    if (existingMobile) {
        return next(new ErrorHandler("Mobile number already exists", 400));
    }

    // creating user details
    const savedUser = await User.create({
        fullName,
        email,
        password,
        mobileNumber
    });

    // sending token to the user
    sendToken(savedUser, 201, res);

};

