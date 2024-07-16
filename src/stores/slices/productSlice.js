import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axiosInstance from './../../utils/axiosInstance';
import apiUrls from './../../utils/apiUrls';
import { COMMON_ERROR } from './../../utils/globalConstants';
import { buildParams } from './../../utils/buildParams';
import { addAsyncReducers } from './../../utils/addAsyncReducers';

export const fetchAllProductData = createAsyncThunk(
  'product/fetchAllProductData',
  async ({ isAll, page, pageSize, order, orderBy, lobId, childFieldsToFetch, ids, edge, status } = {}, { rejectWithValue }) => {
    try {
      const params = buildParams({ isAll, page, pageSize, order, orderBy, lobId, childFieldsToFetch, ids, edge, status });
      const response = await axiosInstance.get(apiUrls.getProduct, { params });
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error?.message || COMMON_ERROR);
      return rejectWithValue([]);
    }
  }
);

export const updateProductData = createAsyncThunk(
  'product/updateProductData',
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(apiUrls.getProduct, data);
      toast.success(response?.data?.message || 'Product updated successfully');
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error?.message || COMMON_ERROR);
      return rejectWithValue(error?.response?.data || {});
    }
  }
);

export const createProductData = createAsyncThunk(
  'product/createProductData',
  async ({ data, navigate }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(apiUrls.getProduct, data);
      toast.success(response?.data?.message || 'Product created successfully');
      navigate('/product');
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error?.message || COMMON_ERROR);
      return rejectWithValue(error?.response?.data || {});
    }
  }
);

const initialState = {
  products: [],
  productsLoading: false,
  updateLoading: false,
  createLoading: false,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.products = [];
    },
  },
  extraReducers: (builder) => {
    addAsyncReducers(builder, [
      { asyncThunk: fetchAllProductData, stateKey: 'products' },
      { asyncThunk: updateProductData, stateKey: 'update' },
      { asyncThunk: createProductData, stateKey: 'create' },
    ]);
  },
});

export const { clearProducts } = productSlice.actions;
export default productSlice.reducer;
