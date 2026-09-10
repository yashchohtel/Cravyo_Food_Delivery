import { createSlice } from "@reduxjs/toolkit";

import {
    getFoodCategories,
    createFoodCategory,
    updateFoodCategory,
    refreshFoodCategories,
    deleteFoodCategory,
} from "./topFoodCategoriesThunk";

const initialState = {
    categories: [],
    loading: false,
    createLoading: false,
    updateLoading: false,
    deleteLoading: false,
    error: null,
};

const foodCategorySlice = createSlice({

    name: "foodCategories",

    initialState,

    reducers: {

        clearCategoryError: (state) => {
            state.error = null;
        },

    },

    extraReducers: (builder) => {

        builder

            /* GET FOOD CATEGORIES */
            .addCase(getFoodCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getFoodCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })

            .addCase(getFoodCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            /* CREATE FOOD CATEGORY */
            .addCase(createFoodCategory.pending, (state) => {
                state.createLoading = true;
                state.error = null;
            })

            .addCase(createFoodCategory.fulfilled, (state, action) => {
                state.createLoading = false;
                state.categories = [
                    ...state.categories,
                    ...action.payload,
                ];
            })

            .addCase(createFoodCategory.rejected, (state, action) => {
                state.createLoading = false;
                state.error = action.payload;
            })


            /* UPDATE FOOD CATEGORY */
            .addCase(updateFoodCategory.pending, (state) => {
                state.updateLoading = true;
                state.error = null;
            })

            .addCase(updateFoodCategory.fulfilled, (state, action) => {
                state.updateLoading = false;

                state.categories = state.categories.map(
                    (category) => category._id === action.payload._id ? action.payload : category
                );
            })

            .addCase(updateFoodCategory.rejected, (state, action) => {
                state.updateLoading = false;
                state.error = action.payload;
            })


            /* REFRESH FOOD CATEGORIES */
            .addCase(refreshFoodCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
            })

            .addCase(refreshFoodCategories.rejected, (state, action) => {
                console.log("Silent category refresh failed:", action.payload);
            })


            /* DELETE FOOD CATEGORY */
            .addCase(deleteFoodCategory.pending, (state) => {
                state.deleteLoading = true;
                state.error = null;
            })

            .addCase(deleteFoodCategory.fulfilled, (state, action) => {
                state.deleteLoading = false;

                state.categories = state.categories.filter(
                    (category) => category._id !== action.meta.arg
                );
            })

            .addCase(deleteFoodCategory.rejected, (state, action) => {
                state.deleteLoading = false;
                state.error = action.payload;
            });

    },

});

export const {
    clearCategoryError,
} = foodCategorySlice.actions;

export default foodCategorySlice.reducer;