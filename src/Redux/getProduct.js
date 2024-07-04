import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "./../utils/axiosInstance";

export const getProducts = createAsyncThunk(
  "productUserCreation/getProducts",
  async (lob, { rejectWithValue }) => {
    try {
      if (lob) {
        const lobids = lob.map((item) => item.id);
        const idsString = lobids.join(",");
        let url = `/api/product?ids=${idsString}&edge=hasLob&isExclusive=true`;
        const response = await axiosInstance.get(url);
        const formattedArray = response?.data?.data?.map((obj) => ({
          ...obj,
          label:
            obj?.product?.charAt(0)?.toUpperCase() + obj?.product?.slice(1),
          value: obj?.product_value,
        }));
        return formattedArray;
      }
    } catch (error) {
      console.error(error);
      return rejectWithValue([]);
    }
  }
);

export const productUserCreation = createSlice({
  name: "productUserCreation",
  initialState: {
    product: [],
    loading: true,
    error: "",
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
        state.product = [];
        state.error = action.error.message;
      });
  },
});

export default productUserCreation.reducer;
