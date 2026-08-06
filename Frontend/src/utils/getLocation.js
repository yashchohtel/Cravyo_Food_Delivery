import axios from "axios"; // Importing axios for making HTTP requests

// Function to get user's location and handle errors (reverse geocoding using Geoapify API)
export const handleGetLocation = async (setLocationError, setIsLocationDialogOpen, setUserLocation, setIsLocationLoading) => {

    // Show loading only if no saved location exists
    if (!localStorage.getItem("userLocation")) {
        setIsLocationLoading(true);
    }

    // Check if the browser supports geolocation
    if (!navigator.geolocation) {
        setIsLocationLoading(false);
        setLocationError("unknown");
        setIsLocationDialogOpen(true);
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
                setUserLocation(locationData);

                // Store user location in local storage
                localStorage.setItem("userLocation", JSON.stringify(locationData));

                // Stop loading
                setIsLocationLoading(false);

            } catch (error) {

                console.error(error);

                setIsLocationLoading(false);
                setLocationError("unknown");
                setIsLocationDialogOpen(true);

            }

        },

        // Error
        (error) => {

            // Handle different types of geolocation errors and set the appropriate error message
            switch (error.code) {

                case error.PERMISSION_DENIED:

                    setLocationError("permission");
                    break;

                case error.POSITION_UNAVAILABLE:

                    setLocationError("positionUnavailable");
                    break;

                case error.TIMEOUT:

                    setLocationError("timeout");
                    break;

                default:

                    setLocationError("unknown");

            }

            // Stop loading
            setIsLocationLoading(false);

            // Open the location error dialog
            setIsLocationDialogOpen(true);

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