import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBanner as createBannerThunk } from "../features/platform/promotionBanners/promotionBannersThunk.js";
import toast from "react-hot-toast";

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
            isActive: true,
            image: null,
            imagePreview: null,
        });

        setBannerErrors({
            title: "",
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
    const createBanner = async (onClose) => {

        const { image, title, isActive } = bannerForm;

        // Calculate order fresh at submit time
        const order = banners.length + 1;

        const formData = new FormData();
        formData.append("image", image);
        formData.append("bannersData", JSON.stringify([{
            title: title || "",
            order: order,
            location: "home",
            isActive: isActive,
        }]));

        try {

            // unwrap() throws if thunk was rejected, so we can catch real errors
            await dispatch(createBannerThunk(formData)).unwrap();

            toast.success("Banner added successfully"); // Show success toast

            resetBannerForm(); // Reset form after successful creation

            onClose(); // Close the modal after successful creation

        } catch (error) {

            toast.error(error || "Failed to add banner");

        }
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