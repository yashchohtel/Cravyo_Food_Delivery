import { createSlice } from "@reduxjs/toolkit";
import { loadUser } from "./authThunk";

// Initial state for authentication
const initialState = {
    user: null,
    authLoading: true, // App initialization loading
    formLoading: false, // Login / Register / OTP loading
    errorMessage: null, // 
    successMessage: null,
    isAuthenticated: false,
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
        logoutUser: (state) => {
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
            });

    },
});

// Export actions for use in components
export const { clearMessages, logoutUser } = authSlice.actions;

export default authSlice.reducer;