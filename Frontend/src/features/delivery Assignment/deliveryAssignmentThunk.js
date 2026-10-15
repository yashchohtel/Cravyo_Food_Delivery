import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// Thunk to get available delivery assignments
export const getAvailableAssignments = createAsyncThunk("deliveryAssignment/getAvailableAssignments",

    async (_, { rejectWithValue }) => {

        try {

            // Get available delivery assignments API call
            const { data } = await api.get("/api/deliveryAssignment/available");

            // Return success response
            return data;

        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );

        }

    }

);

// Thunk to accept a delivery assignment
export const acceptDeliveryAssignment = createAsyncThunk("deliveryAssignment/acceptDeliveryAssignment",

    async (assignmentId, { rejectWithValue }) => {

        try {

            // Accept delivery assignment API call
            const { data } = await api.put(`/api/deliveryAssignment/acceptOrder/${assignmentId}`);

            // Return success response
            return data;

        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );

        }

    }
);