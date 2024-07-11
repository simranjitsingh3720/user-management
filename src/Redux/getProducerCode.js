import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosInstance';
import apiUrls from '../utils/apiUrls';
import { getFullName } from '../utils/globalizationFunction';

export const getProducerCodes = createAsyncThunk(
  'producerCode/getProducerCodes',
  async (roleName, { rejectWithValue }) => {
    try {
      if (roleName) {
        const userType = `${apiUrls.getUserType}?searchKey=userType&searchString=producer&status=true`;
        const responseUserType = await axiosInstance.get(userType);
        const userTypeID = responseUserType?.data?.data[0]?.id;
        const url = `${apiUrls.getUser}?ids=${userTypeID}&edge=hasUserType&isExclusive=true`;
        const response = await axiosInstance.get(url);
        const formattedArray = response?.data?.data?.map((obj) => ({
          ...obj,
          label: obj?.producerCode + ' - ' + getFullName(obj?.firstName, obj?.lastName),
          value: obj?.producerCode,
        }));
        return formattedArray;
      }
    } catch (error) {
      console.error(error);
      return rejectWithValue([]);
    }
  }
);

export const producerCode = createSlice({
  name: 'producerCode',
  initialState: {
    producerCode: [],
    loading: true,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducerCodes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducerCodes.fulfilled, (state, action) => {
        state.producerCode = action.payload;
        state.loading = false;
      })
      .addCase(getProducerCodes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.producerCode = [];
      });
  },
});

export default producerCode.reducer;
