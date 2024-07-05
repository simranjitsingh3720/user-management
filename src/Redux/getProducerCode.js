import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance"

export const getProducerCodes = createAsyncThunk("producerCode/getProducerCodes", async (roleName, { rejectWithValue }) => {
    try {
       if(roleName){
        let url = `/api/user?ids=${roleName?.id}&edge=hasRole&isExclusive=true`;
        const response = await axiosInstance.get(url);
        const formattedArray = response?.data?.data?.map(obj => ({
            ...obj,
            label: obj?.ntId,
            value: obj?.ntId
        }));
        return formattedArray;
       }
    }
    catch (error) {
        console.error(error)
        return rejectWithValue([]);
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
                state.producerCode = [];
            });
    },
})

export default producerCode.reducer;