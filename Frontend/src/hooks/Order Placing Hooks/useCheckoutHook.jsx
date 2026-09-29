import { useCallback, useState } from "react";

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

    // payment method
    const [paymentMethod, setPaymentMethod] = useState("COD");

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
    const handleMapLocation = useCallback((lat, lng) => {

        setAddressForm((prev) => {

            // same location hai to state update mat karo
            if (
                prev.latitude === lat &&
                prev.longitude === lng
            ) {
                return prev;
            }

            return {
                ...prev,
                latitude: lat,
                longitude: lng
            };
        });

    }, []);


    // Save address
    const handleSaveAddress = () => {

        // get saved data from local storage
        let savedAddresses = JSON.parse(localStorage.getItem("userSavedData")) || [];

        // push new address
        savedAddresses.push(addressForm);

        // keep only latest 5 addresses
        if (savedAddresses.length > 5) {
            savedAddresses = savedAddresses.slice(-5);
        }

        // save to local storage
        localStorage.setItem(
            "userSavedData",
            JSON.stringify(savedAddresses)
        );

        // close modal
        closeAddressModal();
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
        handleSaveAddress,

        // payment method
        paymentMethod,
        setPaymentMethod

    };
};


export default useCheckoutHook;