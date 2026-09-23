/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFoodItem, deleteFoodItem, updateFoodItem } from "../../features/restaurant dashboard/foodItems/foodItemThunk";
import toast from "react-hot-toast";

const useAddFoodItem = ({ onClose, mode, data } = {}) => {

    const dispatch = useDispatch();

    const restaurant = useSelector((state) => state.restaurant.restaurant);

    const {
        createLoading: createFoodItemLoading,
        updateLoading: updateFoodItemLoading,
        deleteLoading: deleteFoodItemLoading,
        errorMessage,
        successMessage
    } = useSelector((state) => state.foodItem);

    // LOGIC RELATED TO CREATE FOOD ITME ----------------------------------

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        originalPrice: "",
        discount: "",
        category: "",
        isVeg: true,
        isAvailable: true,
        preparationTime: "",
        image: null,
        imagePreview: null
    });

    const [categoryType, setCategoryType] = useState("existing");

    const [errors, setErrors] = useState({});

    // Handle input change
    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: ""
        }));
    };

    // Handle food type
    const handleFoodTypeChange = (value) => {

        setFormData((prev) => ({
            ...prev,
            isVeg: value === "veg"
        }));
    };

    // Handle category type
    const handleCategoryTypeChange = (type) => {

        setCategoryType(type);

        setFormData((prev) => ({
            ...prev,
            category: ""
        }));

        setErrors((prev) => ({
            ...prev,
            category: ""
        }));
    };

    // Handle image
    const handleImageChange = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        let error = "";

        if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
            error = "Only JPG, PNG and WEBP images are allowed";
        } else if (file.size > 5 * 1024 * 1024) {
            error = "Image size must be less than 5MB";
        }

        if (error) {
            setFormData((prev) => ({
                ...prev,
                image: null,
                imagePreview: null
            }));

            setErrors((prev) => ({
                ...prev,
                image: error
            }));

            return;
        }

        setFormData((prev) => ({
            ...prev,
            image: file,
            imagePreview: URL.createObjectURL(file)
        }));

        setErrors((prev) => ({
            ...prev,
            image: ""
        }));
    };

    // Validate form
    const validateForm = () => {

        const newErrors = {};

        if (mode === "add" && !formData.image) {
            newErrors.image = "Food item image is required";
        }

        if (!formData.name.trim()) {
            newErrors.name = "Food name is required";
        }

        if (!formData.description.trim()) {
            newErrors.description = "Description is required";
        }

        if (!formData.price || Number(formData.price) < 0) {
            newErrors.price = "Valid price is required";
        }

        if (!formData.category.trim()) {
            newErrors.category = "Category is required";
        }

        if (
            formData.discount !== "" &&
            (Number(formData.discount) < 0 || Number(formData.discount) > 100)
        ) {
            newErrors.discount = "Discount must be between 0 and 100";
        }

        if (
            !formData.preparationTime ||
            Number(formData.preparationTime) < 0
        ) {
            newErrors.preparationTime = "Preparation time is required";
        }

        if (!restaurant?._id) {
            newErrors.shop = "Restaurant not found";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // Create food item
    const handleCreateFoodItem = async (e) => {

        e.preventDefault();

        const isValid = validateForm();

        if (!isValid) return;

        const foodItemData = new FormData();

        foodItemData.append("shop", restaurant._id);
        foodItemData.append("name", formData.name.trim());
        foodItemData.append("description", formData.description.trim());
        foodItemData.append("price", formData.price);
        foodItemData.append("category", formData.category.trim());
        foodItemData.append("isVeg", formData.isVeg);
        foodItemData.append("isAvailable", formData.isAvailable);
        foodItemData.append("preparationTime", formData.preparationTime);
        foodItemData.append("discount", formData.discount === "" ? 0 : formData.discount);
        foodItemData.append("image", formData.image);

        try {

            const result = await dispatch(
                createFoodItem(foodItemData)
            ).unwrap();

            toast.success(result.message);

            onClose();

        } catch (error) {

            toast.error(error?.message || "Failed to create food item");

        }
    };

    // LOGIC RELATED TO EDIT FOOD ITME ----------------------------------

    useEffect(() => {

        if (mode === "edit" && data) {

            setFormData({
                name: data.name || "",
                description: data.description || "",
                price: data.price || "",
                originalPrice: data.originalPrice || "",
                discount: data.discount || "",
                category: data.category || "",
                isVeg: data.isVeg ?? true,
                isAvailable: data.isAvailable ?? true,
                preparationTime: data.preparationTime || "",
                image: null,
                imagePreview: data.image || null
            });
        }

    }, [mode, data]);

    // Update food item
    const handleUpdateFoodItem = async (e) => {

        e.preventDefault();

        const isValid = validateForm();

        if (!isValid) return;

        const foodItemData = new FormData();

        foodItemData.append("name", formData.name.trim());
        foodItemData.append("description", formData.description.trim());
        foodItemData.append("price", formData.price);
        foodItemData.append("category", formData.category.trim());
        foodItemData.append("isVeg", formData.isVeg);
        foodItemData.append("isAvailable", formData.isAvailable);
        foodItemData.append("preparationTime", formData.preparationTime);
        foodItemData.append(
            "discount",
            formData.discount === "" ? 0 : formData.discount
        );

        // Send image only if user selected a new image
        if (formData.image) {
            foodItemData.append("image", formData.image);
        }

        try {

            const result = await dispatch(
                updateFoodItem({
                    id: data._id,
                    formData: foodItemData
                })
            ).unwrap();

            toast.success(result.message);

            onClose();

        } catch (error) {

            toast.error(error?.message || "Failed to update food item");

        }

    };

    // LOGIC RELATED TO DELETE FOOD ITME ----------------------------------

    const handleDeleteFoodItem = async (id) => {
        try {
            const result = await dispatch(deleteFoodItem(id)).unwrap();

            toast.success(result.message);

            onClose();

        } catch (error) {
            toast.error(error?.message || "Failed to delete food item");
        }
    };

    return {
        formData,
        errors,
        categoryType,
        createFoodItemLoading,
        updateFoodItemLoading,
        deleteFoodItemLoading,
        errorMessage,
        successMessage,
        handleChange,
        handleFoodTypeChange,
        handleCategoryTypeChange,
        handleImageChange,
        handleCreateFoodItem,
        handleUpdateFoodItem,
        handleDeleteFoodItem,

    };
};

export default useAddFoodItem;