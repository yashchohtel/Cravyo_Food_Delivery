import mongoose from "mongoose"; // Import mongoose
import bcrypt from "bcryptjs"; // Import bcrypt for password hashing
import jwt from "jsonwebtoken"; // Import JWT for authentication

// Creating a user schema
const userSchema = new mongoose.Schema({

    // Method of creating account
    provider: {
        type: String,
        enum: ["local", "google"],
        default: "local"
    },

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
        required: function () {
            return this.provider === "local";
        }
    },

    // mobile number
    mobileNumber: {
        type: String,
        trim: true,
        required: function () {
            return this.provider === "local";
        }
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

    // Firebase unique user id
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },

    // profile image url
    profileImage: {
        type: String,
        default: ""
    },

}, { timestamps: true })

// user schema index or mobie
userSchema.index(
    { mobileNumber: 1 },
    {
        unique: true,
        partialFilterExpression: {
            mobileNumber: { $type: "string" }
        }
    }
);

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