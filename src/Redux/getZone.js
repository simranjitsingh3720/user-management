import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosInstance';
import apiUrls from '../utils/apiUrls';
import { buildQueryString, toCapitalize } from '../utils/globalizationFunction';
import errorHandler from '../utils/errorHandler';
import { COMMON_WORDS } from '../utils/constants';

export const getZones = createAsyncThunk('zone/getZones', async (planId, { getState, rejectWithValue }) => {
  try {
    if (planId) {
      const planIds = planId.map((item) => item?.id);
      const idsString = planIds.join(',');
      const params = buildQueryString({ ids: idsString, edge: COMMON_WORDS.HAS_PRODUCT, isExclusive: true, status: true });
      const url = `${apiUrls.getZone}?${params}`;
      const response = await axiosInstance.get(url);
      const formattedArray = response?.data?.data?.map((obj) => ({
        ...obj,
        label: toCapitalize(obj, COMMON_WORDS.ZONE),
        value: obj?.id,
      }));
      return formattedArray;
    }
  } catch (error) {
    errorHandler.handleError(error);
    return rejectWithValue([]);
  }
});

export const clearZones = createAction('zone/clearZones');

export const zone = createSlice({
  name: 'zone',
  initialState: {
    zone: [],
    loading: true,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(clearZones, (state) => {
        state.zone = [];
      })
      .addCase(getZones.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getZones.fulfilled, (state, action) => {
        state.zone = action.payload;
        state.loading = false;
      })
      .addCase(getZones.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.zone = [];
      });
  },
});

export default zone.reducer;
