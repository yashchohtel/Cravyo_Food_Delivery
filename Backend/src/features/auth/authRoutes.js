import express from "express"; // Express framework for building APIs
import catchAsyncError from "../../middleware/catchAsyncError.js";
import { isUserAuth } from "../../middleware/auth.js"; // Import authentication middleware
import { getCurrentUser, login, logout, register, resetPassword, sendLoginOtp, sendPasswordResetLink, verifyLoginOtp, verifyResetToken } from "./authController.js";

const authRouter = express.Router(); // Creating an instance of Express Router

// AUTHENTICATION USER ROUTES -------------------- //

// Register [POST] - 'http://localhost:5000/api/auth/register'
authRouter.post('/register', catchAsyncError(register));

// Login [POST] - 'http://localhost:5000/api/auth/login'
authRouter.post('/login', catchAsyncError(login));

// Logout [POST] - 'http://localhost:5000/api/auth/logout'
authRouter.post('/logout', catchAsyncError(logout));

// Send Login OTP [POST] - 'http://localhost:5000/api/auth/send-login-otp'
authRouter.post("/send-login-otp", catchAsyncError(sendLoginOtp));

// Verify Login OTP [POST] - 'http://localhost:5000/api/auth/verify-login-otp'
authRouter.post("/verify-login-otp", catchAsyncError(verifyLoginOtp));

//  Get my profile [get] - 'http://localhost:5000/api/auth/me'
authRouter.get("/me", isUserAuth, catchAsyncError(getCurrentUser));

// Send Password Reset Link [POST] - 'http://localhost:5000/api/auth/forgot-password'
authRouter.post("/forgot-password", catchAsyncError(sendPasswordResetLink));

// Reset Password [POST] - 'http://localhost:5000/api/auth/reset-password/:token'
authRouter.post("/reset-password/:token", catchAsyncError(resetPassword));

// Verify Reset Token [GET] - 'http://localhost:5000/api/auth/verify-reset-token/:token'
authRouter.get("/verify-reset-token/:token", catchAsyncError(verifyResetToken));

export default authRouter; // export user router