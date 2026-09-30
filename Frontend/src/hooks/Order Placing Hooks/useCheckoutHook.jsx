import { useEffect } from "react";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../features/order/orderThunk";
import { clearCart } from "../../features/cart/cartSlice";

const useCheckoutHook = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // get cart data from 
    const { restaurant, items } = useSelector((state) => state.cart);

    /* STATES ------------------------------------------- */

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

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem("userSavedData")) || [];

        if (savedData.length > 0) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setAddressForm(savedData[savedData.length - 1]);
        }

    }, []);

    // payment method
    const [paymentMethod, setPaymentMethod] = useState("COD");

    /* FUNCTIONS ------------------------------------------- */

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

        // Check all address fields
        if (
            addressForm.latitude === null ||
            addressForm.longitude === null ||
            !addressForm.houseNumber.trim() ||
            !addressForm.area.trim() ||
            !addressForm.city.trim() ||
            !addressForm.pincode.trim()
        ) {
            return;
        }

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

    // place order 
    const placeOrder = async () => {

        // Check restaurant
        if (!restaurant) {
            console.log("Restaurant is missing");
            return;
        }

        // Check cart
        if (!items || items.length === 0) {
            console.log("Cart is empty");
            return;
        }

        // Check address
        if (
            !addressForm ||
            addressForm.latitude === null ||
            addressForm.longitude === null ||
            !addressForm.houseNumber ||
            !addressForm.area ||
            !addressForm.city ||
            !addressForm.pincode
        ) {
            console.log("Please add delivery address");
            return;
        }

        // Check payment method
        if (!paymentMethod) {
            console.log("Please select payment method");
            return;
        }

        const orderData = {

            restaurant: {
                restaurantId: restaurant.id
            },

            items: items.map((item) => ({
                foodId: item.foodId,
                quantity: item.quantity
            })),

            deliveryAddress: {
                latitude: addressForm.latitude,
                longitude: addressForm.longitude,
                houseNumber: addressForm.houseNumber,
                area: addressForm.area,
                city: addressForm.city,
                pincode: addressForm.pincode
            },

            paymentMethod
        };

        const result = await dispatch(createOrder(orderData));

        if (createOrder.fulfilled.match(result)) {
            dispatch(clearCart());
            navigate("/order-success");
        }
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
        setPaymentMethod,

        // place order
        placeOrder
    };

};


export default useCheckoutHook;