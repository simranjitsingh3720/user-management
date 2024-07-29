import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { buildQueryString } from '../utils/globalizationFunction';
import apiUrls from '../utils/apiUrls';
import errorHandler from '../utils/errorHandler';
import axiosInstance from '../utils/axiosInstance';
import { COMMON_WORDS } from '../utils/constants';

export const getMasterPolicies = createAsyncThunk(
  'masterPolicy/getMasterPolicies',
  async (product, { getState, rejectWithValue }) => {
    try {
      if (product) {
        const productIds = product.map((item) => item?.id);
        const idsString = productIds.join(',');
        const params = buildQueryString({ ids: idsString, edge: COMMON_WORDS.HAS_PRODUCT, isExclusive: true, status: true });
        const url = `${apiUrls.getMasterPolicy}?${params}`;
        const response = await axiosInstance.get(url);
        const formattedArray = response?.data?.data?.map((obj) => ({
          ...obj,
          label: obj?.policy,
          value: obj?.id,
        }));
        return formattedArray;
      }
    } catch (error) {
      errorHandler.handleError(error);
      return rejectWithValue([]);
    }
  }
);

export const clearMasterPolicy = createAction('masterPolicy/clearMasterPolicy');

export const masterPolicy = createSlice({
  name: 'masterPolicy',
  initialState: {
    masterPolicy: [],
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(clearMasterPolicy, (state) => {
        state.masterPolicy = [];
      })
      .addCase(getMasterPolicies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMasterPolicies.fulfilled, (state, action) => {
        state.masterPolicy = action.payload;
        state.loading = false;
      })
      .addCase(getMasterPolicies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.masterPolicy = [];
      });
  },
});

export default masterPolicy.reducer;
