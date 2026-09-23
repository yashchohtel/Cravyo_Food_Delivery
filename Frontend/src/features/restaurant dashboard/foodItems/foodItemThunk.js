import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api/axios.js";

// Create food item
export const createFoodItem = createAsyncThunk("foodItem/createFoodItem", async (formData, { rejectWithValue }) => {

    try {

        const { data } = await api.post("/api/foodItem/createFoodItem", formData);

        return data;

    } catch (error) {

        return rejectWithValue(error.response?.data?.message || "Food item creation failed");
    }

});

// Get all food items
export const getAllFoodItems = createAsyncThunk("foodItem/getAllFoodItems", async (_, { rejectWithValue }) => {

    try {

        const { data } = await api.get("/api/foodItem/getAllFoodItems");

        return data;

    } catch (error) {

        return rejectWithValue(
            error.response?.data?.message ||
            "Food items fetch failed"
        );
    }
});

// update food item
export const updateFoodItem = createAsyncThunk("foodItem/updateFoodItem", async ({ id, formData }, { rejectWithValue }) => {

    try {

        const { data } = await api.put(`/api/foodItem/updateFoodItem/${id}`, formData);

        return data;

    } catch (error) {

        return rejectWithValue(
            error.response?.data?.message ||
            "Food item update failed"
        );
    }

});

// delete food item
export const deleteFoodItem = createAsyncThunk("foodItem/deleteFoodItem", async (id , { rejectWithValue }) => {

    try {

        const { data } = await api.delete(`/api/foodItem/deleteFoodItem/${id}`)

        return data;

    } catch (error) {

        return rejectWithValue(
            error.response?.data?.message ||
            "Failed to delete food itme"
        );
    }

});