import mongoose from "mongoose"; // Import mongoose
import bcrypt from "bcryptjs"; // Import bcrypt for password hashing
import jwt from "jsonwebtoken"; // Import JWT for authentication

// Creating a user schema
const userSchema = new mongoose.Schema({

    // full name
    fullName: {
        type: String,
        required: true,
        trim: true,
    },

    // user email
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
    },

    // user password
    password: {
        type: String,
        required: true,
    },

    // mobile number
    mobileNumber: {
        type: String,
        required: [true, "Mobile number is required"],
        unique: true,
        trim: true,
    },

    // user roles
    roles: {
        type: [String],
        enum: ["user", "restaurantOwner", "deliveryBoy"],
        default: ["user"],
        required: true,
    },

    // Login OTP
    loginOtp: {
        type: String,
    },

    // Login OTP Expiry
    loginOtpExpire: {
        type: Date,
    },

    // Reset password token
    resetPasswordToken: {
        type: String,
    },

    // Reset password token expire
    resetPasswordExpire: {
        type: Date,
    },

}, { timestamps: true })

// Pre-save hook to hash the password before saving
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

// Creating a JWT token for the user
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
}

// Method to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password); // Compare entered password with hashed password
}

// Create a user model
const User = mongoose.model("User", userSchema);

// Export the user model
export default User;