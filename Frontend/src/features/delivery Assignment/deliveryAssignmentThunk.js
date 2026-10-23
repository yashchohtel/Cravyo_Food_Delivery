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

// Thunk to get a specific delivery assignment
export const getDeliveryAssignmentById = createAsyncThunk("deliveryAssignment/getDeliveryAssignmentById",

    async (assignmentId, { rejectWithValue }) => {

        try {

            const { data } = await api.get(`/api/deliveryAssignment/${assignmentId}`);

            return data;

        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Something went wrong"
            );

        }

    }

);

// Thunk to mark order as picked up
export const markOrderPickedUp = createAsyncThunk("deliveryAssignment/markOrderPickedUp",

    async (assignmentId, { rejectWithValue }) => {

        try {

            // Mark order as picked up API call
            const { data } = await api.put(`/api/deliveryAssignment/markPickedUp/${assignmentId}`);

            // Return success response
            return data;

        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );

        }

    }

);

// Thunk to mark order as delivered
export const markOrderDelivered = createAsyncThunk("deliveryAssignment/markOrderDelivered",

    async (assignmentId, { rejectWithValue }) => {

        try {

            // Mark order as delivered API call
            const { data } = await api.put(`/api/deliveryAssignment/markDelivered/${assignmentId}`);

            // Return success response
            return data;

        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );

        }

    }

);

// Thunk to cancel delivery order
export const cancelDeliveryOrder = createAsyncThunk("deliveryAssignment/cancelDeliveryOrder",

    async (assignmentId, { rejectWithValue }) => {

        try {

            // Cancel delivery order API call
            const { data } = await api.put(`/api/deliveryAssignment/cancelOrder/${assignmentId}`);

            // Return success response
            return data;

        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );

        }

    }

);