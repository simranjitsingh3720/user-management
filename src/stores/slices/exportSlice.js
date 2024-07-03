import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./../../utils/axiosInstance";
import dayjs from "dayjs";
import { API_END_POINTS } from "../../features/ExportDropdown/utils/constants";

const initialState = {
  selectedValue: "",
  fromDate: null,
  toDate: null,
  columns: [],
  loading: false,
  error: null,
};

export const fetchColumns = createAsyncThunk(
  "export/fetchColumns",
  async (tableName, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `${API_END_POINTS.getColumns}${tableName}`
      );
      const columns = response.data.data.map((col) => ({
        id: col,
        name: col,
        checked: false,
      }));
      return columns;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const downloadData = createAsyncThunk(
  "export/downloadData",
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`${API_END_POINTS.downloadFile}`, {
        params: {
          tableName: payload.tableName,
          past30Days: payload.past30Days,
          isBulkDownload: payload.isBulkDownload,
          email: payload.email,
          columns: payload.columns,
          startDate: payload.startDate,
          endDate: payload.endDate,
        },
      });
      return response.data.data.url;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const exportSlice = createSlice({
  name: "export",
  initialState,
  reducers: {
    setSelectedValue: (state, action) => {
      state.selectedValue = action.payload;
    },
    setFromDate: (state, action) => {
      state.fromDate = dayjs(action.payload).format("DD-MM-YYYY");
    },
    setToDate: (state, action) => {
      state.toDate = dayjs(action.payload).format("DD-MM-YYYY");
    },
    setLast30Days: (state) => {
      state.fromDate = dayjs().subtract(30, "day").format("DD-MM-YYYY");
      state.toDate = dayjs().format("DD-MM-YYYY");
    },
    toggleColumn: (state, action) => {
      const columnIndex = state.columns.findIndex(
        (col) => col.id === action.payload
      );
      if (columnIndex !== -1) {
        state.columns[columnIndex].checked =
          !state.columns[columnIndex].checked;
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
        debugger
        window.open(action.payload, '_blank');
        alert("Download successful!");
      })
      .addCase(downloadData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        debugger
        alert("Download failed: " + action.payload.message);
      });
  },
});

export const {
  setSelectedValue,
  setFromDate,
  setToDate,
  setLast30Days,
  toggleColumn,
} = exportSlice.actions;
export default exportSlice.reducer;
