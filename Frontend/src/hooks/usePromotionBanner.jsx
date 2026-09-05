/* eslint-disable no-unused-vars */
import { useDispatch } from "react-redux";

const usePromotionBanner = () => {

    // initilize use dispatch
    const dispatch = useDispatch();

    // Create banner
    const createBanner = ({ image, title, order, isActive }) => {

        const formData = new FormData();

        formData.append("files", image);

        formData.append("bannersData", JSON.stringify(
            [
                {
                    title: title || "",
                    order: Number(order),
                    location: "home",
                    isActive: isActive,
                }
            ]
        ));

        // Check FormData
        console.log("IMAGE:", image);

        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }
        
    };

    return {
        createBanner,
    };
};

export default usePromotionBanner;