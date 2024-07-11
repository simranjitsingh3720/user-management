import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosInstance';
import apiUrls from '../utils/apiUrls';
import { buildQueryString, toCapitalize } from '../utils/globalizationFunction';

export const getChannels = createAsyncThunk('channelType/getChannels', async (_, { getState, rejectWithValue }) => {
  try {
    const { channelType } = getState();
    if (channelType?.channelType?.length > 0) {
      return channelType.channelType;
    }
    const params = buildQueryString({ isAll: true, status: true });
    const url = `${apiUrls.getChannelType}?${params}`;
    const response = await axiosInstance.get(url);
    const formattedArray = response?.data?.data?.map((obj) => ({
      ...obj,
      label: toCapitalize(obj, 'txtChannelName'),
      value: obj?.txtChannelName,
    }));
    return formattedArray;
  } catch (error) {
    console.error(error);
    return rejectWithValue([]);
  }
});

export const channelType = createSlice({
  name: 'channelType',
  initialState: {
    channelType: [],
    loading: true,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getChannels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChannels.fulfilled, (state, action) => {
        state.channelType = action.payload;
        state.loading = false;
      })
      .addCase(getChannels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.channelType = [];
      });
  },
});

export default channelType.reducer;
