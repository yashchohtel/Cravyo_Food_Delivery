import { useEffect, useState } from "react";
import { getAddressFromCoordinates } from "../utils/getLocation";
import { useDispatch } from "react-redux";
import { createRestaurant } from "../features/restaurant/restaurantThunk";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../features/auth/authSlice";

const useCreateRestaurant = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    // create restaurant form data
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

    // state to store errors
    const [errors, setErrors] = useState({});

    // Validate field
    const getFieldError = (name, value, data = formData) => {

        const trimmedValue = typeof value === "string" ? value.trim() : value;

        if (name === "image") {
            if (!value) {
                return "Restaurant image is required";
            }

            return "";
        }

        if (name === "latitude" || name === "longitude") {
            if (value === "" || value === null || value === undefined) {
                return "Restaurant location is required";
            }

            if (name === "latitude" && (Number(value) < -90 || Number(value) > 90)) {
                return "Invalid latitude";
            }

            if (name === "longitude" && (Number(value) < -180 || Number(value) > 180)) {
                return "Invalid longitude";
            }

            return "";
        }

        if (!trimmedValue) {
            return "This field is required";
        }

        if (name === "name") {
            if (trimmedValue.length < 2) {
                return "Restaurant name must be at least 2 characters";
            }

            if (trimmedValue.length > 100) {
                return "Restaurant name cannot exceed 100 characters";
            }
        }

        if (name === "description") {
            if (trimmedValue.length < 10) {
                return "Description must be at least 10 characters";
            }

            if (trimmedValue.length > 500) {
                return "Description cannot exceed 500 characters";
            }
        }

        if (name === "openingTime" && data.closingTime && value >= data.closingTime) {
            return "Opening time must be before closing time";
        }

        if (name === "closingTime" && data.openingTime && value <= data.openingTime) {
            return "Closing time must be after opening time";
        }

        if (name === "foodType" && !["pureVeg", "all"].includes(value)) {
            return "Please select a food type";
        }

        if (["street", "city", "state"].includes(name) && trimmedValue.length < 2) {
            return "This field must be at least 2 characters";
        }

        if (name === "pincode" && !/^\d{6}$/.test(trimmedValue)) {
            return "Pincode must be 6 digits";
        }

        return "";
    };

    // Handle form change
    const handleChange = (e) => {

        const { name, value } = e.target;

        const updatedFormData = {
            ...formData,
            [name]: value
        };

        setFormData(updatedFormData);

        const error = getFieldError(name, value, updatedFormData);

        setErrors((prev) => ({
            ...prev,
            [name]: error
        }));

        // Re-check closing time when opening time changes
        if (name === "openingTime" && updatedFormData.closingTime) {
            setErrors((prev) => ({
                ...prev,
                [name]: error,
                closingTime: getFieldError("closingTime", updatedFormData.closingTime, updatedFormData)
            }));
        }

        // Re-check opening time when closing time changes
        if (name === "closingTime" && updatedFormData.openingTime) {
            setErrors((prev) => ({
                ...prev,
                openingTime: getFieldError("openingTime", updatedFormData.openingTime, updatedFormData),
                [name]: error
            }));
        }
    };

    // Handle restaurant image
    const handleImageChange = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        let error = "";

        if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
            error = "Only JPG, PNG and WEBP images are allowed";
        } else if (file.size > 2 * 1024 * 1024) {
            error = "Image size must be less than 2MB";
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

            setErrors((prev) => ({
                ...prev,
                latitude: "",
                longitude: "",
                mapLocation: ""
            }));
        }
    };

    // Validate complete form
    const validateForm = () => {

        const newErrors = {};

        Object.entries(formData).forEach(([name, value]) => {

            if (name === "imagePreview") return;

            const error = getFieldError(name, value, formData);

            if (error) {
                newErrors[name] = error;
            }
        });

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleCreateRestaurant = async (e) => {
        e.preventDefault();

        const isValid = validateForm();

        if (!isValid) return;

        const restaurantData = new FormData();

        restaurantData.append("name", formData.name);
        restaurantData.append("description", formData.description);
        restaurantData.append("openingTime", formData.openingTime);
        restaurantData.append("closingTime", formData.closingTime);
        restaurantData.append("foodType", formData.foodType);
        restaurantData.append("street", formData.street);
        restaurantData.append("city", formData.city);
        restaurantData.append("state", formData.state);
        restaurantData.append("pincode", formData.pincode);
        restaurantData.append("mapLocation", formData.mapLocation);
        restaurantData.append("latitude", formData.latitude);
        restaurantData.append("longitude", formData.longitude);
        restaurantData.append("image", formData.image);

        try {

            const data = await dispatch(createRestaurant(restaurantData)).unwrap();

            dispatch(updateUser(data.user));

            navigate("/restaurant/dashboard");

        } catch (error) {
            console.log(error);
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
        errors,
        handleMapLocation,
        handleImageChange,
        handleChange,
        handleCreateRestaurant
    };
};

export default useCreateRestaurant;