import { createSlice } from "@reduxjs/toolkit";
import { getAvailableAssignments } from "./deliveryAssignmentThunk";

const initialState = {
    assignments: [],
    assignmentsLoading: false,
    errorMessage: null,
    successMessage: null
};

const deliveryAssignmentSlice = createSlice({

    name: "deliveryAssignment",

    initialState,

    reducers: {

        // Clear delivery assignment messages
        clearDeliveryAssignmentMessages: (state) => {
            state.errorMessage = null;
            state.successMessage = null;
        }

    },

    extraReducers: (builder) => {

        builder

            /* ----------- GET AVAILABLE ASSIGNMENTS ↓ */

            .addCase(getAvailableAssignments.pending, (state) => {
                state.assignmentsLoading = true;
                state.errorMessage = null;
            })

            .addCase(getAvailableAssignments.fulfilled, (state, action) => {
                state.assignmentsLoading = false;
                state.assignments = action.payload.assignments;
                state.successMessage = action.payload.message;
            })

            .addCase(getAvailableAssignments.rejected, (state, action) => {
                state.assignmentsLoading = false;
                state.errorMessage = action.payload;
            });

    }

});

export const {
    clearDeliveryAssignmentMessages
} = deliveryAssignmentSlice.actions;

export default deliveryAssignmentSlice.reducer;