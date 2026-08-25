import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios.js";

// Get all promotion banners
export const getPromotionBanners = createAsyncThunk("promotionBanner/getPromotionBanners", async (_, { rejectWithValue }) => {

    try {

        const { data } = await api.get("/api/platformAction/getBanners");

        return data.banners;

    } catch (error) {

        return rejectWithValue(error.response?.data?.message || "Something went wrong");

    }

});