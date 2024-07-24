import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from './../../utils/axiosInstance';
import dayjs from 'dayjs';
import { API_END_POINTS } from '../../features/ExportDropdown/utils/constants';
import { toast } from 'react-toastify';
import { DATE_FORMAT } from '../../utils/globalConstants';
import toastifyUtils from '../../utils/toastify';

// Initial state
const initialState = {
  selectedValue: '',
  fromDate: null,
  toDate: null,
  columns: [],
  loading: false,
  error: null,
  tableName: '',
  extraColumns: [],
};

// Fetch columns based on the table name
export const fetchColumns = createAsyncThunk('export/fetchColumns', async (tableName, thunkAPI) => {
  try {
    const response = await axiosInstance.get(`${API_END_POINTS.getColumns}${tableName}`);
    const columns = response.data.data.map((col) => ({
      id: col,
      name: col,
      checked: false,
    }));
    return columns;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Download data with selected columns and additional columns
export const downloadData = createAsyncThunk('export/downloadData', async (payload, thunkAPI) => {
  try {
    const { tableName, past30Days, isBulkDownload, email, columns, startDate, endDate, additionalColumns } = payload;
    const response = await axiosInstance.get(`${API_END_POINTS.downloadFile}`, {
      params: {
        tableName: tableName,
        past30Days: past30Days,
        isBulkDownload: isBulkDownload,
        email: email,
        columns: columns,
        startDate: startDate,
        endDate: endDate,
        // additionalColumns: additionalColumns,
      },
    });

    if(response) {
      toastifyUtils.notifySuccess(response.data.message);
    }
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Slice
const exportSlice = createSlice({
  name: 'export',
  initialState,
  reducers: {
    setSelectedValue: (state, action) => {
      state.selectedValue = action.payload;
    },
    setExtraColumns: (state, action) => {
      const columns = action.payload.map((col) => ({
        id: col,
        name: col,
        checked: false,
      }));
      state.extraColumns = columns;
    },
    setTableName: (state, action) => {
      state.tableName = action.payload;
    },
    setFromDate: (state, action) => {
      state.fromDate = dayjs(action.payload).format(DATE_FORMAT);
    },
    setToDate: (state, action) => {
      state.toDate = dayjs(action.payload).format(DATE_FORMAT);
    },
    setLast30Days: (state) => {
      state.fromDate = dayjs().subtract(30, 'day').format(DATE_FORMAT);
      state.toDate = dayjs().format(DATE_FORMAT);
    },
    toggleColumn: (state, action) => {
      const { id, isAdditional } = action.payload;
      if (isAdditional) {
        const columnIndex = state.extraColumns.findIndex((col) => col.id === id);
        if (columnIndex !== -1) {
          state.extraColumns[columnIndex].checked = !state.extraColumns[columnIndex].checked;
        }
      } else {
        const columnIndex = state.columns.findIndex((col) => col.id === id);
        if (columnIndex !== -1) {
          state.columns[columnIndex].checked = !state.columns[columnIndex].checked;
        }
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
      })
      .addCase(downloadData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(downloadData.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(downloadData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error('Download Failed: ' + action.payload.details);
      });
  },
});

// Export actions and reducer
export const {
  setSelectedValue,
  setFromDate,
  setToDate,
  setLast30Days,
  toggleColumn,
  setTableName,
  setExtraColumns,
} = exportSlice.actions;

export default exportSlice.reducer;
