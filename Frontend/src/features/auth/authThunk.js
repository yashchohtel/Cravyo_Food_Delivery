import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios.js"; // import api instance for making API requests

// Thunk to load the current authenticated user
export const loadUser = createAsyncThunk("auth/loadUser", async (_, { rejectWithValue }) => {

    try {

        const { data } = await api.get("/api/auth/me");

        // Return the user data from the response
        return data.user;

    } catch (error) {

        return rejectWithValue(
            error.response?.data?.message || "Something went wrong"
        );

    }

});

// Thunk to register a new user
export const registerUser = createAsyncThunk("auth/registerUser", async (formData, { rejectWithValue }) => {

    try {

        // register api call
        const { data } = await api.post("/api/auth/register", formData);

        // return success response
        return data;

    } catch (error) {

        return rejectWithValue(
            error.response?.data?.message || "Something went wrong"
        );

    }

});

// Thunk to login user
export const loginUser = createAsyncThunk("auth/loginUser", async (formData, { rejectWithValue }) => {

    try {

        // login api call
        const { data } = await api.post("/api/auth/login", formData);

        console.log(data);

        // return success response
        return data;

    } catch (error) {

        return rejectWithValue(
            error.response?.data?.message || "Something went wrong"
        );

    }

});

// Thunk to send login OTP
export const sendLoginOtp = createAsyncThunk("auth/sendLoginOtp", async (formData, { rejectWithValue }) => {

    try {

        // send login otp api call
        const { data } = await api.post("/api/auth/send-login-otp", formData);
        console.log(data);
        return data;

    } catch (error) {

        return rejectWithValue(
            error.response?.data?.message || "Something went wrong"
        );

    }

});

// Thunk to logout the current user
export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, { rejectWithValue }) => {

    try {

        // logout api call
        const { data } = await api.post("/api/auth/logout");

        return data;

    } catch (error) {

        return rejectWithValue(
            error.response?.data?.message || "Something went wrong"
        );

    }

});