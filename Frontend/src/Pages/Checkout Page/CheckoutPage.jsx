/* eslint-disable react-hooks/set-state-in-effect */
import {
    IoAdd,
    IoArrowBack,
    IoCardOutline,
    IoCashOutline,
    IoCheckmark,
    IoChevronForward,
    IoLocationOutline,
    IoTimeOutline,
} from 'react-icons/io5';

import './CheckoutPage.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import useCheckoutHook from '../../hooks/Order Placing Hooks/useCheckoutHook';
import AddAddressModal from '../Add Adress Page/AddAddressModal';
import ButtonLoader from '../../Components/Loaders/ButtonLoader/ButtonLoader';

const CheckoutPage = () => {

    const navigate = useNavigate();

    // cart data
    const { restaurant, items, totalItems, totalPrice } = useSelector((state) => state.cart);

    // order data
    const { loading: orderLoading } = useSelector((state) => state.order);

    // saved addresses
    const [savedAddresses, setSavedAddresses] = useState([]);

    // checkout hook
    const {
        isAddressModalOpen,
        openAddressModal,
        closeAddressModal,

        addressForm,
        handleAddressChange,
        handleMapLocation,
        handleSaveAddress,

        paymentMethod,
        setPaymentMethod,

        placeOrder

    } = useCheckoutHook();

    const deliveryFee = totalPrice >= 150 ? 0 : 30;
    const taxes = Math.round(totalPrice * 0.05);
    const grandTotal = totalPrice + deliveryFee + taxes;

    // get saved addresses
    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem("userSavedData")) || [];
        setSavedAddresses(savedData);
    }, [isAddressModalOpen]);

    // navigate to cart if no item in cart
    useEffect(() => {
        if (!items || items.length === 0) {
            navigate("/cart", { replace: true });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate]);

    // selected address
    const selectedAddress = savedAddresses[savedAddresses.length - 1];

    return (

        <>

            {/* Add Address Modal */}
            <AddAddressModal
                isAddressModalOpen={isAddressModalOpen}
                closeAddressModal={closeAddressModal}
                addressForm={addressForm}
                handleAddressChange={handleAddressChange}
                handleMapLocation={handleMapLocation}
                handleSaveAddress={handleSaveAddress}
            />


            <div className="checkoutPage container">

                {/* ================= HEADER ================= */}

                <div className="checkoutPage__header">

                    <button
                        className="checkoutPage__backButton"
                        onClick={() => navigate(-1)}
                    >
                        <IoArrowBack />
                    </button>

                    <h1>
                        Checkout
                    </h1>

                </div>


                {/* ================= DELIVERY ADDRESS ================= */}

                <section className="checkoutPage__section">

                    <div className="checkoutPage__sectionHeader">

                        <h2>
                            Delivery Address
                        </h2>

                        {selectedAddress && (
                            <button
                                className="checkoutPage__editButton"
                                onClick={openAddressModal}
                            >
                                Edit
                            </button>
                        )}

                    </div>

                    {selectedAddress ? (

                        <div
                            className="checkoutPage__savedAddressCard"
                            onClick={openAddressModal}
                        >

                            <div className="checkoutPage__savedAddressIcon">
                                <IoLocationOutline />
                            </div>


                            <div className="checkoutPage__savedAddressContent">

                                <h3>
                                    Home
                                </h3>

                                <p>
                                    {selectedAddress.houseNumber},{" "}
                                    {selectedAddress.area}
                                </p>

                                <span>
                                    {selectedAddress.city},{" "}
                                    {selectedAddress.pincode}
                                </span>

                            </div>

                            <IoChevronForward
                                className="checkoutPage__savedAddressArrow"
                            />

                        </div>

                    ) : (

                        <div
                            className="checkoutPage__addAddressCard"
                            onClick={openAddressModal}
                        >

                            <div className="checkoutPage__addAddressIcon">
                                <IoAdd />
                            </div>

                            <div className="checkoutPage__addAddressContent">

                                <h3>
                                    Add Address
                                </h3>

                                <p>
                                    Select on map or enter manually
                                </p>

                            </div>

                            <IoChevronForward
                                className="checkoutPage__addAddressArrow"
                            />

                        </div>

                    )}

                </section>


                {/* ================= RESTAURANT ================= */}

                {restaurant && (

                    <section className="checkoutPage__restaurantCard">

                        <img
                            src={restaurant.image}
                            alt={restaurant.name}
                        />

                        <div className="checkoutPage__restaurantInfo">

                            <h3>
                                {restaurant.name}
                            </h3>

                            <p>
                                {restaurant.address?.city},{" "}
                                {restaurant.address?.state}
                            </p>

                            <span>
                                <IoTimeOutline />
                                {restaurant.deliveryTime || "30-40 min"}
                            </span>

                        </div>

                    </section>

                )}

                {/* ================= PAYMENT METHOD ================= */}

                <section className="checkoutPage__paymentSection">

                    <h2>
                        Payment Method
                    </h2>

                    <div className="checkoutPage__paymentOptions">

                        {/* COD */}
                        <button
                            type="button"
                            className={`checkoutPage__paymentOption ${paymentMethod === "COD"
                                ? "checkoutPage__paymentOption--active"
                                : ""
                                }`}
                            onClick={() => setPaymentMethod("COD")}
                        >

                            <div className="checkoutPage__paymentIcon">
                                <IoCashOutline />
                            </div>

                            <div className="checkoutPage__paymentContent">

                                <strong>
                                    Cash on Delivery
                                </strong>

                                <span>
                                    Pay when delivered
                                </span>

                            </div>

                            <div className="checkoutPage__paymentCheck">
                                {paymentMethod === "COD" && <IoCheckmark />}
                            </div>

                        </button>


                        {/* ONLINE */}
                        <button
                            type="button"
                            className={`checkoutPage__paymentOption ${paymentMethod === "ONLINE"
                                ? "checkoutPage__paymentOption--active"
                                : ""
                                }`}
                            onClick={() => setPaymentMethod("ONLINE")}
                        >

                            <div className="checkoutPage__paymentIcon">
                                <IoCardOutline />
                            </div>

                            <div className="checkoutPage__paymentContent">

                                <strong>
                                    Online Payment
                                </strong>

                                <span>
                                    UPI, Card & more
                                </span>

                            </div>

                            <div className="checkoutPage__paymentCheck">
                                {paymentMethod === "ONLINE" && <IoCheckmark />}
                            </div>

                        </button>

                    </div>

                </section>

                {/* ================= YOUR ORDER ================= */}

                <section className="checkoutPage__section">

                    <div className="checkoutPage__sectionHeader">

                        <h2>
                            Your Order
                        </h2>

                        <span className="checkoutPage__itemCount">
                            {totalItems} items
                        </span>

                    </div>


                    <div className="checkoutPage__items">

                        {items?.map((item) => (

                            <div
                                className="checkoutPage__foodItem"
                                key={item.foodId}
                            >

                                <img
                                    src={item.image}
                                    alt={item.name}
                                />


                                <div className="checkoutPage__foodInfo">

                                    <div className="checkoutPage__foodNameRow">

                                        <span
                                            className={
                                                item.isVeg
                                                    ? "checkoutPage__vegIcon"
                                                    : "checkoutPage__nonVegIcon"
                                            }
                                        />

                                        <h3>
                                            {item.name}
                                        </h3>

                                    </div>

                                    <p>
                                        ₹{item.price}
                                    </p>

                                </div>


                                <div className="checkoutPage__foodQuantity">

                                    <span>
                                        × {item.quantity}
                                    </span>

                                    <strong>
                                        ₹{item.price * item.quantity}
                                    </strong>

                                </div>

                            </div>

                        ))}

                    </div>

                </section>


                {/* ================= BILL DETAILS ================= */}

                <section className="checkoutPage__billSection">

                    <h2>
                        Bill Details
                    </h2>

                    <div className="checkoutPage__billCard">

                        <div className="checkoutPage__billRow">

                            <span>
                                Item total
                            </span>

                            <strong>
                                ₹{totalPrice}
                            </strong>

                        </div>


                        <div className="checkoutPage__billRow">

                            <span>
                                Delivery fee
                            </span>

                            <strong className={deliveryFee === 0 ? "checkoutPage__freeText" : ""}>
                                {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                            </strong>

                        </div>

                        {deliveryFee === 0 && (
                            <p className="checkoutPage__deliveryNote">
                                🎉 Free delivery on orders above ₹150
                            </p>
                        )}


                        <div className="checkoutPage__billRow">

                            <span>
                                Taxes & charges
                            </span>

                            <strong>
                                ₹{taxes}
                            </strong>

                        </div>

                        <p className="checkoutPage__taxNote">
                            Includes 5% taxes & platform charges
                        </p>


                        <div className="checkoutPage__billDivider" />


                        <div className="checkoutPage__billTotal">

                            <span>
                                To Pay
                            </span>

                            <strong>
                                ₹{grandTotal}
                            </strong>

                        </div>

                    </div>

                </section>

                {/* ================= BOTTOM BAR ================= */}

                <div className="checkoutPage__bottomBar">

                    <div className="checkoutPage__bottomTotal">

                        <span>
                            Total
                        </span>

                        <strong>
                            ₹{grandTotal}
                        </strong>

                    </div>

                    <button
                        className="checkoutPage__placeOrderButton"
                        onClick={placeOrder}
                        disabled={orderLoading}
                    >
                        {orderLoading ? (
                            <ButtonLoader />
                        ) : (
                            <>
                                {paymentMethod === "COD"
                                    ? "Place Order"
                                    : "Pay & Place Order"
                                }
                                <IoChevronForward />
                            </>
                        )}
                    </button>

                </div>

            </div>

        </>

    );

};

export default CheckoutPage;