import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios"; // import api instance for making API requests

// Thunk to update the current user's location
export const updateUserLocation = createAsyncThunk("user/updateUserLocation", async (locationData, { rejectWithValue }) => {

    try {

        // update user location api call
        const { data } = await api.put("/api/user/updateUserLocation", locationData);

        // return success response
        return data;

    } catch (error) {

        return rejectWithValue(
            error.response?.data?.message || "Something went wrong"
        );

    }

});