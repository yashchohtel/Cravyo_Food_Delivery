import { createSlice } from "@reduxjs/toolkit";
import { acceptDeliveryAssignment, getAvailableAssignments, getDeliveryAssignmentById } from "./deliveryAssignmentThunk";

const initialState = {
    assignments: [],
    assignmentsLoading: false,
    acceptAssignmentLoading: false,
    selectedAssignment: null,
    assignmentDetailsLoading: false,
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
            })

            /* ----------- ACCEPT DELIVERY ASSIGNMENT ↓ */

            .addCase(acceptDeliveryAssignment.pending, (state) => {
                state.acceptAssignmentLoading = true;
                state.errorMessage = null;
                state.successMessage = null;
            })
            .addCase(acceptDeliveryAssignment.fulfilled, (state, action) => {

                state.acceptAssignmentLoading = false;

                // Remove the accepted assignment from available assignments
                state.assignments = state.assignments.filter(
                    (assignment) => assignment._id !== action.payload.assignment._id
                );

                // Update selected assignment details
                state.selectedAssignment = action.payload.assignment;

                state.successMessage = action.payload.message;
                
            })
            .addCase(acceptDeliveryAssignment.rejected, (state, action) => {
                state.acceptAssignmentLoading = false;
                state.errorMessage = action.payload;
            })

            /* ----------- GET DELIVERY ASSIGNMENT DETAILS */

            .addCase(getDeliveryAssignmentById.pending, (state) => {
                state.assignmentDetailsLoading = true;
                state.errorMessage = null;
            })
            .addCase(getDeliveryAssignmentById.fulfilled, (state, action) => {
                state.assignmentDetailsLoading = false;
                state.selectedAssignment = action.payload.assignment;
            })
            .addCase(getDeliveryAssignmentById.rejected, (state, action) => {
                state.assignmentDetailsLoading = false;
                state.errorMessage = action.payload;
            })

    }

});

export const {
    clearDeliveryAssignmentMessages
} = deliveryAssignmentSlice.actions;

export default deliveryAssignmentSlice.reducer;