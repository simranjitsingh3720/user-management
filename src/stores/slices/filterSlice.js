// filterSlice.js
import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const initialState = {
  selectedValue: 'bulk',
  fromDate: null,
  toDate: null,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSelectedValue: (state, action) => {
      state.selectedValue = action.payload;
    },
    setFromDate: (state, action) => {
      state.fromDate = dayjs(action.payload).format("DD-MM-YYYY");;
    },
    setToDate: (state, action) => {
      state.toDate = dayjs(action.payload).format("DD-MM-YYYY");;
    },
    setLast30Days: (state) => {
      state.fromDate = dayjs().subtract(30, 'day').toDate();
      state.toDate = dayjs().toDate();
    },
  },
});

export const { setSelectedValue, setFromDate, setToDate, setLast30Days } = filterSlice.actions;
export default filterSlice.reducer;
