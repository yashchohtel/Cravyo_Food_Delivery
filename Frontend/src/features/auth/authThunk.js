import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios.js"; // import api instance for making API requests

// Thunk to load the current authenticated user
export const loadUser = createAsyncThunk("auth/loadUser", async (_, { rejectWithValue }) => {

    try {

        const { data } = await api.get("/api/auth/me");

        return data.user;

    } catch (error) {

        return rejectWithValue(
            error.response?.data?.message || "Something went wrong"
        );

    }

});


