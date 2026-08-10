import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"; 
import locationReducer from "../features/location/locationSlice" 

// configure store with 
const store = configureStore({

    // add reducers here
    reducer: {

        // auth reducer for authentication state management
        auth: authReducer,

        // location reducer for manageing user locations
        location: locationReducer,

    },

});

// export store for glocal use
export default store;