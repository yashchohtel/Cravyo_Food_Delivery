import { createSlice } from "@reduxjs/toolkit";
import { createFoodItem, deleteFoodItem, getAllFoodItems, getPopularFoodNearYou, updateFoodItem } from "./foodItemThunk";

const initialState = {
    foodItems: [],
    popularFood: [],
    createLoading: false,
    getLoading: false,
    updateLoading: false,
    popularFoodLoading: false,
    deleteLoading: false,
    errorMessage: null,
    successMessage: null

};

const foodItemSlice = createSlice({

    name: "foodItem",

    initialState,

    reducers: {

        clearFoodItemMessages: (state) => {
            state.errorMessage = null;
            state.successMessage = null;
        },

        clearFoodItems: (state) => {
            state.foodItems = [];
        }

    },

    extraReducers: (builder) => {

        builder

            /* ----------- CREATE FOOD ITEM ↓ */

            .addCase(createFoodItem.pending, (state) => {
                state.createLoading = true;
                state.errorMessage = null;
                state.successMessage = null;
            })

            .addCase(createFoodItem.fulfilled, (state, action) => {
                state.createLoading = false;
                state.successMessage = action.payload.message;

                if (action.payload.foodItem) {
                    state.foodItems.push(action.payload.foodItem);
                }
            })

            .addCase(createFoodItem.rejected, (state, action) => {
                state.createLoading = false;
                state.errorMessage = action.payload;
            })

            /* ----------- GET ALL FOOD ITEM ↓ */

            .addCase(getAllFoodItems.pending, (state) => {
                state.getLoading = true;
                state.errorMessage = null;
            })

            .addCase(getAllFoodItems.fulfilled, (state, action) => {
                state.getLoading = false;
                state.foodItems = action.payload.foodItems;
            })

            .addCase(getAllFoodItems.rejected, (state, action) => {
                state.getLoading = false;
                state.errorMessage = action.payload;
            })

            /* ----------- UPDAE FOOD ITEM ↓ */

            .addCase(updateFoodItem.pending, (state) => {
                state.updateLoading = true;
                state.errorMessage = null;
                state.successMessage = null;
            })

            .addCase(updateFoodItem.fulfilled, (state, action) => {
                state.updateLoading = false;
                state.successMessage = action.payload.message;

                state.foodItems = state.foodItems.map((item) =>
                    item._id === action.payload.foodItem._id ? action.payload.foodItem : item
                );
            })

            .addCase(updateFoodItem.rejected, (state, action) => {
                state.updateLoading = false;
                state.errorMessage = action.payload;
            })

            /* ----------- DELETE FOOD ITEM ↓ */

            .addCase(deleteFoodItem.pending, (state) => {
                state.deleteLoading = true;
            })
            .addCase(deleteFoodItem.fulfilled, (state, action) => {
                state.deleteLoading = false;

                state.foodItems = state.foodItems.filter(
                    (item) => item._id !== action.meta.arg
                );
            })
            .addCase(deleteFoodItem.rejected, (state, action) => {
                state.deleteLoading = false;
                state.errorMessage = action.payload;
            })

            /* ----------- GET POPULAR FOOD NEAR YOU ↓ */

            .addCase(getPopularFoodNearYou.pending, (state) => {
                state.popularFoodLoading = true;
                state.errorMessage = null;
            })

            .addCase(getPopularFoodNearYou.fulfilled, (state, action) => {
                state.popularFoodLoading = false;
                state.popularFood = action.payload.foodItems;
            })

            .addCase(getPopularFoodNearYou.rejected, (state, action) => {
                state.popularFoodLoading = false;
                state.errorMessage = action.payload;
            })

    }

});

export const {
    clearFoodItemMessages,
    clearFoodItems
} = foodItemSlice.actions;

export default foodItemSlice.reducer;