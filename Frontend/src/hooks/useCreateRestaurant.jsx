import { useEffect, useState } from "react";
import { getAddressFromCoordinates } from "../utils/getLocation";

const useCreateRestaurant = () => {

    // create resturant form data 
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        openingTime: "",
        closingTime: "",
        foodType: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
        mapLocation: "",
        latitude: "",
        longitude: "",
        image: null,
        imagePreview: null
    });


    // Handle map location
    const handleMapLocation = async (lat, lng) => {

        setFormData((prev) => ({
            ...prev,
            latitude: lat,
            longitude: lng
        }));

        const locationData = await getAddressFromCoordinates(lat, lng);

        if (locationData) {
            setFormData((prev) => ({
                ...prev,
                mapLocation: locationData.address
            }));
        }
    };

    // Get saved current location
    useEffect(() => {
        const savedCurrentLocation = localStorage.getItem("userCurrentLocation");

        if (!savedCurrentLocation) {
            return;
        }

        const userCurrentLocation = JSON.parse(savedCurrentLocation);

        const getInitialLocation = async () => {
            const locationData = await getAddressFromCoordinates(
                userCurrentLocation.latitude,
                userCurrentLocation.longitude
            );

            setFormData((prev) => ({
                ...prev,
                latitude: userCurrentLocation.latitude,
                longitude: userCurrentLocation.longitude,
                mapLocation: locationData?.address || ""
            }));
        };

        getInitialLocation();

    }, []);

    return {
        formData,
        handleMapLocation
    };
};

export default useCreateRestaurant;