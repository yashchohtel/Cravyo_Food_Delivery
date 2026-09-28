import { useState } from "react";


const useCheckoutHook = () => {

    // Add address modal
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);


    // Address form data
    const [addressForm, setAddressForm] = useState({
        latitude: null,
        longitude: null,

        houseNumber: "",
        area: "",
        city: "",
        pincode: ""
    });


    // Open address modal
    const openAddressModal = () => {
        setIsAddressModalOpen(true);
    };


    // Close address modal
    const closeAddressModal = () => {
        setIsAddressModalOpen(false);
    };


    // Handle address inputs
    const handleAddressChange = (e) => {

        const { name, value } = e.target;

        setAddressForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };


    // Handle map location
    const handleMapLocation = (lat, lng) => {

        setAddressForm((prev) => ({
            ...prev,
            latitude: lat,
            longitude: lng
        }));
    };


    // Save address
    const handleSaveAddress = () => {

        console.log("Address Data:", addressForm);

    };


    return {
        // modal
        isAddressModalOpen,
        openAddressModal,
        closeAddressModal,

        // address
        addressForm,
        handleAddressChange,
        handleMapLocation,
        handleSaveAddress
    };
};


export default useCheckoutHook;