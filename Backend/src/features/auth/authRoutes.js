import express from "express"; // Express framework for building APIs
import catchAsyncError from "../../middleware/catchAsyncError.js";
import { login, logout, register, sendLoginOtp, verifyLoginOtp } from "./authController.js";

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

export default authRouter; // export user router