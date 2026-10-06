import { createSlice } from "@reduxjs/toolkit";
import { updateUserLocation } from "./userThunk";

// Initial state for user
const initialState = {
    locationLoading: false,
    errorMessage: null,
    successMessage: null,
};


const userSlice = createSlice({

    // slice name
    name: "user",

    // initial state
    initialState,

    // reducers for synchronous actions
    reducers: {

        // clear messages from the state
        clearMessages: (state) => {
            state.errorMessage = null;
            state.successMessage = null;
        },

    },

    // Extra reducers to handle async actions
    extraReducers: (builder) => {

        builder

            /* ----------- UPDATE USER LOCATION ↓ */

            // Pending
            .addCase(updateUserLocation.pending, (state) => {
                state.locationLoading = true;
                state.errorMessage = null;
                state.successMessage = null;
            })

            // Fulfilled
            .addCase(updateUserLocation.fulfilled, (state, action) => {
                state.locationLoading = false;
                state.successMessage = action.payload.message;
            })

            // Rejected
            .addCase(updateUserLocation.rejected, (state, action) => {
                state.locationLoading = false;
                state.errorMessage = action.payload;
            })

    },

});

// Export actions for use in components
export const { clearMessages } = userSlice.actions;

export default userSlice.reducer;