import { createSlice } from "@reduxjs/toolkit";
import { createRestaurant, getMyRestaurant, getNearbyRestaurants, getShopById, updateRestaurantStatus, updateShop } from "./restaurantThunk";
import { createFoodItem, deleteFoodItem, updateFoodItem } from "../foodItems/foodItemThunk";

const initialState = {
    restaurant: null,
    loading: false,
    getRestaurantLoading: false,
    restaurantEditLoading: false,
    restaurantStatusLoading: false,
    nearbyRestaurants: [],
    nearbyRestaurantsLoading: false,
    selectedRestaurant: null,
    selectedRestaurantLoading: false,
    selectedRestaurantError: null,
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

            /* ----------- SYNC RESTAURANT FOOD ITEMS ↓ */

            .addCase(createFoodItem.fulfilled, (state, action) => {
                const foodItem = action.payload.foodItem;

                if (state.restaurant && foodItem) {
                    state.restaurant.foodItems.push(foodItem);
                }
            })

            .addCase(updateFoodItem.fulfilled, (state, action) => {
                const foodItem = action.payload.foodItem;

                if (state.restaurant && foodItem) {
                    state.restaurant.foodItems = state.restaurant.foodItems.map((item) =>
                        item._id === foodItem._id ? foodItem : item
                    );
                }
            })

            .addCase(deleteFoodItem.fulfilled, (state, action) => {
                if (state.restaurant) {
                    state.restaurant.foodItems = state.restaurant.foodItems.filter(
                        (item) => item._id !== action.meta.arg
                    );
                }
            })

            /* ----------- GET RESTAURANT BY ID ↓ */

            .addCase(getShopById.pending, (state) => {
                state.selectedRestaurantLoading = true;
                state.selectedRestaurant = null;
                state.selectedRestaurantError = null;
            })

            .addCase(getShopById.fulfilled, (state, action) => {
                state.selectedRestaurantLoading = false;
                state.selectedRestaurant = action.payload.shop;
            })

            .addCase(getShopById.rejected, (state, action) => {
                state.selectedRestaurantLoading = false;
                state.selectedRestaurantError = action.payload;
            })

            /* ----------- GET NEARBY RESTAURANTS ↓ */

            .addCase(getNearbyRestaurants.pending, (state) => {
                state.nearbyRestaurantsLoading = true;
                state.errorMessage = null;
            })

            .addCase(getNearbyRestaurants.fulfilled, (state, action) => {
                state.nearbyRestaurantsLoading = false;
                state.nearbyRestaurants = action.payload.restaurants;
            })

            .addCase(getNearbyRestaurants.rejected, (state, action) => {
                state.nearbyRestaurantsLoading = false;
                state.errorMessage = action.payload;
            })

    },

});

export const { clearRestaurantMessages } = restaurantSlice.actions;

export default restaurantSlice.reducer;


