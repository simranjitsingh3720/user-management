import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "./../utils/axiosInstance"

export const getProducts = createAsyncThunk("productUserCreation/getProducts", async (id) => {
    try {
        let url = `/api/product?isAll=${true}`;
        const response = await axiosInstance.get(url);
        const formattedArray = response?.data?.data?.map(obj => ({
            label: obj.product.charAt(0).toUpperCase() + obj.product.slice(1),
            value: obj.product_value
        }));
        return formattedArray;
    }
    catch (error) {
        console.log("error in fetching product");
    }
});

export const productUserCreation = createSlice({
    name: 'productUserCreation',
    initialState: {
        product: [],
        loading: true,
        error: ''
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.product = action.payload;
                state.loading = false;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
})

export default productUserCreation.reducer;