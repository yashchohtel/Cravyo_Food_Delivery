import { useState } from "react";

const useCreateRestaurant = () => {

    // Location state
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    return {
        latitude,
        setLatitude,
        longitude,
        setLongitude
    };
};

export default useCreateRestaurant;