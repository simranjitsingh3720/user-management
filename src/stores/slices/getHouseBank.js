import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import apiUrls from '../../utils/apiUrls';
import { buildQueryString } from '../../utils/globalizationFunction';
import errorHandler from '../../utils/errorHandler';

export const getHouseBanks = createAsyncThunk('houseBank/getHouseBanks', async (_, { getState, rejectWithValue }) => {
  try {
    const { houseBank } = getState();
    if (houseBank?.houseBank?.length > 0) {
      return houseBank.houseBank;
    }
    const params = buildQueryString({ isAll: true, status: true });
    const url = `${apiUrls.getHouseBank}?${params}`;
    const response = await axiosInstance.get(url);
    const formattedArray = response?.data?.data?.map((obj) => ({
      ...obj,
      label: obj?.houseBankCode,
      value: obj?.id,
    }));
    return formattedArray;
  } catch (error) {
    errorHandler.handleError(error);
    return rejectWithValue([]);
  }
});

export const houseBank = createSlice({
  name: 'houseBank',
  initialState: {
    houseBank: [],
    loading: true,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHouseBanks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHouseBanks.fulfilled, (state, action) => {
        state.houseBank = action.payload;
        state.loading = false;
      })
      .addCase(getHouseBanks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.houseBank = [];
      });
  },
});

export default houseBank.reducer;
