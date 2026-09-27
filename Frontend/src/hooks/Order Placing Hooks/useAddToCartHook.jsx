import { useState } from "react";

const useAddToCartHook = () => {

    // selected food for add to cart
    const [selectedFood, setSelectedFood] = useState(null);

    // bottom sheet open / close state
    const [isAddToCartOpen, setIsAddToCartOpen] = useState(false);

    // open add to cart bottom sheet
    const openAddToCart = (food) => {
        setSelectedFood(food);
        setIsAddToCartOpen(true);
    };

    // close add to cart bottom sheet
    const closeAddToCart = () => {
        setIsAddToCartOpen(false);
        setSelectedFood(null);
    };

    // 

    return {
        selectedFood,
        isAddToCartOpen,
        openAddToCart,
        closeAddToCart
    };
};

export default useAddToCartHook;