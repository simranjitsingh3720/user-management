import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import apiUrls from '../../utils/apiUrls';
import { buildQueryString } from '../../utils/globalizationFunction';

// Async thunk to fetch all modules
export const fetchAllModules = createAsyncThunk('modules/fetchAllModules', async (_, { getState, rejectWithValue }) => {
  try {
    const { modulesSlice } = getState();
    if (modulesSlice?.data?.length > 0) {
      return modulesSlice.data;
    }
    const params = buildQueryString({ status: true });
    const response = await axiosInstance.get(`${apiUrls.module}/all?${params}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Failed to fetch modules');
  }
});

const modulesSlice = createSlice({
  name: 'modules',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllModules.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllModules.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllModules.rejected, (state, action) => {
        state.data = [];
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default modulesSlice.reducer;
