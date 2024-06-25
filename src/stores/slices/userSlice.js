import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./../../utils/axiosInstance";
import { API_END_POINTS } from "./../../utils/constants";

export const fetchUser = createAsyncThunk(
  "lob/fetchUser",
  async ({ userType, searchKey } = {}, { rejectWithValue }) => {
    try {
      const url = userType
        ? `${API_END_POINTS.USERAPI}?searchString=${userType}&searchKey=${searchKey}`
        : `${API_END_POINTS.USERAPI}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue([]);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: [],
    userLoading: false,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.userLoading = false;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.user = [];
        state.userLoading = false;
      });
  },
});

export default userSlice.reducer;
