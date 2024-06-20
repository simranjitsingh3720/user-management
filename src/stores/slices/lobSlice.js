import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from './../../utils/axiosInstance';
import { API_END_POINTS } from './../../utils/constants';

export const fetchLobData = createAsyncThunk(
  'lob/fetchLobData',
  async (_, { rejectWithValue }) => {
    try {
      const url = `${API_END_POINTS.LOBAPI}?isAll=true&status=true`;
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
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLobData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLobData.fulfilled, (state, action) => {
        state.allLob = action.payload;
        state.loading = false;
      })
      .addCase(fetchLobData.rejected, (state) => {
        state.allLob = [];
        state.loading = false;
      });
  },
});

export default lobSlice.reducer;
