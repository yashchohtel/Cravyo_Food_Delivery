import { createSlice } from "@reduxjs/toolkit";
import { createBanner, getPromotionBanners } from "./promotionBannersThunk";


// initial state
const initialState = {

    // store promotion banners
    banners: [],

    // loading state
    loading: false,

    // loading for creating a new banner
    createLoading: false,

    // error message
    error: null,

};

// create promotion banner slice
const promotionBannerSlice = createSlice({

    // slice name
    name: "promotionBanners",

    // initial state
    initialState,

    // reducers
    reducers: {

        // clear banner error
        clearBannerError: (state) => {
            state.error = null;
        },

    },

    // extra reducers
    extraReducers: (builder) => {

        builder

            /* ----------- GET PROMOTION BANNERS ↓ */

            // Pending
            .addCase(getPromotionBanners.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            // Fulfilled
            .addCase(getPromotionBanners.fulfilled, (state, action) => {
                state.loading = false;
                state.banners = action.payload;
            })

            // Rejected
            .addCase(getPromotionBanners.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            /* ----------- CREATE PROMOTION BANNER ↓ */

            .addCase(createBanner.pending, (state) => {
                state.createLoading = true;
                state.error = null;
            })

            .addCase(createBanner.fulfilled, (state, action) => {
                state.createLoading = false;
                // backend returns array of created banners - add them to existing list
                state.banners = [...state.banners, ...action.payload];
            })

            .addCase(createBanner.rejected, (state, action) => {
                state.createLoading = false;
                state.error = action.payload;
            })

    },

});


// export actions
export const { clearBannerError } = promotionBannerSlice.actions;


// export reducer
export default promotionBannerSlice.reducer;