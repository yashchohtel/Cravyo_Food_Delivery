import { useState } from "react";
import {
    IoClose,
    IoAdd,
    IoRemove
} from "react-icons/io5";

import "./AddToCartBottomSheet.css";


const AddToCartBottomSheet = ({ food, onClose }) => {

    // sta t troe 
    const [quantity, setQuantity] = useState(1);

    // increase quantity
    const increaseQuantity = () => {
        setQuantity((prev) => prev + 1);
    };

    // decrease quantity
    const decreaseQuantity = () => {
        setQuantity((prev) => Math.max(1, prev - 1));
    };

    const totalPrice = food.price * quantity;

    return (

        <div
            className="addToCartOverlay"
            onClick={onClose}
        >

            <div
                className={`addToCartBottomSheet ${food.isVeg ? "addToCartVeg" : "addToCartNonVeg"}`}
                onClick={(e) => e.stopPropagation()}
            >

                {/* close button */}
                <button
                    className="addToCartCloseButton"
                    onClick={onClose}
                >
                    <IoClose />
                </button>


                {/* food image */}
                <div className="addToCartImageWrapper">

                    <img
                        src={food.image}
                        alt={food.name}
                        className="addToCartFoodImage"
                    />

                </div>

                {/* food information */}
                <div className="addToCartFoodInfo">

                    {/* food type */}
                    <div className="addToCartFoodName">

                        <span
                            className={`addToCartFoodType ${food.isVeg
                                    ? "addToCartVegIcon"
                                    : "addToCartNonVegIcon"
                                }`}
                        >
                            {food.isVeg ? "●" : "▲"}
                        </span>

                        <h2>{food.name}</h2>

                    </div>

                    {/* price */}
                    <p className="addToCartFoodPrice">
                        ₹{food.price}
                    </p>

                    {/* rating */}
                    {food.rating > 0 && (
                        <p className="addToCartFoodRating">
                            ★ {food.rating} ({food.totalReviews})
                        </p>
                    )}

                    {/* description */}
                    <p className="addToCartFoodDescription">
                        {food.description}
                    </p>

                </div>

                {/* quantity */}
                <div className="addToCartQuantity">

                    <button
                        onClick={decreaseQuantity}
                        disabled={quantity === 1}
                    >
                        <IoRemove />
                    </button>

                    <span>
                        {quantity}
                    </span>

                    <button onClick={increaseQuantity}>
                        <IoAdd />
                    </button>

                </div>

                {/* add button */}
                <button className="addToCartButton">
                    Add to Cart&nbsp; | &nbsp;₹{totalPrice}
                </button>

            </div>

        </div>
    );
};


export default AddToCartBottomSheet;