import { useMemo, useState } from "react";

const useRestaurantDetailHook = (restaurant) => {

    // state to store searched result
    const [search, setSearch] = useState("");

    // state to store food type
    const [foodType, setFoodType] = useState("all");

    // state to store price sorting
    const [priceSort, setPriceSort] = useState(null);

    // filtering and sorting food
    const filteredFoodItems = useMemo(() => {

        if (!restaurant?.foodItems) return [];

        let foods = [...restaurant.foodItems];

        // Search
        if (search.trim()) {
            foods = foods.filter((food) =>
                food.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Veg / Non-Veg
        if (foodType === "veg") {
            foods = foods.filter((food) => food.isVeg);
        }

        if (foodType === "nonVeg") {
            foods = foods.filter((food) => !food.isVeg);
        }

        // Price sorting
        if (priceSort === "lowToHigh") {
            foods.sort((a, b) => a.price - b.price);
        }

        if (priceSort === "highToLow") {
            foods.sort((a, b) => b.price - a.price);
        }

        return foods;

    }, [restaurant, search, foodType, priceSort]);


    // return state and functions
    return {
        search,
        setSearch,

        foodType,
        setFoodType,

        priceSort,
        setPriceSort,

        filteredFoodItems
    };
};

export default useRestaurantDetailHook;