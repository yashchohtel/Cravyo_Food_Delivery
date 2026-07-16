import { createSlice } from "@reduxjs/toolkit";
import { loadUser, loginUser, logoutUser, registerUser, resetPassword, sendLoginOtp, sendPasswordResetLink, verifyLoginOtp, verifyResetToken } from "./authThunk";

// Initial state for authentication
const initialState = {
    user: null,
    authLoading: true, // App initialization loading
    formLoading: false, // Login / Register / OTP loading
    errorMessage: null, // 
    successMessage: null,
    isAuthenticated: false,

    verifyTokenLoading: true, // loading state for pass reset token validation
    isResetTokenValid: null, // flag for passward reset token validation
};

const authSlice = createSlice({

    // slice name
    name: "auth",

    // initial state
    initialState,

    // reducers for synchronous actions
    reducers: {

        // clear messages from the state
        clearMessages: (state) => {
            state.errorMessage = null;
            state.successMessage = null;
        },

        // Logout user locally
        clearAuth: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.errorMessage = null;
            state.successMessage = null;
        },

    },

    // Extra reducers to handle async actions
    extraReducers: (builder) => {

        builder

            /* ----------- LOAD USER ↓ */

            // Pending
            .addCase(loadUser.pending, (state) => {
                state.authLoading = true;
                state.errorMessage = null;
            })

            // Fulfilled 
            .addCase(loadUser.fulfilled, (state, action) => {
                state.authLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })

            // Rejected
            .addCase(loadUser.rejected, (state, action) => {
                state.authLoading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.errorMessage = action.payload;
            })

            /* ----------- REGISTER ↓ */

            // Pending
            .addCase(registerUser.pending, (state) => {
                state.formLoading = true;
                state.errorMessage = null;
                state.successMessage = null;
            })

            // Fulfilled
            .addCase(registerUser.fulfilled, (state, action) => {
                console.log("slice " + action.payload);
                state.formLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.successMessage = action.payload.message;
            })

            // Rejected
            .addCase(registerUser.rejected, (state, action) => {
                state.formLoading = false;
                state.errorMessage = action.payload;
            })

            /* ----------- LOGIN ↓ */

            // Pending
            .addCase(loginUser.pending, (state) => {
                state.formLoading = true;
                state.errorMessage = null;
                state.successMessage = null;
            })

            // Fulfilled
            .addCase(loginUser.fulfilled, (state, action) => {
                state.formLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.successMessage = action.payload.message;
            })

            // Rejected
            .addCase(loginUser.rejected, (state, action) => {
                state.formLoading = false;
                state.errorMessage = action.payload;
            })

            /* ----------- LOGOUT ↓ */

            // Pending
            .addCase(logoutUser.pending, (state) => {
                state.formLoading = true;
                state.errorMessage = null;
                state.successMessage = null
            })

            // Fulfilled
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.formLoading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.successMessage = action.payload.message;
            })

            // Rejected
            .addCase(logoutUser.rejected, (state, action) => {
                state.formLoading = false;
                state.errorMessage = action.payload;
            })

            /* ----------- SEND LOGIN OTP ↓ */

            // Pending
            .addCase(sendLoginOtp.pending, (state) => {
                state.formLoading = true;
                state.errorMessage = null;
                state.successMessage = null;
            })

            // Fulfilled
            .addCase(sendLoginOtp.fulfilled, (state, action) => {
                state.formLoading = false;
                state.successMessage = action.payload.message;
            })

            // Rejected
            .addCase(sendLoginOtp.rejected, (state, action) => {
                state.formLoading = false;
                state.errorMessage = action.payload;
            })

            /* ----------- VERIFY LOGIN OTP ↓ */

            .addCase(verifyLoginOtp.pending, (state) => {
                state.formLoading = true;
                state.errorMessage = null;
            })

            .addCase(verifyLoginOtp.fulfilled, (state, action) => {
                state.formLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.successMessage = action.payload.message;
            })

            .addCase(verifyLoginOtp.rejected, (state, action) => {
                state.formLoading = false;
                state.errorMessage = action.payload;
            })

            /* ----------- SEND PASSWORD RESET LINK ↓ */

            // Pending
            .addCase(sendPasswordResetLink.pending, (state) => {
                state.formLoading = true;
                state.errorMessage = null;
                state.successMessage = null;
            })

            // Fulfilled
            .addCase(sendPasswordResetLink.fulfilled, (state, action) => {
                state.formLoading = false;
                state.successMessage = action.payload.message;
            })

            // Rejected
            .addCase(sendPasswordResetLink.rejected, (state, action) => {
                state.formLoading = false;
                state.errorMessage = action.payload;
            })

            /* ----------- RESET PASSWORD ↓ */

            // Pending
            .addCase(resetPassword.pending, (state) => {
                state.formLoading = true;
                state.errorMessage = null;
                state.successMessage = null;
            })

            // Fulfilled
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.formLoading = false;
                state.successMessage = action.payload.message;
            })

            // Rejected
            .addCase(resetPassword.rejected, (state, action) => {
                state.formLoading = false;
                state.errorMessage = action.payload;
            })

            /* ----------- VERIFY RESET TOKEN ↓ */

            // Pending
            .addCase(verifyResetToken.pending, (state) => {
                state.verifyTokenLoading = true;
                state.errorMessage = null;
                state.successMessage = null;
                state.isResetTokenValid = null;
            })

            // Fulfilled
            .addCase(verifyResetToken.fulfilled, (state, action) => {
                state.verifyTokenLoading = false;
                state.successMessage = action.payload.message;
                state.isResetTokenValid = true;
            })

            // Rejected
            .addCase(verifyResetToken.rejected, (state, action) => {
                state.verifyTokenLoading = false;
                state.errorMessage = action.payload;
                state.isResetTokenValid = false;
            })

    },

});

// Export actions for use in components
export const { clearMessages, clearAuth } = authSlice.actions;

export default authSlice.reducer;