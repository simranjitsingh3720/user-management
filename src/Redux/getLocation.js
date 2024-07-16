import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosInstance';
import apiUrls from '../utils/apiUrls';
import { buildQueryString, toCapitalize } from '../utils/globalizationFunction';

export const getLocations = createAsyncThunk('location/getLocations', async (_, { getState, rejectWithValue }) => {
  try {
    const { location } = getState();
    if (location?.location?.length > 0) {
      return location.location;
    }
    const params = buildQueryString({ isAll: true, status: true });
    const url = `${apiUrls.getLocation}?${params}`;
    const response = await axiosInstance.get(url);
    const formattedArray = response?.data?.data?.map((obj) => ({
      ...obj,
      label: toCapitalize(obj, 'txtOffice'),
      value: obj?.locationName,
    }));
    return formattedArray;
  } catch (error) {
    console.error(error);
    return rejectWithValue([]);
  }
});

export const location = createSlice({
  name: 'location',
  initialState: {
    location: [],
    loading: true,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLocations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLocations.fulfilled, (state, action) => {
        state.location = action.payload;
        state.loading = false;
      })
      .addCase(getLocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.location = [];
      });
  },
});

export default location.reducer;
