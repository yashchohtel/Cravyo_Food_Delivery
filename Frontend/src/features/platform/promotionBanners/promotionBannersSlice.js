import { createSlice } from "@reduxjs/toolkit";
import { getPromotionBanners } from "./promotionBannersThunk";


// initial state
const initialState = {

    // store promotion banners
    banners: [],

    // loading state
    loading: false,

    // error message
    error: null,

};


// create promotion banner slice
const promotionBannerSlice = createSlice({

    // slice name
    name: "promotionBanner",

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

    },

});


// export actions
export const { clearBannerError } = promotionBannerSlice.actions;


// export reducer
export default promotionBannerSlice.reducer;