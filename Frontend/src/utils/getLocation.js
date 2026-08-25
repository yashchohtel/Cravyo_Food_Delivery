import axios from "axios"; // Importing axios for making HTTP requests

import {
    setUserCurrentLocation,
    setIsLocationLoading,
    setLocationError,
    setIsLocationErrorDialogOpen
} from "../features/location/locationSlice";


// Function to get user's current location and handle errors
export const handleGetLocation = async (dispatch) => {

    // Show loading only if no saved current location exists
    if (!localStorage.getItem("userCurrentLocation")) {
        dispatch(setIsLocationLoading(true));
    }

    // Check if browser supports geolocation
    if (!navigator.geolocation) {

        dispatch(setIsLocationLoading(false));
        dispatch(setLocationError("unknown"));
        dispatch(setIsLocationErrorDialogOpen(true));

        return;
    }

    navigator.geolocation.getCurrentPosition(

        // Success
        async (position) => {

            // Get latitude and longitude
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Get Geoapify API key
            const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY;

            // Reverse geocoding API URL
            const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`;

            try {

                // API call
                const response = await axios.get(url);

                const result = response.data.results[0];

                // Get address safely
                const suburb = result.suburb || result.district || "";
                const city = result.city || result.town || result.village || "";
                const state = result.state || "";
                const postcode = result.postcode || "";

                // Create short address title
                const addressTitle = [
                    suburb,
                    city
                ].filter(Boolean).join(", ");

                // Create complete address
                const address = [
                    suburb,
                    city,
                    state,
                    postcode
                ].filter(Boolean).join(", ");

                // Create current location data
                const locationData = {
                    latitude,
                    longitude,
                    addressTitle,
                    address,
                };

                // Update Redux current location
                dispatch(setUserCurrentLocation(locationData));

                // Save current location to localStorage
                localStorage.setItem("userCurrentLocation", JSON.stringify(locationData));

                // Stop loading
                dispatch(setIsLocationLoading(false));

            } catch (error) {

                console.error(error);

                dispatch(setIsLocationLoading(false));
                dispatch(setLocationError("unknown"));
                dispatch(setIsLocationErrorDialogOpen(true));

            }

        },

        // Error
        (error) => {

            switch (error.code) {

                case error.PERMISSION_DENIED:
                    dispatch(setLocationError("permission"));
                    break;

                case error.POSITION_UNAVAILABLE:
                    dispatch(setLocationError("positionUnavailable"));
                    break;

                case error.TIMEOUT:
                    dispatch(setLocationError("timeout"));
                    break;

                default:
                    dispatch(setLocationError("unknown"));

            }

            // Stop loading
            dispatch(setIsLocationLoading(false));

            // Open error dialog
            dispatch(setIsLocationErrorDialogOpen(true));

        }

    );

};

// Function to search for locations based on a query (autocomplete endpoint using the Geoapify API)
export const getSearchLocations = async (searchQuery) => {

    // Get Geoapify API Key from environment variables
    const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY;

    // Construct the API URL for location search
    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(searchQuery)}&limit=5&format=json&apiKey=${apiKey}`;

    try {

        // API Call
        const response = await axios.get(url);

        // Return the results from the API response
        return response.data.results;

    } catch (error) {

        // Log the error to the console and return an empty array if the API call fails
        console.error("Location Search Error:", error);
        return [];

    }

};

// Function to get address from latitude and longitude
export const getAddressFromCoordinates = async (latitude, longitude) => {

    const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY;

    const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`;

    try {

        const response = await axios.get(url);

        const result = response.data?.results?.[0];

        // No result found
        if (!result) {
            console.log("No location data found");
            return;
        }

        // Get location fields safely
        const suburb = result.suburb || result.district || "";
        const city = result.city || result.town || result.village || "";
        const state = result.state || "";
        const postcode = result.postcode || "";

        // Create short location title
        const addressTitle = [
            suburb,
            city
        ].filter(Boolean).join(", ");

        // Remove empty values and create address
        const address = [
            suburb,
            city,
            state,
            postcode
        ].filter(Boolean).join(", ");

        const locationData = {
            latitude,
            longitude,
            addressTitle,
            address,
        };

        return locationData;

    } catch (error) {

        console.error("Error getting address:", error);

    }

};

// Function to get distance between user current locaiton and user selected location other then current location
export const calculateDistance = (lat1, lon1, lat2, lon2) => {

    const R = 6371; // Earth radius in km

    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}