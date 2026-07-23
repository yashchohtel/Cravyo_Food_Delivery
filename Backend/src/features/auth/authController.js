import User from "../../models/user.modal.js"; // Import User model
import ErrorHandler from "../../utils/errorHandler.js"; // Import custom error handler
import { sendToken } from "../../utils/sendJwtToken.js"; // import sendToken utility 
import sendEmail from "../../utils/sendEmail.js"; // send email function to send email to suer
import bcrypt from "bcryptjs"; // import bcryptjs
import crypto from "crypto"; // import crypto
import welcomeEmail from "../../utils/emailTemplate/welcomUserEmailTemplate.js"; // email template welcome user
import loginOtpEmail from "../../utils/emailTemplate/sendLoginOtpEmailTemplate.js"; // email template login otp
import resetPasswordEmail from "../../utils/emailTemplate/sendPassResetLinkEmailTemplate.js"; // email template reset password
import { adminAuth } from "../../firebase/firebaseAdmin.js"; // import firebase admin

// REGISTRATION 
export const register = async (req, res, next) => {

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
        mobileNumber,
        provider: "local"
    });

    // Send Welcome Email (Don't fail registration if email sending fails)
    try {

        await sendEmail({

            to: savedUser.email,
            subject: "Welcome to Cravyo 🎉",
            html: welcomeEmail({
                fullName: savedUser.fullName,
            }),

        });

    } catch (error) {
        console.error("Welcome Email Error:", error.message);
    }

    // sending token to the user
    sendToken(savedUser, 201, res, `Welcome, ${savedUser.fullName}`);

};

// LOGIN
export const login = async (req, res, next) => {

    // Extract login details from request body

    // "identifier" can be either email or mobile number
    const { identifier, password } = req.body;

    // Check if all required fields are provided
    if (!identifier || !password) {
        return next(new ErrorHandler("Missing login details", 400));
    }

    // Find user by email or mobile number
    const user = await User.findOne({
        $or: [
            { email: identifier.toLowerCase() },
            { mobileNumber: identifier }
        ]
    });

    // If user does not exist
    if (!user) {
        return next(new ErrorHandler("Invalid email/mobile number or password", 401));
    }

    // Prevent Google users from logging in with email and password
    if (user.provider === "google") {
        return next(new ErrorHandler("Please login with Google.", 400));
    }

    // Compare password
    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid email/mobile number or password", 401));
    }

    // Send JWT token
    sendToken(user, 200, res, `Welcome back, ${user.fullName}`);

};

// LOGOUT
export const logout = (req, res) => {

    // Clear JWT cookie
    res.clearCookie("token", {
        httpOnly: true,
    });

    // Send success response
    res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });

};

// SEND LOGIN OTP - (opt login)
export const sendLoginOtp = async (req, res, next) => {

    // Extract mobile number
    const { mobileNumber } = req.body;

    // Validate input
    if (!mobileNumber) {
        return next(new ErrorHandler("Mobile number is required", 400));
    }

    // Find user
    const user = await User.findOne({ mobileNumber });

    if (!user) {
        return next(new ErrorHandler("No account found with this mobile number.", 404));
    }

    // Generate 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // Hash OTP
    const hashedOtp = await bcrypt.hash(otp, 10);

    // Save hashed OTP and expiry
    user.loginOtp = hashedOtp;
    user.loginOtpExpire = new Date(Date.now() + 5 * 60 * 1000);

    // Save user with OTP
    await user.save();

    // Send Login OTP (Don't fail if email sending fails)
    try {

        await sendEmail({

            to: user.email,
            subject: "Your Cravyo Login OTP 🔐",
            html: loginOtpEmail({
                fullName: user.fullName,
                otp,
            })

        });

    } catch (error) {
        console.error("Login OTP Email Error:", error.message);
    }

    // Send success response
    res.status(200).json({
        success: true,
        message: "OTP sent successfully",
    });

};

