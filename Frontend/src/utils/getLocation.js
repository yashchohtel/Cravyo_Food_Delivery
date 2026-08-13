import axios from "axios"; // Importing axios for making HTTP requests
import { setIsLocationErrorDialogOpen, setIsLocationLoading, setLocationError, setUserLocation } from "../features/Location/locationSlice";

// Function to get user's location and handle errors (reverse geocoding using Geoapify API)
export const handleGetLocation = async (dispatch) => {

    // Show loading only if no saved location exists
    if (!localStorage.getItem("userLocation")) {
        dispatch(setIsLocationLoading(true));
    }

    // Check if the browser supports geolocation
    if (!navigator.geolocation) {
        dispatch(setIsLocationLoading(false));
        dispatch(setLocationError("unknown"));
        dispatch(setIsLocationErrorDialogOpen(true));
        return;
    }

    navigator.geolocation.getCurrentPosition(

        // Success
        async (position) => {

            // Get latitude and longitude from position object
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Get Geoapify API Key from environment variables
            const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY;

            // Construct the API URL for reverse geocoding
            const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`;

            try {


                // API Call
                const response = await axios.get(url);
                const result = response.data.results[0];
                const address = `${result.suburb || result.district}, ${result.city}, ${result.state}`;

                // Create location data object
                const locationData = {
                    latitude,
                    longitude,
                    address,
                };

                // Set user location state
                dispatch(setUserLocation(locationData));

                // Store user location in local storage
                localStorage.setItem("userLocation", JSON.stringify(locationData));

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

            // Handle different types of geolocation errors and set the appropriate error message
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

            // Open the location error dialog
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