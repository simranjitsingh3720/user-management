import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "./../utils/axiosInstance"
import apiUrls from "../utils/apiUrls";
import { toCapitalize } from "../utils/globalizationFunction";

export const getLobs = createAsyncThunk("lobUserCreation/getLobs", async (_, { getState, rejectWithValue }) => {
    try {
        const { lobUserCreation } = getState();
        if (lobUserCreation?.lob?.length > 0) {
            return lobUserCreation.lob; 
        }

        const url = `${apiUrls.getLob}?isAll=${true}&status=true`;
        const response = await axiosInstance.get(url);
        const formattedArray = response?.data?.data?.map(obj => ({
            ...obj,
            label: toCapitalize(obj, 'lob'),
            value: obj?.lob_value,
        }));
        return formattedArray;
    }
    catch (error) {
        console.error(error);
        return rejectWithValue([]);
    }
});

export const lobUserCreation = createSlice({
    name: 'lobUserCreation',
    initialState: {
        lob: [],
        loading: true,
        error: ''
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getLobs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getLobs.fulfilled, (state, action) => {
                state.lob = action.payload;
                state.loading = false;
            })
            .addCase(getLobs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.lob = [];
            });
    },
})

export default lobUserCreation.reducer;