// VERIFY LOGIN OTP
export const verifyLoginOtp = async (req, res, next) => {

    // Extract data
    const { mobileNumber, otp } = req.body;

    // Validate input
    if (!mobileNumber || !otp) {
        return next(new ErrorHandler("Mobile number and OTP are required", 400));
    }

    // Find user
    const user = await User.findOne({ mobileNumber });

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    // Check OTP exists
    if (!user.loginOtp || !user.loginOtpExpire) {
        return next(new ErrorHandler("Invalid OTP request.", 400));
    }

    // Check OTP expiry
    if (user.loginOtpExpire < Date.now()) {
        return next(new ErrorHandler("OTP has expired.", 400));
    }

    // Compare OTP
    const isOtpMatched = await bcrypt.compare(otp, user.loginOtp);

    if (!isOtpMatched) {
        return next(new ErrorHandler("Invalid OTP.", 400));
    }

    // Clear OTP
    user.loginOtp = undefined;
    user.loginOtpExpire = undefined;

    await user.save();

    // Login user
    sendToken(user, 200, res, `Welcome back, ${user.fullName}`);

};

// GET CURRENT USER
export const getCurrentUser = async (req, res, next) => {

    // Extract authenticated user id
    const { id } = req.user;

    // Find user and exclude sensitive fields
    const user = await User.findById(id).select("-password -loginOtp -loginOtpExpire");

    // Check if user exists
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    // Optimized user data
    const userData = {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        mobileNumber: user.mobileNumber,
        roles: user.roles,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };

    // Send response
    res.status(200).json({
        success: true,
        message: "User fetched successfully",
        user: userData,
    });

};

// SEND PASSWORD RESET LINK
export const sendPasswordResetLink = async (req, res, next) => {

    // Extract email
    const { email } = req.body;

    // Validate input
    if (!email) return next(new ErrorHandler("Email is required", 400));

    // Find user
    const user = await User.findOne({ email });

    if (!user) return next(new ErrorHandler("No account found with this email.", 404));

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash reset token
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    // Save hashed token and expiry
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000);

    // Save user
    await user.save();

    // Reset password link
    const resetPasswordLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // Send reset password email (Don't fail if email sending fails)
    try {

        await sendEmail({

            to: user.email,
            subject: "Reset Your Cravyo Password 🔐",
            html: resetPasswordEmail({
                fullName: user.fullName,
                resetPasswordLink,
            }),

        });

    } catch (error) {
        console.error("Reset Password Email Error:", error.message);
    }

    // Send success response
    res.status(200).json({
        success: true,
        message: "Reset link sent.",
    });

};

// VERIFY RESET TOKEN
export const verifyResetToken = async (req, res, next) => {

    // Extract token
    const { token } = req.params;

    // Hash token
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Find user
    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    // Invalid or expired token
    if (!user) {
        return next(new ErrorHandler("Invalid or expired reset link.", 400));
    }

    // Success response
    res.status(200).json({
        success: true,
        message: "Reset link is valid.",
    });

};

// RESET PASSWORD
export const resetPassword = async (req, res, next) => {

    // Extract token and password
    const { token } = req.params;
    const { password } = req.body;

    // Validate input
    if (!password) {
        return next(new ErrorHandler("Password is required", 400));
    }

    // Hash token
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Find user
    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(new ErrorHandler("Invalid or expired reset link.", 400));
    }

    // Hash new password
    user.password = password;

    // Clear reset token
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    // Save user
    await user.save();

    // Success response
    res.status(200).json({
        success: true,
        message: "Password reset successful.",
    });

};

// GOOGLE LOGIN
export const googleAuth = async (req, res, next) => {

    // get idToken fro the request body
    const { idToken } = req.body;

    // if no id token
    if (!idToken) {
        return next(new ErrorHandler("Unable to sign in with Google. Please try again.", 400));
    }

    // decode the token
    const decodedToken = await adminAuth.verifyIdToken(idToken);

    // Extract user information from decoded token
    const { uid, email, name, picture } = decodedToken;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    // If user exists, log them in
    if (existingUser) {

        // send token to frontend
        return sendToken(existingUser, 200, res, `Welcome back, ${existingUser.fullName}`);

    }

    // save user document
    const savedUser = await User.create({
        fullName: name,
        email,
        googleId: uid,
        profileImage: picture,
        provider: "google",
    });


    // send welcome email to users email
    try {

        await sendEmail({

            to: savedUser.email,
            subject: "Welcome to Cravyo 🎉",
            html: welcomeEmail({
                fullName: savedUser.fullName,
            }),

        });

    } catch (error) {

        console.error("Welcome Email Error:", error.message);

    }

    // Login newly created user
    return sendToken(savedUser, 201, res, `Welcome, ${savedUser.fullName}`);

}