import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

export const fetchLoginDetails = createAsyncThunk(
  "loginSlice/fetchLoginDetails",
  async (payload, { getState, rejectWithValue }) => {
    try {
      let url = "/api/login";
      const response = await axiosInstance.post(url, payload);
      return response;
    } catch (error) {
      console.error(error);
      return rejectWithValue("");
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    userDetails: [],
    loading: true,
    error: "",
  },
  reducers: {
    setLoginError: (state, action) => {
      state.error = action.payload;
    },
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
        state.error = action.error.message;
      });
  },
});

export const { setLoginError } = loginSlice.actions;
export default loginSlice.reducer;
