import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import apiUrls from '../../utils/apiUrls';
import { buildQueryString, getFullName } from '../../utils/globalizationFunction';
import errorHandler from '../../utils/errorHandler';
import { COMMON_WORDS } from '../../utils/constants';

export const getProducerCodes = createAsyncThunk(
  'producerCode/getProducerCodes',
  async (roleName, { rejectWithValue }) => {
    try {
      if (roleName) {
        const params = buildQueryString({ searchKey: COMMON_WORDS.USER_TYPE, searchString: COMMON_WORDS.EXTERNAL, status: true, isAll: true });
        const userType = `${apiUrls.getUserType}?${params}`;
        const responseUserType = await axiosInstance.get(userType);
        const userTypeID = responseUserType?.data?.data[0]?.id;
        if (userTypeID) {
          const userIdParams = buildQueryString({
            ids: userTypeID,
            edge: COMMON_WORDS.HAS_USER_TYPE,
            isExclusive: true,
            status: true,
          });
          const url = `${apiUrls.getUser}?${userIdParams}`;
          const response = await axiosInstance.get(url);
          const formattedArray = response?.data?.data?.map((obj) => ({
            ...obj,
            label: getFullName(obj?.firstName, obj?.lastName) + ' - ' + obj?.producerCode,
            value: obj?.id,
          }));
          return formattedArray;
        }
      }
    } catch (error) {
      errorHandler.handleError(error)
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
