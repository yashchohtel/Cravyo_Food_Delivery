import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api/axios";

// Get all food categories
export const getFoodCategories = createAsyncThunk("foodCategory/getFoodCategories", async (_, { rejectWithValue }) => {

    try {

        const { data } = await api.get("/api/platformAction/getAllFoodCategories");

        return data.categories;

    } catch (error) {

        return rejectWithValue(
            error.response?.data?.message || "Something went wrong"
        );

    }

});