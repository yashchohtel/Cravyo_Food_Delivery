import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, addToCart } from "../../features/cart/cartSlice";

const useAddToCartHook = (restaurant) => {

    const dispatch = useDispatch();

    // getting cart data
    const { restaurant: cartRestaurant } = useSelector((state) => state.cart);

    // selected food for add to cart
    const [selectedFood, setSelectedFood] = useState(null);

    // bottom sheet open / close
    const [isAddToCartOpen, setIsAddToCartOpen] = useState(false);

    // different restaurant alert
    const [showRestaurantAlert, setShowRestaurantAlert] = useState(false);

    // open bottom sheet
    const openAddToCart = (food) => {
        setSelectedFood(food);
        setShowRestaurantAlert(false);
        setIsAddToCartOpen(true);
    };

    // actual add to cart
    const handleAddToCart = (quantity) => {

        if (!selectedFood) return;

        // different restaurant
        if (cartRestaurant?.id && cartRestaurant.id !== restaurant._id) {
            setShowRestaurantAlert(true);
            return;
        }

        // add food to cart
        dispatch(
            addToCart({

                foodId: selectedFood._id,

                name: selectedFood.name,
                image: selectedFood.image,
                price: selectedFood.price,

                quantity: quantity,

                isVeg: selectedFood.isVeg,

                restaurant: {
                    id: restaurant._id,
                    name: restaurant.name,
                    image: restaurant.image,
                    address: restaurant.address,
                    distance: restaurant.distance,
                    deliveryTime: restaurant.deliveryTime
                }

            })
        );

        // close bottom sheet
        setIsAddToCartOpen(false);
        setSelectedFood(null);
    };

    // clear old cart and add new food
    const clearCartAndAdd = (quantity) => {

        dispatch(clearCart());

        dispatch(
            addToCart({

                foodId: selectedFood._id,

                name: selectedFood.name,
                image: selectedFood.image,
                price: selectedFood.price,

                quantity: quantity,

                isVeg: selectedFood.isVeg,

                restaurant: {
                    id: restaurant._id,
                    name: restaurant.name,
                    image: restaurant.image,
                    address: restaurant.address,
                    distance: restaurant.distance,
                    deliveryTime: restaurant.deliveryTime
                }

            })
        );

        // close bottom sheet
        setIsAddToCartOpen(false);
        setSelectedFood(null);
        setShowRestaurantAlert(false);
    };

    // close bottom sheet
    const closeAddToCart = () => {
        setIsAddToCartOpen(false);
        setSelectedFood(null);
        setShowRestaurantAlert(false);
    };


    return {
        selectedFood,
        isAddToCartOpen,

        showRestaurantAlert,

        openAddToCart,
        handleAddToCart,
        clearCartAndAdd,
        closeAddToCart
    };
};


export default useAddToCartHook;