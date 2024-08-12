import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from './../../utils/axiosInstance';
import apiUrls from './../../utils/apiUrls';
import { buildParams } from './../../utils/buildParams';
import { addAsyncReducers } from './../../utils/addAsyncReducers';
import errorHandler from '../../utils/errorHandler';
import toastifyUtils from '../../utils/toastify';

export const fetchAllProductData = createAsyncThunk(
  'product/fetchAllProductData',
  async ({ isAll, page, pageSize, order, orderBy, lobId, childFieldsToFetch, ids, edge, status } = {}, { rejectWithValue }) => {
    try {
      const params = buildParams({ isAll, page, pageSize, order, orderBy, lobId, childFieldsToFetch, ids, edge, status });
      const response = await axiosInstance.get(apiUrls.getProduct, { params });
      return response.data;
    } catch (error) {
      return rejectWithValue([]);
    }
  }
);

export const updateProductData = createAsyncThunk(
  'product/updateProductData',
  async ({ data, productData, updateProductStatus }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(apiUrls.getProduct, data);
      toastifyUtils.notifySuccess(response?.data?.message || 'Product updated successfully');
      if(updateProductStatus) {
        updateProductStatus(data.id, productData);
      }
      return response.data;
    } catch (error) {
      errorHandler.handleError(error)
      return rejectWithValue(error?.response?.data || {});
    }
  }
);

export const createProductData = createAsyncThunk(
  'product/createProductData',
  async ({ data, navigate }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(apiUrls.getProduct, data);
      toastifyUtils.notifySuccess(response?.data?.message || 'Product created successfully');
      navigate('/product');
      return response.data;
    } catch (error) {
      errorHandler.handleError(error)
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
