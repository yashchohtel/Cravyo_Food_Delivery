import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api/axios.js";

// Thunk to create a new restaurant
export const createRestaurant = createAsyncThunk("restaurant/createRestaurant", async (formData, { rejectWithValue }) => {

    try {

        // Create restaurant API call
        const { data } = await api.post("/api/shop/createShop", formData);

        // Return success response
        return data;

    } catch (error) {

        return rejectWithValue(
            error.response?.data?.message || "Something went wrong"
        );

    }

});

// Thunk to get current user's restaurant
export const getMyRestaurant = createAsyncThunk("restaurant/getMyRestaurant", async (_, { rejectWithValue }) => {

    try {

        // Get restaurant API call
        const { data } = await api.get("/api/shop/getMyShop");

        // Return success response
        return data;

    } catch (error) {

        return rejectWithValue(
            error.response?.data?.message || "Something went wrong"
        );

    }

});

