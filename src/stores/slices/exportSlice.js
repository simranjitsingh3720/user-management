import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from './../../utils/axiosInstance';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '../../utils/globalConstants';
import toastifyUtils from '../../utils/toastify';
import apiUrls from '../../utils/apiUrls';
import { splitCamelCase } from '../../utils/globalizationFunction';
import { EXPORT_CONSTANTS, TABLE_LABEL } from '../../utils/constants';

const initialState = {
  selectedValue: '',
  fromDate: null,
  toDate: null,
  columns: [],
  loading: false,
  downloadLoading: false,
  error: null,
  tableName: '',
  extraColumns: [],
};

export const fetchColumns = createAsyncThunk('export/fetchColumns', async ({ tableName, headerValues }, thunkAPI) => {
  try {
    const response = await axiosInstance.get(`${apiUrls.getColumns}${tableName}`);
    const columns = response.data.data.map((col) => {
      
      if (TABLE_LABEL.USER_MANAGEMENT === tableName && (col === EXPORT_CONSTANTS.FIRST_NAME || col === EXPORT_CONSTANTS.LAST_NAME)) {
        return {
          id: col,
          name: splitCamelCase(col),
          checked: true,
        };
      }
      return {
        id: col,
        name: splitCamelCase(col),
        checked: headerValues?.has(col) || false,
      }
    });

    return columns;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const downloadData = createAsyncThunk('export/downloadData', async (payload, thunkAPI) => {
  try {
    const { tableName, past30Days, isBulkDownload, columns, startDate, endDate, additionalColumns } = payload;
    const response = await axiosInstance.get(`${apiUrls.downloadFile}`, {
      params: {
        tableName: tableName,
        past30Days: past30Days,
        isBulkDownload: isBulkDownload,
        columns: columns,
        startDate: startDate,
        endDate: endDate,
        additionalColumns: additionalColumns,
      },
    });

    const { data } = response;

    if (data?.data) {
      const { async, url = '' } = data.data;

      if (async) {
        toastifyUtils.notifySuccess(data.message);
        return;
      }
      
      if(url !== '') {
        const link = document.createElement('a');
        link.href = url;
        document.body.appendChild(link);
        link.click();
        toastifyUtils.notifySuccess('File downloaded successfully');
      } else {
        toastifyUtils.notifyError('File download failed');
      }
    }
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

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
        name: splitCamelCase(col),
        checked: true,
      }));
      state.extraColumns = columns;
    },
    removeExtraColumns: (state) => {
      state.extraColumns = [];
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
        state.columns = action.payload;
      })
      .addCase(fetchColumns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(downloadData.pending, (state) => {
        state.downloadLoading = true;
        state.error = null;
      })
      .addCase(downloadData.fulfilled, (state, action) => {
        state.downloadLoading = false;
      })
      .addCase(downloadData.rejected, (state, action) => {
        state.downloadLoading = false;
        state.error = action.payload;
        toastifyUtils.notifyError('Download Failed: ' + action.payload.details);
      });
  },
});

export const {
  setSelectedValue,
  setFromDate,
  setToDate,
  setLast30Days,
  toggleColumn,
  setTableName,
  setExtraColumns,
  removeExtraColumns,
  loading,
} = exportSlice.actions;

export default exportSlice.reducer;
