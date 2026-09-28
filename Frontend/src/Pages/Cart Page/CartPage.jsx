import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
    IoArrowBack,
    IoChevronForward,
    IoTrashOutline,
    IoAdd,
    IoRemove,
    IoLocationOutline,
    IoTimeOutline
} from "react-icons/io5";

import "./CartPage.css";
import { clearCart, decreaseQuantity, increaseQuantity, removeFromCart } from "../../features/cart/cartSlice";


const CartPage = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const {
        restaurant,
        items,
        totalItems,
        totalPrice
    } = useSelector((state) => state.cart);


    // empty cart
    if (!items || items.length === 0) {

        return (
            <div className="cartPage">

                <div className="cartPage__container">

                    <div className="cartPage__header">

                        <button
                            className="cartPage__backButton"
                            onClick={() => navigate(-1)}
                        >
                            <IoArrowBack />
                        </button>

                        <div>
                            <h1>Your Cart</h1>
                        </div>

                    </div>


                    <div className="cartPage__empty">

                        <div className="cartPage__emptyIcon">
                            🛒
                        </div>

                        <h2>
                            Your cart is empty
                        </h2>

                        <p>
                            Looks like you haven't added
                            any food items yet.
                        </p>

                        <button
                            className="cartPage__exploreButton"
                            onClick={() => navigate("/")}
                        >
                            Explore Restaurants
                            <IoChevronForward />
                        </button>

                    </div>

                </div>

            </div>
        );
    }


    return (
        <div className="cartPage">

            <div className="cartPage__container">

                {/* Header */}
                <div className="cartPage__header">

                    <button
                        className="cartPage__backButton"
                        onClick={() => navigate(-1)}
                    >
                        <IoArrowBack />
                    </button>

                    <div className="cartPage__headerInfo">

                        <h1>
                            Your Cart
                        </h1>

                        <span>
                            {totalItems} {totalItems === 1 ? "item" : "items"}
                        </span>

                    </div>

                    <button
                        className="cartPage__clearButton"
                        onClick={() => dispatch(clearCart())}
                    >
                        Clear All
                    </button>

                </div>


                {/* Restaurant */}
                <div className="cartPage__restaurant">

                    <div className="cartPage__restaurantImageWrapper">

                        <img
                            src={restaurant?.image}
                            alt={restaurant?.name}
                        />

                    </div>


                    <div className="cartPage__restaurantInfo">

                        <h2>
                            {restaurant?.name}
                        </h2>

                        <div className="cartPage__restaurantLocation">

                            <IoLocationOutline />

                            <span>
                                {restaurant?.address?.city},{" "}
                                {restaurant?.address?.state}
                            </span>

                        </div>

                        <div className="cartPage__restaurantTime">

                            <IoTimeOutline />

                            <span>
                                {restaurant?.deliveryTime}
                            </span>

                        </div>

                    </div>


                    <IoChevronForward className="cartPage__restaurantArrow" />

                </div>


                {/* Items heading */}
                <div className="cartPage__itemsHeader">

                    <h2>
                        Your Items
                    </h2>

                    <span>
                        {totalItems}
                    </span>

                </div>


                {/* Food items */}
                <div className="cartPage__items">

                    {items.map((item) => (

                        <div
                            className="cartPage__item"
                            key={item.foodId}
                        >

                            <img
                                className="cartPage__foodImage"
                                src={item.image}
                                alt={item.name}
                            />

                            <div className="cartPage__foodContent">

                                <div
                                    className={`cartPage__foodType ${item.isVeg
                                        ? "cartPage__foodType--veg"
                                        : "cartPage__foodType--nonVeg"
                                        }`}
                                >

                                    <span>
                                        {item.isVeg ? "●" : "▲"}
                                    </span>

                                    {item.isVeg ? "Veg" : "Non-Veg"}

                                </div>


                                <h3>
                                    {item.name}
                                </h3>


                                <strong>
                                    ₹{item.price}
                                </strong>

                            </div>

                            <button
                                className="cartPage__deleteButton"
                                onClick={() => dispatch(removeFromCart(item.foodId))}
                            >
                                <IoTrashOutline />
                            </button>

                            <div className="cartPage__quantity">

                                <button
                                    onClick={() =>
                                        dispatch(decreaseQuantity(item.foodId))
                                    }
                                >
                                    <IoRemove />
                                </button>

                                <span>
                                    {item.quantity}
                                </span>

                                <button
                                    onClick={() =>
                                        dispatch(increaseQuantity(item.foodId))
                                    }
                                >
                                    <IoAdd />
                                </button>

                            </div>

                        </div>

                    ))}

                </div>


                {/* Add more */}
                <button
                    className="cartPage__addMore"
                    onClick={() => navigate(-1)}
                >

                    <span className="cartPage__addMoreIcon">
                        <IoAdd />
                    </span>

                    <div>

                        <strong>
                            Add more items
                        </strong>

                        <small>
                            Browse menu from this restaurant
                        </small>

                    </div>

                    <IoChevronForward />

                </button>

            </div>

            {/* Checkout */}
            <div className="cartPage__checkout">

                <div className="cartPage__checkoutInner">

                    <div className="cartPage__total">

                        <span>
                            Total
                        </span>

                        <strong>
                            ₹{totalPrice}
                        </strong>

                    </div>

                    <button
                        className="cartPage__checkoutButton"
                        onClick={() => navigate("/checkout")}
                    >
                        Proceed to Checkout

                        <IoChevronForward />
                    </button>

                </div>

            </div>

        </div>
    );
};

export default CartPage;