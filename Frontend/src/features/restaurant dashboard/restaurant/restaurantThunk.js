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

// Thunk to update restaurant
export const updateShop = createAsyncThunk("restaurant/updateShop", async ({ id, formData }, { rejectWithValue }) => {

    try {

        // Update restaurant API call
        const { data } = await api.put(`/api/shop/updateShop/${id}`, formData);

        // Return success response
        return data;

    } catch (error) {

        return rejectWithValue(
            error.response?.data?.message || "Restaurant update failed"
        );

    }

});

// Update restaurant open/close status
export const updateRestaurantStatus = createAsyncThunk("restaurant/updateRestaurantStatus", async ({ id, isOpen }, { rejectWithValue }) => {

    try {

        // Update restaurant status API call
        const { data } = await api.put(`/api/shop/updateStatus/${id}`, { isOpen });

        // Return success response
        return data;

    } catch (error) {

        return rejectWithValue(
            error.response?.data?.message || "Restaurant status update failed"
        );

    }

});

// Thunk to get nearby restaurants
export const getNearbyRestaurants = createAsyncThunk("restaurant/getNearbyRestaurants", async ({ city, latitude, longitude }, { rejectWithValue }) => {

    try {

        // Get nearby restaurants API call
        const { data } = await api.get(`/api/shop/getNearbyRestaurants?city=${encodeURIComponent(city)}&latitude=${latitude}&longitude=${longitude}`);

        // Return success response
        return data;

    } catch (error) {

        return rejectWithValue(
            error.response?.data?.message || "Failed to fetch nearby restaurants"
        );

    }

});