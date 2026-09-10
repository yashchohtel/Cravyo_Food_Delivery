import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"; 
import locationReducer from "../features/location/locationSlice" 
import promotionBannerReducer from '../features/platform/promotionBanners/promotionBannersSlice'
import foodCategoriesReducer from '../features/platform/topFoodCategories/topFoodCategoriesSlice'

// configure store with 
const store = configureStore({

    // add reducers here
    reducer: {

        // auth reducer for authentication state management
        auth: authReducer,

        // location reducer for manageing user locations
        location: locationReducer,

        // admin panel promotion banner reducer
        promotionBanners: promotionBannerReducer,

        // admin panel top food categories reducer
        foodCategories: foodCategoriesReducer,

    },

});

// export store for glocal use
export default store;