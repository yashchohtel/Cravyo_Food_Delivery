import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api/axios";

// Get all promotion banners
export const getPromotionBanners = createAsyncThunk("promotionBanner/getPromotionBanners", async (_, { rejectWithValue }) => {

    try {

        const { data } = await api.get("/api/platformAction/getBanners");

        return data.banners;

    } catch (error) {

        return rejectWithValue(error.response?.data?.message || "Something went wrong");

    }

});

// Create a new promotion banner
export const createBanner = createAsyncThunk("promotionBanner/createBanner", async (formData, { rejectWithValue }) => {

    try {

        const { data } = await api.post("/api/platformAction/createBanner", formData);

        return data.banners;

    } catch (error) {

        return rejectWithValue(error.response?.data?.message || "Something went wrong");

    }

});

// Update an existing promotion banner
export const updateBanner = createAsyncThunk("promotionBanner/updateBanner", async ({ id, formData }, { rejectWithValue }) => {

    try {

        const { data } = await api.put(`/api/platformAction/updateBanner/${id}`, formData);

        return data.banner;

    } catch (error) {

        return rejectWithValue(error.response?.data?.message || "Something went wrong");

    }

});

// Silently refetch banners without triggering skeleton loading (used after update/create)
export const refreshPromotionBanners = createAsyncThunk("promotionBanner/refreshPromotionBanners", async (_, { rejectWithValue }) => {

    try {

        const { data } = await api.get("/api/platformAction/getBanners");

        return data.banners;

    } catch (error) {

        return rejectWithValue(error.response?.data?.message || "Something went wrong");

    }

});