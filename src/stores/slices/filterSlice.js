import { createSlice } from '@reduxjs/toolkit';

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
      state.fromDate = action.payload;
    },
    setToDate: (state, action) => {
      state.toDate = action.payload;
    },
  },
});

export const { setSelectedValue, setFromDate, setToDate } = filterSlice.actions;

export default filterSlice.reducer;
