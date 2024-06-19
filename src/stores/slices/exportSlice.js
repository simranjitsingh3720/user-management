import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const initialState = {
  selectedValue: '',
  fromDate: null,
  toDate: null,
  columns: []
};

const exportSlice = createSlice({
  name: 'export',
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
      state.fromDate = dayjs().subtract(30, 'day').format("DD-MM-YYYY");
      state.toDate = dayjs().format("DD-MM-YYYY");
    },
    setColumns: (state, action) => {
      let columns = action.payload;
      columns = columns.map((item) => item.checked = false)
      state.columns = columns;
    },
    toggleColumn: (state, action) => {
      const columnIndex = state.columns.findIndex(col => col.id === action.payload);
      if (columnIndex !== -1) {
        state.columns[columnIndex].checked = !state.columns[columnIndex].checked;
      }
    },

  },
});

export const { setSelectedValue, setFromDate, setToDate, setLast30Days, setColumns, toggleColumn } = exportSlice.actions;
export default exportSlice.reducer;
