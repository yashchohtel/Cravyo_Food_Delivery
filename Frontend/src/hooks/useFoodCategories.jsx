import { useRef, useState } from "react";
import { useSelector } from "react-redux";

const useFoodCategories = () => {

    // get data from the redux store =
    const { categories } = useSelector((state) => state.foodCategories);

    // creating top category to show on home slider
    const topCategories = [
        {
            id: "all",
            name: "All",
            image: "/all.png",
        },
        ...categories
            .filter((category) => category.isTopCategory && category.isActive)
            .map((category) => ({
                id: category._id,
                name: category.name,
                image: category.image,
            })),
    ];

    // all categories 
    const allCategories = categories
        .filter((category) => category.isActive)
        .map((category) => ({
            id: category._id,
            name: category.name,
            image: category.image,
        }));

    /* -------------------------------------- */

    // state to store see all categories 
    const [showAllCategories, setShowAllCategories] = useState(false);

    // state to store user clicked category item
    const [selectedCategory, setSelectedCategory] = useState("all");

    // state to store the category which is other then the visible item
    const [hiddenCategoryItem, setHiddenCategoryItem] = useState(null);

    // reference of swiper
    const swiperRef = useRef(null);

    // function to get the click category element
    const handleCategoryClick = (categoryId) => {

        // set selected category item id to make item active
        setSelectedCategory(categoryId);

        // get selected item object
        const selectedItem = allCategories.find(category => category.id === categoryId);

        // find if its visible item or hidden item
        const isVisible = topCategories.some((category) => category.id === categoryId);

        // if hidden item set it in hidden item category
        setHiddenCategoryItem(isVisible ? null : selectedItem);

        // move swiper to selected category
        if (isVisible && swiperRef.current) {
            const index = topCategories.findIndex((category) => category.id === categoryId);
            swiperRef.current.slideTo(index);
        }

    };

    // return all required things
    return {
        topCategories,
        allCategories,
        showAllCategories,      // show/hide all categories
        setShowAllCategories,   // update show/hide all categories state
        selectedCategory,       // selected category id
        hiddenCategoryItem,     // selected hidden category
        swiperRef,              // Swiper reference
        handleCategoryClick     // handle category selection
    };
};

export default useFoodCategories;