import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// Thunk to create a new order
export const createOrder = createAsyncThunk("order/createOrder", async (orderData, { rejectWithValue }) => {

    try {

        // Create order API call
        const { data } = await api.post("/api/order/createOrder", orderData);

        // Return success response
        return data;

    } catch (error) {

        return rejectWithValue(
            error.response?.data?.message || "Something went wrong"
        );

    }

});

// Thunk to get logged-in user's orders
export const getMyOrders = createAsyncThunk("order/getMyOrders", async (_, { rejectWithValue }) => {

    try {

        const { data } = await api.get("/api/order/myOrders");
        return data;

    } catch (error) {

        return rejectWithValue(
            error.response?.data?.message || "Something went wrong"
        );

    }

});

// Thunk to get restaurant owner's orders
export const getRestaurantOrders = createAsyncThunk("order/getRestaurantOrders", async (_, { rejectWithValue }) => {

    try {

        const { data } = await api.get("/api/order/restaurantOrders");
        return data;
        
    } catch (error) {

        return rejectWithValue(
            error.response?.data?.message || "Something went wrong"
        );
        
    }

});