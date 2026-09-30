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






















