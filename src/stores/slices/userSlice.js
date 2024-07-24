import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./../../utils/axiosInstance";
import apiUrls from "../../utils/apiUrls";

export const fetchUser = createAsyncThunk(
  "lob/fetchUser",
  async ({ userType, searchKey, status, isAll } = {}, { rejectWithValue }) => {
    try {
      let url = userType
        ? `${apiUrls.getUser}?searchString=${userType}&searchKey=${searchKey}`
        : `${apiUrls.getUser}`;

      
      if(isAll) {
        url = `${url}&isAll=${isAll}`;
      }

      if(status) {
        url = `${url}&status=${status}`;
      }
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
