import { createSlice } from "@reduxjs/toolkit";
import { getFoodCategories } from "./topFoodCategoriesThunk";

// initial state
const initialState = {

    // store food categories
    categories: [],

    // loading state
    loading: false,

    // error message
    error: null,

};


// create food category slice
const foodCategorySlice = createSlice({

    name: "foodCategories",

    initialState,

    reducers: {

        // clear category error
        clearCategoryError: (state) => {
            state.error = null;
        },

    },

    extraReducers: (builder) => {

        builder

            /* ----------- GET FOOD CATEGORIES ↓ */

            // Pending
            .addCase(getFoodCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            // Fulfilled
            .addCase(getFoodCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })

            // Rejected
            .addCase(getFoodCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },

});


// export actions
export const {
    clearCategoryError
} = foodCategorySlice.actions;


// export reducer
export default foodCategorySlice.reducer;