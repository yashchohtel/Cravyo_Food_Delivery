import { createSlice } from "@reduxjs/toolkit";

// Get saved locations from localStorage
const savedCurrentLocation = localStorage.getItem("userCurrentLocation");
const savedSelectedLocation = sessionStorage.getItem("selectedLocation");

// initial state
const initialState = {

    // location error dialog box open clsose state
    isLocationErrorDialogOpen: false,

    // erros related to getting location - "permission" / "positionUnavailable" / "timeout" / "unknown"
    locationError: null,

    // user location
    userCurrentLocation: savedCurrentLocation ? JSON.parse(savedCurrentLocation)
        : {
            latitude: null,
            longitude: null,
            addressTitle: "",
            address: "",
        },

    // User's manually selected location
    selectedLocation: savedSelectedLocation ? JSON.parse(savedSelectedLocation)
        : {
            latitude: null,
            longitude: null,
            addressTitle: "",
            address: "",
        },

    // location loading state
    isLocationLoading: !savedCurrentLocation,

    // map location loading
    isMapLocationLoading: false

};

// creating location slice
const locationSlice = createSlice({

    // name of the slice
    name: "location",

    // initial state
    initialState,

    // reducers
    reducers: {

        // Set actual GPS location
        setUserCurrentLocation: (state, action) => {
            state.userCurrentLocation = action.payload;
        },

        // Set manually selected location
        setSelectedLocation: (state, action) => {
            state.selectedLocation = action.payload;
        },

        // Location loading
        setIsLocationLoading: (state, action) => {
            state.isLocationLoading = action.payload;
        },

        // Location error
        setLocationError: (state, action) => {
            state.locationError = action.payload;
        },

        // Location error dialog
        setIsLocationErrorDialogOpen: (state, action) => {
            state.isLocationErrorDialogOpen = action.payload;
        },

        // Map location loading
        setIsMapLocationLoading: (state, action) => {
            state.isMapLocationLoading = action.payload;
        },

    },
});

// exporting location slice action
export const {
    setUserCurrentLocation,
    setSelectedLocation,
    setIsLocationLoading,
    setLocationError,
    setIsLocationErrorDialogOpen,
    setIsMapLocationLoading
} = locationSlice.actions;

// exporting location slice reducer
export default locationSlice.reducer;