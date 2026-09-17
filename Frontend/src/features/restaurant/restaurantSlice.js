import { createSlice } from "@reduxjs/toolkit";
import { createRestaurant } from "./restaurantThunk";

const initialState = {
    restaurant: null,
    loading: false,
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
            });

    },

});

export const { clearRestaurantMessages } = restaurantSlice.actions;

export default restaurantSlice.reducer;