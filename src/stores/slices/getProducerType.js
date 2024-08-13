import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import apiUrls from '../../utils/apiUrls';
import { buildQueryString, toCapitalize } from '../../utils/globalizationFunction';
import errorHandler from '../../utils/errorHandler';
import { COMMON_WORDS } from '../../utils/constants';

export const getProducerTypes = createAsyncThunk(
  'producerType/getChannels',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { producerType } = getState();
      if (producerType?.producerType?.length > 0) {
        return producerType.producerType;
      }
      const params = buildQueryString({ isAll: true, status: true });
      const url = `${apiUrls.getProducerType}?${params}`;
      const response = await axiosInstance.get(url);
      const formattedArray = response?.data?.data?.map((obj) => ({
        ...obj,
        label: toCapitalize(obj, COMMON_WORDS.PRODUCER_TYPE_NAME),
        value: obj?.id,
      }));
      return formattedArray;
    } catch (error) {
      errorHandler.handleError(error);
      return rejectWithValue([]);
    }
  }
);

export const producerType = createSlice({
  name: 'producerType',
  initialState: {
    producerType: [],
    loading: true,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducerTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducerTypes.fulfilled, (state, action) => {
        state.producerType = action.payload;
        state.loading = false;
      })
      .addCase(getProducerTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.producerType = [];
      });
  },
});

export default producerType.reducer;
