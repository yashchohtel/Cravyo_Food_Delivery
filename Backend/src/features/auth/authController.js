import User from "../../models/user.modal.js"; // Import User model
import ErrorHandler from "../../utils/errorHandler.js"; // Import custom error handler
import { sendToken } from "../../utils/sendJwtToken.js"; // import sendToken utility 
import sendEmail from "../../utils/sendEmail.js"; // send email function to send email to suer
import bcrypt from "bcryptjs"; // import bcryptjs

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
            html: `
            <div style="margin:0;padding:40px 20px;background:#f8f8f8;font-family:Lato,Arial,sans-serif;">

              <div style="max-width:550px;margin:auto;background:#ffffff;border-radius:12px;padding:40px;border:1px solid #eeeeee;">

                <h1 style="margin:0;color:#222222;font-family:Poppins,Arial,sans-serif;font-size:28px;">
                  Login Verification
                </h1>

                <p style="color:#666666;font-size:16px;line-height:1.7;margin-top:20px;">
                  Hi <strong>${user.fullName}</strong>,
                </p>

                <p style="color:#666666;font-size:16px;line-height:1.7;">
                  Use the OTP below to securely log in to your <strong>Cravyo</strong> account.
                </p>

                <div style="
                            margin:35px 0;
                            background:#fff5f1;
                            border:2px dashed #ff5a1f;
                            border-radius:10px;
                            padding:20px;
                            text-align:center;
                            user-select:all;
                        ">

                  <div style="font-size:14px;color:#666666;margin-bottom:10px;">
                    Your One-Time Password
                  </div>

                  <div style="
                                font-size:40px;
                                font-weight:700;
                                letter-spacing:10px;
                                color:#ff5a1f;
                                font-family:Poppins,Arial,sans-serif;
                            ">
                    ${otp}
                  </div>

                </div>

                <p style="color:#666666;font-size:15px;line-height:1.7;">
                  This OTP is valid for
                  <strong style="color:#222222;">5 minutes</strong>.
                </p>

                <p style="color:#666666;font-size:15px;line-height:1.7;">
                  Never share this OTP with anyone. Cravyo will never ask for your OTP.
                </p>

                <hr style="border:none;border-top:1px solid #eeeeee;margin:30px 0;">

                <p style="font-size:13px;color:#999999;line-height:1.7;text-align:center;">
                  If you didn't request this login, you can safely ignore this email.
                </p>

              </div>

            </div>`,

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

