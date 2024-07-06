import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from './../../utils/axiosInstance';
import apiUrls from './../../utils/apiUrls';

export const fetchLobData = createAsyncThunk(
  'lob/fetchLobData',
  async (_, { rejectWithValue }) => {
    try {
      const url = `${apiUrls.getLob}?isAll=true&status=true`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue([]);
    }
  }
);

const lobSlice = createSlice({
  name: 'lob',
  initialState: {
    allLob: [],
    lobLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLobData.pending, (state) => {
        state.lobLoading = true;
      })
      .addCase(fetchLobData.fulfilled, (state, action) => {
        state.allLob = action.payload;
        state.lobLoading = false;
      })
      .addCase(fetchLobData.rejected, (state) => {
        state.allLob = [];
        state.lobLoading = false;
      });
  },
});

export default lobSlice.reducer;
