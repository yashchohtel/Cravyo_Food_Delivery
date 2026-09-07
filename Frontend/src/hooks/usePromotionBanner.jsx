/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBanner as createBannerThunk } from "../features/platform/promotionBanners/promotionBannersThunk.js";

const usePromotionBanner = () => {

    // initilize use dispatch
    const dispatch = useDispatch();

    /* -------------------------------------- */

    // Get existing banners list from redux store
    const { banners } = useSelector((state) => state.promotionBanners);

    /* -------------------------------------- */

    // Banner form state
    const [bannerForm, setBannerForm] = useState({
        title: "",
        order: banners.length + 1,   // auto-calculated order
        isActive: true,
        image: null,
        imagePreview: null,
    });

    // Error state - key matches field name, value is error message
    const [bannerErrors, setBannerErrors] = useState({
        title: "",
        order: "",
        image: "",
    });

    /* -------------------------------------- */

    // handle banner form change 
    const handleBannerChange = (e) => {

        // get name and value from event target
        const { name, value } = e.target;

        // update banner form state
        setBannerForm((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

    /* -------------------------------------- */

    // Reset banner form and errors back to default (used on modal open/close)
    const resetBannerForm = () => {

        setBannerForm({
            title: "",
            order: banners.length + 1,   // auto-calculated order
            isActive: true,
            image: null,
            imagePreview: null,
        });

        setBannerErrors({
            title: "",
            order: "",
            image: "",
        });

    };

    // handle image change
    const handleImageChange = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        // Hard limit - reject if more than 5MB
        if (file.size > 5 * 1024 * 1024) {

            setBannerErrors((prev) => ({
                ...prev,
                image: "Image size should not exceed 5MB",
            }));

            return;

        }

        // Soft warning - allow but notify if between 2MB and 5MB
        if (file.size > 2 * 1024 * 1024) {

            setBannerErrors((prev) => ({
                ...prev,
                image: "Larger than recommended 2MB, upload may take longer",
            }));

        } else {

            // Clear error if within recommended size
            setBannerErrors((prev) => ({
                ...prev,
                image: "",
            }));

        }

        setBannerForm((prev) => ({
            ...prev,
            image: file,
            imagePreview: URL.createObjectURL(file),
        }));

    };

    // Create banner - builds FormData from current form state and logs it
    const createBanner = () => {

        // Extract fields from current banner form state
        const { image, title, order, isActive } = bannerForm;

        const formData = new FormData();

        // Image file
        // Note: field name must match multer config -> "image"
        formData.append("image", image);

        // Banner details as JSON string (backend expects array format)
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

        // Dispatch the create banner thunk with the FormData
        dispatch(createBannerThunk(formData));

    };

    // Return all state and functions from the hook
    return {
        createBanner,
        bannerForm,
        bannerErrors,
        setBannerForm,
        handleBannerChange,
        handleImageChange,
        resetBannerForm,
    };
};

export default usePromotionBanner;