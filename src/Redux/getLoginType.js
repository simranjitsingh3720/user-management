import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosInstance';
import apiUrls from '../utils/apiUrls';
import { buildQueryString } from '../utils/globalizationFunction';
import errorHandler from '../utils/errorHandler';

function formatLoginTypes(loginType) {
  if (loginType.includes('&')) {
    loginType = loginType
      .split('&')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' & ');
  } else {
    loginType = loginType.charAt(0).toUpperCase() + loginType.slice(1);
  }
  return loginType;
}

export const getLoginType = createAsyncThunk('loginType/getLoginType', async (_, { getState, rejectWithValue }) => {
  try {
    const { loginType } = getState();
    if (loginType?.loginType?.length > 0) {
      return loginType.loginType;
    }
    const params = buildQueryString({ isAll: true, status: true });
    const url = `${apiUrls.getLoginType}?${params}`;
    const response = await axiosInstance.get(url);
    const formattedArray = response?.data?.data?.map((obj) => ({
      ...obj,
      label: formatLoginTypes(obj.loginType),
      value: obj?.loginType,
    }));
    return formattedArray;
  } catch (error) {
    errorHandler.handleError(error);
    return rejectWithValue([]);
  }
});

export const loginType = createSlice({
  name: 'loginType',
  initialState: {
    loginType: [],
    loading: true,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLoginType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLoginType.fulfilled, (state, action) => {
        state.loginType = action.payload;
        state.loading = false;
      })
      .addCase(getLoginType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.loginType = [];
      });
  },
});

export default loginType.reducer;
