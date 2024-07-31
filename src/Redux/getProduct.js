import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from './../utils/axiosInstance';
import apiUrls from '../utils/apiUrls';
import { buildQueryString, toCapitalize } from '../utils/globalizationFunction';
import errorHandler from '../utils/errorHandler';

export const getProducts = createAsyncThunk('productUserCreation/getProducts', async (lob, { rejectWithValue }) => {
  try {
    if (lob) {
      const lobids = lob.map((item) => item?.id);
      const idsString = lobids.join(',');
      const params = buildQueryString({ ids: idsString, edge: 'hasLob', isExclusive: true, status: true, isAll : true});
      const url = `${apiUrls.getProduct}?${params}`;
      const response = await axiosInstance.get(url);
      const formattedArray = response?.data?.data?.map((obj) => ({
        ...obj,
        label: toCapitalize(obj, 'product'),
        value: obj?.productValue,
      }));
      return formattedArray;
    }
  } catch (error) {
    errorHandler.handleError(error);
    return rejectWithValue([]);
  }
});

export const clearProducts = createAction('productUserCreation/clearProducts');

export const productUserCreation = createSlice({
  name: 'productUserCreation',
  initialState: {
    product: [],
    loading: true,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(clearProducts, (state) => {
      state.product = [];
    })
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
