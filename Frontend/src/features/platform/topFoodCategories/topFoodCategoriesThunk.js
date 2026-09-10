import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api/axios";

// Get all food categories
export const getFoodCategories = createAsyncThunk("foodCategory/getFoodCategories", async (_, { rejectWithValue }) => {

    try {

        const { data } = await api.get("/api/platformAction/getAllFoodCategories");

        return data.categories;

    } catch (error) {

        return rejectWithValue(
            error.response?.data?.message || "Something went wrong"
        );

    }

});

// Create food category
export const createFoodCategory = createAsyncThunk("foodCategory/createFoodCategory", async (formData, { rejectWithValue }) => {

    try {

        const { data } = await api.post("/api/platformAction/createFoodCategory", formData);

        return data.categories;

    } catch (error) {

        return rejectWithValue(
            error.response?.data?.message ||
            "Something went wrong"
        );

    }

});

// Update food category
export const updateFoodCategory = createAsyncThunk("foodCategory/updateFoodCategory", async ({ id, formData }, { rejectWithValue }) => {

    try {

        const { data } = await api.put(`/api/platformAction/updateFoodCategory/${id}`, formData);

        return data.category;

    } catch (error) {

        return rejectWithValue(
            error.response?.data?.message ||
            "Something went wrong"
        );

    }

});

// Refresh food categories
export const refreshFoodCategories = createAsyncThunk("foodCategory/refreshFoodCategories", async (_, { rejectWithValue }) => {

    try {

        const { data } = await api.get("/api/platformAction/getAllFoodCategories");

        return data.categories;

    } catch (error) {

        return rejectWithValue(
            error.response?.data?.message ||
            "Something went wrong"
        );

    }

});

// Delete food category
export const deleteFoodCategory = createAsyncThunk("foodCategory/deleteFoodCategory", async (id, { rejectWithValue }) => {

    try {

        const { data } = await api.delete(`/api/platformAction/deleteFoodCategory/${id}`);

        return data;

    } catch (error) {

        return rejectWithValue(
            error.response?.data?.message ||
            "Something went wrong"
        );

    }

});