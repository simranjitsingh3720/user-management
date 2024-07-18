import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosInstance';
import apiUrls from '../utils/apiUrls';
import { buildQueryString, getFullName } from '../utils/globalizationFunction';
import errorHandler from '../utils/errorHandler';

export const getParentCode = createAsyncThunk(
  'parentCode/getParentCode',
  async (roleId, { getState, rejectWithValue }) => {
    try {
      if (roleId) {
        const params = buildQueryString({ productName: 'sales', status: true });
        const url = `${apiUrls.getParentCode}/${roleId?.id}/parent?${params}`;
        const response = await axiosInstance.get(url);
        const formattedArray = response?.data?.data?.map((obj) => ({
          ...obj,
          label: getFullName(obj?.firstName, obj?.lastName),
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

export const parentCode = createSlice({
  name: 'parentCode',
  initialState: {
    parentCode: [],
    loading: true,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getParentCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getParentCode.fulfilled, (state, action) => {
        state.parentCode = action.payload;
        state.loading = false;
      })
      .addCase(getParentCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.parentCode = [];
      });
  },
});

export default parentCode.reducer;
