import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axiosInstance from './../../utils/axiosInstance';
import apiUrls from './../../utils/apiUrls';
import { COMMON_ERROR } from './../../utils/globalConstants';

export const fetchLobData = createAsyncThunk(
  'lob/fetchLobData',
  async ({ isAll, status }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(apiUrls.getLob, {
        params: { isAll: isAll, status: status },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue([]);
    }
  }
);

export const updateLobData = createAsyncThunk(
  'lob/updateLobData',
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(apiUrls.getLob, data);
      toast.success(response?.data?.message || 'LOB updated successfully');
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error?.message || COMMON_ERROR);
      return rejectWithValue(error?.response?.data || {});
    }
  }
);

const lobSlice = createSlice({
  name: 'lob',
  initialState: {
    allLob: [],
    lobLoading: false,
    updateLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get All Lob reducers
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
      })
      // Update Lob reducers
      .addCase(updateLobData.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(updateLobData.fulfilled, (state, action) => {
        state.updateLoading = false;
      })
      .addCase(updateLobData.rejected, (state) => {
        state.updateLoading = false;
      });
  },
});

export default lobSlice.reducer;
