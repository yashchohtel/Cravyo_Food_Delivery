import { createSlice } from "@reduxjs/toolkit";
import { createOrder, getMyOrders, getRestaurantOrders, updateOrderStatus } from "./orderThunk";

const initialState = {
    order: null,
    orders: [],
    restaurantOrders: [],
    loading: false,
    ordersLoading: false,
    restaurantOrdersLoading: false,
    updateOrderStatusLoading: false,
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
            })

            /* ----------- GET MY ORDER ↓ */
            .addCase(getMyOrders.pending, (state) => {
                state.ordersLoading = true;
                state.errorMessage = null;
            })
            .addCase(getMyOrders.fulfilled, (state, action) => {
                state.ordersLoading = false;
                state.orders = action.payload.orders;
            })
            .addCase(getMyOrders.rejected, (state, action) => {
                state.ordersLoading = false;
                state.errorMessage = action.payload;
            })

            /* ----------- GET RESTAURANT ORDER ↓ */
            .addCase(getRestaurantOrders.pending, (state) => {
                state.restaurantOrdersLoading = true;
                state.errorMessage = null;
            })
            .addCase(getRestaurantOrders.fulfilled, (state, action) => {
                state.restaurantOrdersLoading = false;
                state.restaurantOrders = action.payload.orders;
            })
            .addCase(getRestaurantOrders.rejected, (state, action) => {
                state.restaurantOrdersLoading = false;
                state.errorMessage = action.payload;
            })

            /* ----------- UPDATE ORDER STATUS ↓ */
            .addCase(updateOrderStatus.pending, (state) => {
                state.updateOrderStatusLoading = true;
                state.errorMessage = null;
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                state.updateOrderStatusLoading = false;

                const updatedOrder = action.payload.order;

                state.restaurantOrders = state.restaurantOrders.map((order) =>
                    order._id === updatedOrder._id
                        ? updatedOrder
                        : order
                );
            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.updateOrderStatusLoading = false;
                state.errorMessage = action.payload;
            })

    },

});

export const {
    clearOrderMessages,
    clearOrder
} = orderSlice.actions;

export default orderSlice.reducer;