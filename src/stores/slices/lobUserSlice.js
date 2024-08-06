import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import errorHandler from '../../utils/errorHandler';
import apiUrls from '../../utils/apiUrls';

export const fetchLobByUserId = createAsyncThunk('lob/fetchLobByUserId', async (employeeId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`${apiUrls.getUser}/${employeeId}/lobs`);
    const { data = {} } = response || {};
    const { data: lobList = [] } = data;
    return lobList;
  } catch (error) {
    return rejectWithValue(errorHandler.handleError(error));
  }
});

const lobUserSlice = createSlice({
  name: 'lobUser',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLobByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLobByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchLobByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default lobUserSlice.reducer;
