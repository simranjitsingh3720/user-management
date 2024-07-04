import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

export const fetchLoginDetails = createAsyncThunk(
  "loginSlice/fetchLoginDetails",
  async (payload, { getState, rejectWithValue }) => {
    try {
      let url = "/api/login";
      const response = await axiosInstance.post(url, payload);
      return response?.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data?.error?.message || error.response?.data?.details || "Something went wrong");
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    userDetails: {},
    loading: false,
    error: "",
  },
  reducers: {
    setLoginError: (state, action) => {
      state.error = action.payload;
    },
    setLoginDetails:(state, action) => {
      state.userDetails = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoginDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoginDetails.fulfilled, (state, action) => {
        state.userDetails = action.payload;
        state.loading = false;
      })
      .addCase(fetchLoginDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setLoginError,setLoginDetails } = loginSlice.actions;
export default loginSlice.reducer;
