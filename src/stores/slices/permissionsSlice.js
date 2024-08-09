import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiUrls from '../../utils/apiUrls';
import axiosInstance from '../../utils/axiosInstance';
import { buildQueryString } from '../../utils/globalizationFunction';

// Async thunk to fetch permissions with parameters
export const fetchPermissions = createAsyncThunk(
  'permissions/fetchPermissions',
  async ({ isAll = true, status = true }, { rejectWithValue }) => {
    try {
      const params = {
        isAll,
        status,
      };
      let url = `${apiUrls.getPermission}?${buildQueryString(params)}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue([]);
    }
  }
);

const permissionsSlice = createSlice({
  name: 'permissions',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPermissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPermissions.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchPermissions.rejected, (state, action) => {
        state.data = [];
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default permissionsSlice.reducer;
