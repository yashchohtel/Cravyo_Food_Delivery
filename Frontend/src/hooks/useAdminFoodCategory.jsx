import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import {
    createFoodCategory as createFoodCategoryThunk,
    updateFoodCategory as updateFoodCategoryThunk,
    deleteFoodCategory as deleteFoodCategoryThunk,
    getFoodCategories, refreshFoodCategories,
} from "../features/platform/topFoodCategories/topFoodCategoriesThunk";

const useAdminFoodCategory = () => {

    // initilize use dispatch
    const dispatch = useDispatch();

    /* -------------------------------------- */

    // get data from food categories store
    const { categories } = useSelector((state) => state.foodCategories);

    /* STATE AND FUNCTIONS RELATED TO CATEGORY SEARCH & FILTER ----------------------------- */

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

    /* STATE AND FUNCTIONS RELATED TO CREATE CATEGORY -------------------------------------- */

    // State for category form data
    const [categoryForm, setCategoryForm] = useState({
        name: "",
        order: "",
        isActive: true,
        isTopCategory: false,
        image: null,
        imagePreview: null,
    });

    // State for category form errors
    const [categoryErrors, setCategoryErrors] = useState({
        name: "",
        order: "",
        image: "",
    });

    // handle add category form change
    const handleCategoryChange = (e) => {

        const { name, value } = e.target;

        setCategoryForm((prev) => ({
            ...prev,
            [name]: name === "isActive" || name === "isTopCategory" ? value === "true" : value,
        }));

        if (name === "name") {

            if (!value.trim()) {
                setCategoryErrors((prev) => ({
                    ...prev,
                    name: "Category name is required",
                }));
            } else {
                setCategoryErrors((prev) => ({
                    ...prev,
                    name: "",
                }));
            }

        }

    };

    // handle category image change
    const handleCategoryImageChange = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {

            setCategoryErrors((prev) => ({
                ...prev,
                image: "Image size should not exceed 5MB",
            }));

            return;
        }

        setCategoryErrors((prev) => ({
            ...prev,
            image: "",
        }));

        setCategoryForm((prev) => ({
            ...prev,
            image: file,
            imagePreview: URL.createObjectURL(file),
        }));

    };

    // reset add category form
    const resetCategoryForm = () => {

        setCategoryForm({
            name: "",
            order: "",
            isActive: true,
            isTopCategory: false,
            image: null,
            imagePreview: null,
        });

        setCategoryErrors({
            name: "",
            order: "",
            image: "",
        });

    };

    // create category
    const createFoodCategory = async (onClose) => {

        const { name, isActive, isTopCategory, image } = categoryForm;

        const order = categories.length + 1;

        const formData = new FormData();

        formData.append("image", image);

        formData.append("categoriesData", JSON.stringify([

            {
                name: name.trim(),
                order,
                isActive,
                isTopCategory,
            },

        ]));

        try {

            await dispatch(createFoodCategoryThunk(formData)).unwrap();

            toast.success("Category added successfully");

            resetCategoryForm();

            onClose();

        } catch (error) {

            toast.error(error || "Failed to add category");

        }

    };

    /* STATE AND FUNCTIONS RELATED TO EDIT CATEGORY -------------------------------------- */

    const [editCategoryForm, setEditCategoryForm] = useState({
        name: "",
        order: "",
        isActive: true,
        isTopCategory: false,
        image: null,
        imagePreview: null,
    });

    const [editCategoryErrors, setEditCategoryErrors] = useState({
        name: "",
        order: "",
        image: "",
    });

    // initialize edit category form
    const initEditCategoryForm = (category) => {

        setEditCategoryForm({
            name: category?.name || "",
            order: category?.order ?? "",
            isActive: category?.isActive ?? true,
            isTopCategory: category?.isTopCategory ?? false,
            image: null,
            imagePreview: category?.image || null,
        });

        setEditCategoryErrors({
            name: "",
            order: "",
            image: "",
        });

    };

    // handle edit category change
    const handleEditCategoryChange = (e) => {

        const { name, value } = e.target;

        setEditCategoryForm((prev) => ({
            ...prev,
            [name]: name === "isActive" || name === "isTopCategory" ? value === "true" : value,
        }));

        if (name === "name") {

            if (!value.trim()) {
                setEditCategoryErrors((prev) => ({
                    ...prev,
                    name: "Category name is required",
                }));
            } else {
                setEditCategoryErrors((prev) => ({
                    ...prev,
                    name: "",
                }));
            }

        }

    };

    // handle edit category image change
    const handleEditCategoryImageChange = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {

            setEditCategoryErrors((prev) => ({
                ...prev,
                image: "Image size should not exceed 5MB",
            }));

            return;
        }

        setEditCategoryErrors((prev) => ({
            ...prev,
            image: "",
        }));

        setEditCategoryForm((prev) => ({
            ...prev,
            image: file,
            imagePreview: URL.createObjectURL(file),
        }));

    };

    // update category
    const updateFoodCategory = async (categoryId, onClose) => {

        const { name, order, isActive, isTopCategory, image } = editCategoryForm;

        const formData = new FormData();

        if (image) {
            formData.append("image", image);
        }

        formData.append("name", name.trim());
        formData.append("order", Number(order));
        formData.append("isActive", isActive);
        formData.append("isTopCategory", isTopCategory);

        try {

            await dispatch(updateFoodCategoryThunk({ id: categoryId, formData })).unwrap();

            toast.success("Category updated successfully");

            dispatch(refreshFoodCategories());

            onClose();

        } catch (error) {

            toast.error(error || "Failed to update category");

        }

    };

    /* STATE AND FUNCTIONS RELATED TO DELETE CATEGORY -------------------------------------- */

    // delete category
    const deleteFoodCategory = async (categoryId, onClose) => {

        try {

            await dispatch(deleteFoodCategoryThunk(categoryId)).unwrap();

            toast.success("Category deleted successfully");

            dispatch(refreshFoodCategories());

            onClose();

        } catch (error) {

            toast.error(error || "Failed to delete category");

        }

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
        refreshCategories,

        // create category
        categoryForm,
        categoryErrors,
        handleCategoryChange,
        handleCategoryImageChange,
        resetCategoryForm,
        createFoodCategory,

        // edit category
        editCategoryForm,
        editCategoryErrors,
        initEditCategoryForm,
        handleEditCategoryChange,
        handleEditCategoryImageChange,
        updateFoodCategory,

        // delete category
        deleteFoodCategory,

    };

}

export default useAdminFoodCategory;