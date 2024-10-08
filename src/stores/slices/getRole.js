import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import apiUrls from '../../utils/apiUrls';
import { buildQueryString, toCapitalize } from '../../utils/globalizationFunction';
import errorHandler from '../../utils/errorHandler';
import { COMMON_WORDS } from '../../utils/constants';

export const getRoles = createAsyncThunk('role/getRoles', async (_, { getState, rejectWithValue }) => {
  try {
    const { role } = getState();
    if (role?.role?.length > 0) {
      return role.role;
    }

    const params = buildQueryString({ isAll: true, status: true });
    const url = `${apiUrls.getRole}?${params}`;
    const response = await axiosInstance.get(url);
    const formattedArray = response?.data?.data?.map((obj) => ({
      ...obj,
      label: toCapitalize(obj, COMMON_WORDS.ROLE_NAME),
    }));
    return formattedArray;
  } catch (error) {
    errorHandler.handleError(error);
    return rejectWithValue([]);
  }
});

export const role = createSlice({
  name: 'role',
  initialState: {
    role: [],
    loading: true,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRoles.fulfilled, (state, action) => {
        state.role = action.payload;
        state.loading = false;
      })
      .addCase(getRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.role = [];
      });
  },
});

export default role.reducer;
