import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "./../utils/axiosInstance"

export const getLobs = createAsyncThunk("lobUserCreation/getLobs", async (_, { getState, rejectWithValue }) => {
    try {
        const { lobUserCreation } = getState();
        if (lobUserCreation?.lob?.length > 0) {
            return lobUserCreation.lob; // Return existing data
        }

        let url = `/api/lob?isAll=${true}`;
        const response = await axiosInstance.get(url);
        const formattedArray = response?.data?.data?.map(obj => ({
            ...obj,
            label: obj?.lob?.charAt(0)?.toUpperCase() + obj?.lob?.slice(1),
            value: obj?.lob_value,
        }));
        return formattedArray;
    }
    catch (error) {
        console.log("error in fetching lob");
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
            });
    },
})

export default lobUserCreation.reducer;