import { useDispatch, useSelector } from "react-redux";
import { getFoodCategories } from "../features/platform/topFoodCategories/topFoodCategoriesThunk";
import { useState } from "react";

const useAdminFoodCategory = () => {

    // initilize use dispatch
    const dispatch = useDispatch();

    /* -------------------------------------- */

    // get data from food categories store
    const { categories } = useSelector((state) => state.foodCategories);

    /* STATE AND FUNCTIONS RELATED TO BANNER SEARCH & FILTER ----------------------------- */

    // Search state
    const [search, setSearch] = useState("");

    // Status filter state
    const [status, setStatus] = useState("all");

    // Category type filter state
    const [categoryType, setCategoryType] = useState("all");

    // Sort state
    const [sort, setSort] = useState("order");

    // Filter categories based on search, status, and category type
    const filteredCategories = categories.filter((category) => {

        // Search condition
        const matchesSearch = category.name.toLowerCase().includes(search.toLowerCase());

        // Status condition
        const matchesStatus = status === "all" || (status === "active" && category.isActive) || (status === "inactive" && !category.isActive);

        // Category type condition
        const matchesCategoryType = categoryType === "all" || (categoryType === "top" && category.isTopCategory) || (categoryType === "normal" && !category.isTopCategory);

        return (matchesSearch && matchesStatus && matchesCategoryType);

    });

    // Sort categories based on selected sort option
    const sortedCategories = [...filteredCategories].sort((a, b) => {

        if (sort === "latest") {
            return new Date(b.createdAt) - new Date(a.createdAt);
        }

        if (sort === "oldest") {
            return new Date(a.createdAt) - new Date(b.createdAt);
        }

        if (sort === "order") {
            return a.order - b.order;
        }

        return 0;

    });

    // Reset search, filters, and sort to default values
    const resetSearchFilterSort = () => {

        setSearch("");
        setStatus("all");
        setCategoryType("all");
        setSort("order");

    };

    // Refresh banners from server (used after update/create/delete to sync with backend)
    const refreshCategories = () => {
        dispatch(getFoodCategories());
    };


    return {

        // Search
        search,
        setSearch,

        // Status filter
        status,
        setStatus,

        // Category type filter
        categoryType,
        setCategoryType,

        // Sort
        sort,
        setSort,

        // Filtered & sorted categories
        sortedCategories,

        // Reset
        resetSearchFilterSort,

        // Refresh
        refreshCategories

    };


}

export default useAdminFoodCategory;