import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance"

export const getProducerCodes = createAsyncThunk("producerCode/getProducerCodes", async (roleName) => {
    try {
        let url = `/api/user?searchKey=roleName&searchString=${roleName}`;
        // let url = `/api/user?searchKey=roleName`;
        const response = await axiosInstance.get(url);
        const formattedArray = response?.data?.data?.map(obj => ({
            label: obj.producerCode,
            value: obj.producerCode,
            id: obj.id
        }));
        return formattedArray;
    }
    catch (error) {
        console.log("error in fetching producer code");
    }
});

export const producerCode = createSlice({
    name: 'producerCode',
    initialState: {
        producerCode: [],
        loading: true,
        error: ''
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducerCodes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProducerCodes.fulfilled, (state, action) => {
                state.producerCode = action.payload;
                state.loading = false;
            })
            .addCase(getProducerCodes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
})

export default producerCode.reducer;