import { createSlice } from "@reduxjs/toolkit";
import { updateDeliveryBoyStatus, updateUserLocation } from "./userThunk";

// Initial state for user
const initialState = {
    locationLoading: false,
    deliveryBoyStatusLoading: false,
    isDeliveryBoyActive: false,
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

        // Set delivery boy active status
        setDeliveryBoyActiveStatus: (state, action) => {
            state.isDeliveryBoyActive = action.payload;
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


            /* ----------- UPDATE DELIVERY BOY STATUS ↓ */

            // Pending
            .addCase(updateDeliveryBoyStatus.pending, (state) => {
                state.deliveryBoyStatusLoading = true;
                state.errorMessage = null;
                state.successMessage = null;
            })

            // Fulfilled
            .addCase(updateDeliveryBoyStatus.fulfilled, (state, action) => {

                console.log("hited slice");

                state.deliveryBoyStatusLoading = false;
                state.isDeliveryBoyActive = action.payload.isDeliveryBoyActive;
                state.successMessage = action.payload.message;
            })

            // Rejected
            .addCase(updateDeliveryBoyStatus.rejected, (state, action) => {
                state.deliveryBoyStatusLoading = false;
                state.errorMessage = action.payload;
            })


    },

});

// Export actions for use in components
export const { clearMessages, setDeliveryBoyActiveStatus } = userSlice.actions;

export default userSlice.reducer;