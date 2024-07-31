import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosInstance';
import apiUrls from '../utils/apiUrls';
import { buildQueryString, toCapitalize } from '../utils/globalizationFunction';
import errorHandler from '../utils/errorHandler';
import { COMMON_WORDS } from '../utils/constants';

export const getPlans = createAsyncThunk('plan/getPlans', async (product, { getState, rejectWithValue }) => {
  try {
    if (product) {
      const productIds = product.map((item) => item?.id);
      const idsString = productIds.join(',');
      const params = buildQueryString({ ids: idsString, edge: COMMON_WORDS.HAS_PRODUCT, isExclusive: true, status: true, isAll: true });
      const url = `${apiUrls.getPlan}?${params}`;
      const response = await axiosInstance.get(url);
      const formattedArray = response?.data?.data?.map((obj) => ({
        ...obj,
        label: toCapitalize(obj, COMMON_WORDS.PLAN),
        value: obj?.id,
      }));
      return formattedArray;
    }
  } catch (error) {
    errorHandler.handleError(error);
    return rejectWithValue([]);
  }
});

export const clearPlans = createAction('plan/clearPlans');

export const plan = createSlice({
  name: 'plan',
  initialState: {
    plan: [],
    loading: true,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(clearPlans, (state) => {
        state.plan = [];
      })
      .addCase(getPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPlans.fulfilled, (state, action) => {
        state.plan = action.payload;
        state.loading = false;
      })
      .addCase(getPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.plan = [];
      });
  },
});

export default plan.reducer;
