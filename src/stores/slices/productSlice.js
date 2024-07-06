import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from './../../utils/axiosInstance';
import apiUrls from '../../utils/apiUrls';

export const fetchAllProductData = createAsyncThunk(
  'lob/fetchAllProduct',
  async ({ lobId } = {}, { rejectWithValue }) => {
    try {
      const url = lobId
        ? `${apiUrls.getProduct}?ids=${lobId}&edge=hasLob&isExclusive=true`
        : `${apiUrls.getProduct}?isAll=true`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue([]);
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    productLoading: false,
  },
  reducers: {
    clearProducts: (state, action) => {
        state.products = [];
    } 
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductData.pending, (state) => {
        state.productLoading = true;
      })
      .addCase(fetchAllProductData.fulfilled, (state, action) => {
        state.products = action.payload;
        state.productLoading = false;
      })
      .addCase(fetchAllProductData.rejected, (state) => {
        state.products = [];
        state.productLoading = false;
      });
  },
});

export const { clearProducts } = productSlice.actions;
export default productSlice.reducer;
