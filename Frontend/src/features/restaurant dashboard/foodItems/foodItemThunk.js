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