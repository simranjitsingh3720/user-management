import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance"

export const getProducerCodes = createAsyncThunk("producerCode/getProducerCodes", async (roleName, { rejectWithValue }) => {
    try {
       if(roleName){
        let producerUrl = `/api/user-type?searchKey=userType&searchString=producer&status=true`;
        const responseProducerCode = await axiosInstance.get(producerUrl);
        let url = `/api/user?ids=${responseProducerCode?.data?.data[0]?.id}&edge=hasUserType&isExclusive=true`;
        const response = await axiosInstance.get(url);
        const formattedArray = response?.data?.data?.map(obj => ({
            ...obj,
            label: obj?.producerCode,
            value: obj?.producerCode
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