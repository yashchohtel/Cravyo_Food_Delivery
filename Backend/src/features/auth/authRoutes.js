import express from "express"; // Express framework for building APIs
import { registerUser } from "./authController.js";
import catchAsyncError from "../../middleware/catchAsyncError.js";

const authRouter = express.Router(); // Creating an instance of Express Router

// AUTHENTICATION USER ROUTES -------------------- //

// Register [POST] - 'http://localhost:5000/api/auth/register'
authRouter.post('/register', catchAsyncError(registerUser));



export default authRouter; // export user router