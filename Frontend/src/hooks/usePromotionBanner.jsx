import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    createBanner as createBannerThunk,
    updateBanner as updateBannerThunk,
    deleteBanner as deleteBannerThunk,
    refreshPromotionBanners
} from "../features/platform/promotionBanners/promotionBannersThunk.js";

import toast from "react-hot-toast";

const usePromotionBanner = () => {

    // initilize use dispatch
    const dispatch = useDispatch();

    /* -------------------------------------- */

    // Get existing banners list from redux store
    const { banners } = useSelector((state) => state.promotionBanners);

    /* STATE AND FUNCTIONS RELATED TO CREATE BANNER -------------------------------------- */

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

    /* STATE AND FUNCTIONS RELATED TO EDIT BANNER -------------------------------------- */

    // Separate state for Edit Banner form (kept separate from Add form)
    const [editBannerForm, setEditBannerForm] = useState({
        title: "",
        order: "",
        isActive: true,
        image: null,
        imagePreview: null,
    });

    // error state for edit banner form
    const [editBannerErrors, setEditBannerErrors] = useState({
        title: "",
        order: "",
        image: "",
    });

    // Fill edit form with existing banner's data - called when edit modal opens
    const initEditBannerForm = (banner) => {

        setEditBannerForm({
            title: banner?.title || "",
            order: banner?.order ?? "",
            isActive: banner?.isActive ?? true,
            image: null,
            imagePreview: banner?.image || null,  // purani image dikhao by default
        });

        // clear old errors when opening fresh edit form
        setEditBannerErrors({
            title: "",
            order: "",
            image: "",
        });

    };

    // Handle changes in the edit banner form
    const handleEditBannerChange = (e) => {

        const { name, value } = e.target;

        // update form state
        setEditBannerForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        // realtime validation for order field
        if (name === "order") {

            if (!value) {
                setEditBannerErrors((prev) => ({
                    ...prev,
                    order: "Order is required",
                }));
            } else if (!Number.isInteger(Number(value))) {
                setEditBannerErrors((prev) => ({
                    ...prev,
                    order: "Order must be a whole number",
                }));
            } else if (Number(value) <= 0) {
                setEditBannerErrors((prev) => ({
                    ...prev,
                    order: "Order must be greater than 0",
                }));
            } else if (Number(value) > banners.length) {
                setEditBannerErrors((prev) => ({
                    ...prev,
                    order: `Order cannot exceed ${banners.length}`,
                }));
            } else {
                setEditBannerErrors((prev) => ({
                    ...prev,
                    order: "",
                }));
            }

        }
    };

    // Handle image change for edit banner form
    const handleEditImageChange = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        // hard limit check
        if (file.size > 5 * 1024 * 1024) {
            setEditBannerErrors((prev) => ({
                ...prev,
                image: "Image size should not exceed 5MB",
            }));
            return;
        }

        // soft warning check
        if (file.size > 2 * 1024 * 1024) {
            setEditBannerErrors((prev) => ({
                ...prev,
                image: "Larger than recommended 2MB, upload may take longer",
            }));
        } else {
            setEditBannerErrors((prev) => ({
                ...prev,
                image: "",
            }));
        }

        setEditBannerForm((prev) => ({
            ...prev,
            image: file,
            imagePreview: URL.createObjectURL(file),
        }));

    };

    // Log edit banner data on submit - temporary check before API integration
    const updateBanner = async (bannerId, onClose) => {

        const { title, order, isActive, image } = editBannerForm;

        const formData = new FormData();

        // only append image if user selected a new one
        if (image) {
            formData.append("image", image);
        }

        formData.append("title", title || "");
        formData.append("isActive", isActive);
        formData.append("order", Number(order));

        try {

            await dispatch(updateBannerThunk({ id: bannerId, formData })).unwrap();

            toast.success("Banner updated successfully");

            // silently refresh full list to sync shifted orders, no skeleton shown
            dispatch(refreshPromotionBanners());

            onClose();

        } catch (error) {

            toast.error(error || "Failed to update banner");

        }

    };

    /* STATE AND FUNCTIONS RELATED TO DELETE BANNER -------------------------------------- */

    // Delete banner
    const deleteBanner = async (bannerId, onClose) => {

        try {

            await dispatch(deleteBannerThunk(bannerId)).unwrap();

            toast.success("Banner deleted successfully");

            // Close delete modal
            onClose();

        } catch (error) {

            toast.error(error || "Failed to delete banner");

        }

    };

    /* STATE AND FUNCTIONS RELATED TO BANNER SEARCH & FILTER ----------------------------- */

    // Search state
    const [search, setSearch] = useState("");

    // Filter state
    const [status, setStatus] = useState("all");

    // sort state
    const [sort, setSort] = useState("latest");

    // searching banners based on title (case-insensitive)
    const filteredBanners = banners.filter((banner) => {

        // Search condition
        const matchesSearch = banner.title.toLowerCase().includes(search.toLowerCase());

        // Status condition
        const matchesStatus = status === "all" || (status === "active" && banner.isActive) || (status === "inactive" && !banner.isActive);

        return matchesSearch && matchesStatus;
    });

    // Sorting banners based on selected sort option
    const sortedBanners = [...filteredBanners].sort((a, b) => {

        if (sort === "latest") {
            return new Date(b.createdAt) - new Date(a.createdAt);
        }

        if (sort === "oldest") {
            return new Date(a.createdAt) - new Date(b.createdAt);
        }

        if (sort === "order") {
            return a.order - b.order;
        }

        return 0;
    });

    // Return all state and functions from the hook
    return {

        // state and functions related to create banner
        createBanner,
        bannerForm,
        bannerErrors,
        handleBannerChange,
        handleImageChange,
        resetBannerForm,

        // state and functions related to edit banner
        editBannerForm,
        initEditBannerForm,
        handleEditBannerChange,
        editBannerErrors,
        handleEditImageChange,
        updateBanner,

        // function to delete banner
        deleteBanner,

        // function and state related to search and filter
        search,
        setSearch,
        status,
        setStatus,
        sort,
        setSort,
        sortedBanners,

    };
};

export default usePromotionBanner;