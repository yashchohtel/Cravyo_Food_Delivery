import User from "../../models/user.modal.js"; // Import User model
import ErrorHandler from "../../utils/errorHandler.js"; // Import custom error handler
import { sendToken } from "../../utils/sendJwtToken.js"; // import sendToken utility 
import sendEmail from "../../utils/sendEmail.js"; // send email function to send email to suer

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

    // Send Welcome Email (Don't fail registration if email sending fails)
    try {

        await sendEmail({

            to: savedUser.email,
            subject: "Welcome to Cravyo 🎉",
            html: `
                <h2>Welcome to Cravyo, ${savedUser.fullName}! 👋</h2>

                <p>Your account has been created successfully.</p>

                <p>We're excited to have you with us.</p>

                <p>Happy Ordering! 🍔🍕</p>
            `,

        });

    } catch (error) {
        console.error("Welcome Email Error:", error.message);
    }

    // sending token to the user
    sendToken(savedUser, 201, res);

};

// LOGIN
export const loginUser = async (req, res, next) => {

    // Extract login details from request body
    // "identifier" can be either email or mobileNumber
    const { identifier, password } = req.body;

    // Check if all required fields are provided
    if (!identifier || !password) {
        return next(new ErrorHandler("Missing login details", 400));
    }

    // Find user by email or mobileNumber
    const user = await User.findOne({
        $or: [{ email: identifier }, { mobileNumber: identifier }]
    });

    // If user not found, return error
    if (!user) {
        return next(new ErrorHandler("Invalid credentials", 401));
    }

    // Check if the password matches
    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid credentials", 401));
    }

    // sending token to the user
    sendToken(user, 200, res);

};
