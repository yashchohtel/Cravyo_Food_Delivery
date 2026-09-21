import { createSlice } from "@reduxjs/toolkit";
import { createRestaurant, getMyRestaurant, updateRestaurantStatus, updateShop } from "./restaurantThunk";

const initialState = {
    restaurant: null,
    loading: false,
    getRestaurantLoading: false,
    restaurantEditLoading: false,
    restaurantStatusLoading: false,
    errorMessage: null,
    successMessage: null
};

const restaurantSlice = createSlice({

    name: "restaurant",

    initialState,

    reducers: {

        clearRestaurantMessages: (state) => {
            state.errorMessage = null;
            state.successMessage = null;
        },

    },

    extraReducers: (builder) => {

        builder

            /* ----------- CREATE RESTAURANT ↓ */

            .addCase(createRestaurant.pending, (state) => {
                state.loading = true;
                state.errorMessage = null;
                state.successMessage = null;
            })

            .addCase(createRestaurant.fulfilled, (state, action) => {
                state.loading = false;
                state.restaurant = action.payload.shop;
                state.successMessage = action.payload.message;
            })

            .addCase(createRestaurant.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = action.payload;
            })

            /* ----------- GET RESTAURANT ↓ */

            .addCase(getMyRestaurant.pending, (state) => {
                state.getRestaurantLoading = true;
                state.errorMessage = null;
            })

            .addCase(getMyRestaurant.fulfilled, (state, action) => {
                state.getRestaurantLoading = false;
                state.restaurant = action.payload.shop;
            })

            .addCase(getMyRestaurant.rejected, (state, action) => {
                state.getRestaurantLoading = false;
                state.errorMessage = action.payload;
            })

            /* ----------- UPDATE RESTAURANT ↓ */

            .addCase(updateShop.pending, (state) => {
                state.restaurantEditLoading = true;
            })

            .addCase(updateShop.fulfilled, (state, action) => {
                state.restaurantEditLoading = false;
                state.restaurant = action.payload.shop;
            })

            .addCase(updateShop.rejected, (state) => {
                state.restaurantEditLoading = false;
            })

            /* ----------- UPDATE RESTAURANT STATUS ↓ */

            .addCase(updateRestaurantStatus.pending, (state) => {
                state.restaurantStatusLoading = true;
                state.errorMessage = null;
            })

            .addCase(updateRestaurantStatus.fulfilled, (state, action) => {
                state.restaurantStatusLoading = false;
                state.restaurant = action.payload.shop;
                state.successMessage = action.payload.message;
            })

            .addCase(updateRestaurantStatus.rejected, (state, action) => {
                state.restaurantStatusLoading = false;
                state.errorMessage = action.payload;
            })

    },

});

export const { clearRestaurantMessages } = restaurantSlice.actions;

export default restaurantSlice.reducer;