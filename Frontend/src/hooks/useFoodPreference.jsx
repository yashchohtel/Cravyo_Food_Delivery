import { useState } from "react";

const useFoodPreference = () => {

    // state to show/hide food preference dialog
    const [isFoodDialogOpen, setIsFoodDialogOpen] = useState(false);

    // state to store user's food preference
    const [userFoodPreference, setUserFoodPreference] = useState(() => {

        // get saved preference from localStorage
        const savedPreference = localStorage.getItem("userFoodPreference");

        // default preference
        if (savedPreference === null) {
            return "all";
        }

        // return saved preference
        return JSON.parse(savedPreference);

    });

    return {
        isFoodDialogOpen,       // food preference dialog state
        setIsFoodDialogOpen,    // update dialog state
        userFoodPreference,     // current food preference
        setUserFoodPreference   // update food preference
    };
};

export default useFoodPreference;