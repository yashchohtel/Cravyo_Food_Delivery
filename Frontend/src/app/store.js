import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"; // Import the auth reducer

// configure store with 
const store = configureStore({

    // add reducers here
    reducer: {

        // auth reducer for authentication state management
        auth: authReducer,

    },

});

// export store for glocal use
export default store;