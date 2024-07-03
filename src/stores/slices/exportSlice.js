import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "./../../utils/axiosInstance"
import dayjs from 'dayjs';

const initialState = {
  selectedValue: '',
  fromDate: null,
  toDate: null,
  columns: [],
  loading: false,
  error: null,
};

export const fetchColumns = createAsyncThunk(
  'export/fetchColumns',
  async (tableName, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/api/file/columns?tableName=${tableName}`);
      const columns = response.data.data.map((col) => ({ id: col, name: col, checked: false }));
      return columns;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const exportSlice = createSlice({
  name: 'export',
  initialState,
  reducers: {
    setSelectedValue: (state, action) => {
      state.selectedValue = action.payload;
    },
    setFromDate: (state, action) => {
      state.fromDate = dayjs(action.payload).format('DD-MM-YYYY');
    },
    setToDate: (state, action) => {
      state.toDate = dayjs(action.payload).format('DD-MM-YYYY');
    },
    setLast30Days: (state) => {
      state.fromDate = dayjs().subtract(30, 'day').format('DD-MM-YYYY');
      state.toDate = dayjs().format('DD-MM-YYYY');
    },
    toggleColumn: (state, action) => {
      const columnIndex = state.columns.findIndex(col => col.id === action.payload);
      if (columnIndex !== -1) {
        state.columns[columnIndex].checked = !state.columns[columnIndex].checked;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchColumns.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchColumns.fulfilled, (state, action) => {
        state.loading = false;
        const columns = action.payload.map((item) => ({
          ...item,
          checked: false,
        }));
        state.columns = columns;
      })
      .addCase(fetchColumns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedValue, setFromDate, setToDate, setLast30Days, toggleColumn } = exportSlice.actions;
export default exportSlice.reducer;
