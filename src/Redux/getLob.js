import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "./../utils/axiosInstance"

export const getLobs = createAsyncThunk("lob/getLobs", async () => {
    try {
        let url = `/api/lob?isAll=${true}`;
        const response = await axiosInstance.get(url);
        const formattedArray = response?.data?.data?.map(obj => ({
            label: obj.lob.charAt(0).toUpperCase() + obj.lob.slice(1),
            value: obj.lob_value,
            id: obj.id
        }));
        return formattedArray;
    }
    catch (error) {
        console.log("error in fetching lob");
    }
});

export const lob = createSlice({
    name: 'lob',
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

export default lob.reducer;