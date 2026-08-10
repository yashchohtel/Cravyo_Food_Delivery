import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
    isLocationErrorDialogOpen: false,
    locationError: null,
    userLocation: null,
    isLocationLoading: false,
};


// creating location slice
const locationSlice = createSlice({

    // name of the slice
    name: "location",

    // initial state
    initialState,

    // reducers
    reducers: {

        setUserLocation: (state, action) => {
            state.userLocation = action.payload;
        },

        setIsLocationLoading: (state, action) => {
            state.isLocationLoading = action.payload;
        },

        setLocationError: (state, action) => {
            state.locationError = action.payload;
        },

        setIsLocationErrorDialogOpen: (state, action) => {
            state.isLocationDialogOpen = action.payload;
        },

    },
});

// exporting location slice action
export const {
    setUserLocation,
    setIsLocationLoading,
    setLocationError,
    setIsLocationDialogOpen,
} = locationSlice.actions;

// exporting location slice reducer
export default locationSlice.reducer;