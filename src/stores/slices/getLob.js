import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import apiUrls from '../../utils/apiUrls';
import { buildQueryString, toCapitalize } from '../../utils/globalizationFunction';
import errorHandler from '../../utils/errorHandler';
import { COMMON_WORDS } from '../../utils/constants';

export const getLobs = createAsyncThunk('lobUserCreation/getLobs', async (_, { getState, rejectWithValue }) => {
  try {
    const { lobUserCreation } = getState();
    if (lobUserCreation?.lob?.length > 0) {
      return lobUserCreation.lob;
    }
    const params = buildQueryString({ isAll: true, status: true });
    const url = `${apiUrls.getLob}?${params}`;
    const response = await axiosInstance.get(url);
    const formattedArray = response?.data?.data?.map((obj) => ({
      ...obj,
      label: toCapitalize(obj, COMMON_WORDS.LOB),
      value: obj?.lobValue,
    }));
    return formattedArray;
  } catch (error) {
    errorHandler.handleError(error);
    return rejectWithValue([]);
  }
});

export const lobUserCreation = createSlice({
  name: 'lobUserCreation',
  initialState: {
    lob: [],
    loading: true,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLobs.fulfilled, (state, action) => {
        state.lob = action.payload;
        state.loading = false;
      })
      .addCase(getLobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.lob = [];
      });
  },
});

export default lobUserCreation.reducer;
