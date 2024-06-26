import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance"

export const getPaymentTypes = createAsyncThunk("paymentType/getPaymentTypes",  async (_, { getState, rejectWithValue }) => {
    try {
        const { paymentType } = getState();
        if (paymentType?.paymentType?.length > 0) {
            console.log(paymentType, "data is there paymenttype")
            return paymentType.paymentType; // Return existing data
        }
        console.log(paymentType, "data not there paymenttype")
    
        let url = `/api/payment-type?isAll=${true}`;
        const response = await axiosInstance.get(url);
        const formattedArray = response?.data?.data?.map(obj => ({
            ...obj,
            label: obj?.name,
            value: obj?.name
        }));
        return formattedArray;
    }
    catch (error) {
        console.log("error in fetching payment type");
        return rejectWithValue([]);
    }
});

export const paymentType = createSlice({
    name: 'paymentType',
    initialState: {
        paymentType: [],
        loading: true,
        error: ''
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPaymentTypes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPaymentTypes.fulfilled, (state, action) => {
                state.paymentType = action.payload;
                state.loading = false;
            })
            .addCase(getPaymentTypes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
})

export default paymentType.reducer;