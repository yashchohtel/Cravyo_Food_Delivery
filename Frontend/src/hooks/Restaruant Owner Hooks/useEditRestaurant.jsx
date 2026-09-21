/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateRestaurantStatus, updateShop } from "../../features/restaurant dashboard/restaurant/restaurantThunk";
import { getAddressFromCoordinates } from "../../utils/getLocation";
import toast from "react-hot-toast";

const useEditRestaurant = ({ data, onClose }) => {

    const dispatch = useDispatch();

    const { restaurant, restaurantEditLoading, restaurantStatusLoading } = useSelector(
        (state) => state.restaurant
    );

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
    });

    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [errors, setErrors] = useState({});

    // Load restaurant data
    useEffect(() => {

        if (!data) return;

        setFormData({
            name: data.name || "",
            description: data.description || "",
            openingTime: data.openingTime || "",
            closingTime: data.closingTime || "",
            foodType: data.foodType || "",
            street: data.address?.street || "",
            city: data.address?.city || "",
            state: data.address?.state || "",
            pincode: data.address?.pincode || "",
            mapLocation: data.address?.mapLocation || "",
            latitude: data.address?.latitude || "",
            longitude: data.address?.longitude || "",
        });

        setImagePreview(data.image || "");

    }, [data]);

    // Handle input change
    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    // Handle image
    const handleImageChange = (e) => {

        const file = e.target.files?.[0];

        if (!file) return;

        setImage(file);
        setImagePreview(URL.createObjectURL(file));

        setErrors((prev) => ({
            ...prev,
            image: "",
        }));
    };

    // Handle map location
    const handleMapLocation = async (lat, lng) => {

        setFormData((prev) => ({
            ...prev,
            latitude: lat,
            longitude: lng,
        }));

        try {

            const address = await getAddressFromCoordinates(lat, lng);

            setFormData((prev) => ({
                ...prev,
                latitude: lat,
                longitude: lng,
                mapLocation: address || prev.mapLocation,
            }));

        } catch (error) {
            console.error("Failed to get address:", error);
        }
    };

    // Validate form
    const validateForm = () => {

        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Restaurant name is required";
        }

        if (!formData.description.trim()) {
            newErrors.description = "Description is required";
        }

        if (!formData.openingTime) {
            newErrors.openingTime = "Opening time is required";
        }

        if (!formData.closingTime) {
            newErrors.closingTime = "Closing time is required";
        }

        if (!formData.foodType) {
            newErrors.foodType = "Food type is required";
        }

        if (!formData.street.trim()) {
            newErrors.street = "Street / Area is required";
        }

        if (!formData.city.trim()) {
            newErrors.city = "City is required";
        }

        if (!formData.state.trim()) {
            newErrors.state = "State is required";
        }

        if (!formData.pincode.trim()) {
            newErrors.pincode = "Pincode is required";
        }

        if (!formData.mapLocation.trim()) {
            newErrors.mapLocation = "Please select a location";
        }

        if (!formData.latitude || !formData.longitude) {
            newErrors.mapLocation = "Please select a location on map";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // Submit form
    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const form = new FormData();

        form.append("name", formData.name);
        form.append("description", formData.description);
        form.append("openingTime", formData.openingTime);
        form.append("closingTime", formData.closingTime);
        form.append("foodType", formData.foodType);

        form.append("street", formData.street);
        form.append("city", formData.city);
        form.append("state", formData.state);
        form.append("pincode", formData.pincode);
        form.append("mapLocation", formData.mapLocation);
        form.append("latitude", formData.latitude);
        form.append("longitude", formData.longitude);

        // Image is optional during edit
        if (image) {
            form.append("image", image);
        }

        const result = await dispatch(updateShop({
            id: data._id,
            formData: form,
        }));

        if (updateShop.fulfilled.match(result)) {
            onClose();
        }

    };

    const handleRestaurantStatus = async () => {

        const result = await dispatch(
            updateRestaurantStatus({ id: restaurant._id, isOpen: !restaurant.isOpen })
        );

        if (updateRestaurantStatus.fulfilled.match(result)) {
            toast.success(restaurant.isOpen ? "Restaurant closed successfully" : "Restaurant opened successfully");
        } else {
            toast.error(result.payload || "Failed to update restaurant status");
        }
    };

    return {
        formData,
        imagePreview,
        errors,
        restaurantEditLoading,
        handleChange,
        handleImageChange,
        handleMapLocation,
        handleSubmit,
        restaurantStatusLoading,
        handleRestaurantStatus
    };
};

export default useEditRestaurant;