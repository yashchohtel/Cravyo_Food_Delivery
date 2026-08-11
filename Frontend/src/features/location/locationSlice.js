import { createSlice } from "@reduxjs/toolkit";

// getting saved user locaiton for conditional initialstate setting
const savedLocation = localStorage.getItem("userLocation");

// initial state
const initialState = {

    // location error dialog box open clsose state
    isLocationErrorDialogOpen: false,

    // erros related to getting location - "permission" / "positionUnavailable" / "timeout" / "unknown"
    locationError: null,

    // user location
    userLocation: savedLocation
        ? JSON.parse(savedLocation)
        : {
            latitude: null,
            longitude: null,
            address: "",
        },

    // location loading state
    isLocationLoading: !savedLocation,

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
            console.log(action.payload);
            state.isLocationErrorDialogOpen = action.payload;
        },

    },
});

// exporting location slice action
export const {
    setUserLocation,
    setIsLocationLoading,
    setLocationError,
    setIsLocationErrorDialogOpen,
} = locationSlice.actions;

// exporting location slice reducer
export default locationSlice.reducer;