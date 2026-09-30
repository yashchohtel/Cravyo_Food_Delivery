import { createSlice } from "@reduxjs/toolkit";
import { createOrder } from "./orderThunk";

const initialState = {
    order: null,
    loading: false,
    errorMessage: null,
    successMessage: null
};

const orderSlice = createSlice({

    name: "order",

    initialState,

    reducers: {

        clearOrderMessages: (state) => {
            state.errorMessage = null;
            state.successMessage = null;
        },

        clearOrder: (state) => {
            state.order = null;
        }

    },

    extraReducers: (builder) => {

        builder

            /* ----------- CREATE ORDER ↓ */

            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.errorMessage = null;
                state.successMessage = null;
            })

            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload.order;
                state.successMessage = action.payload.message;
            })

            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = action.payload;
            });

    },

});

export const {
    clearOrderMessages,
    clearOrder
} = orderSlice.actions;

export default orderSlice.reducer;