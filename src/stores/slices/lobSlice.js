import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "./../../utils/axiosInstance";
import apiUrls from "./../../utils/apiUrls";
import { addAsyncReducers } from "../../utils/addAsyncReducers";

export const fetchLobData = createAsyncThunk(
  "lob/fetchLobData",
  async (
    { isAll, page, pageSize, order, orderBy, status },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(apiUrls.getLob, {
        params: {
          isAll,
          pageNo: page,
          pageSize: pageSize,
          sortOrder: order,
          sortKey: orderBy,
          status: status,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue([]);
    }
  }
);

export const updateLobData = createAsyncThunk(
  "lob/updateLobData",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(apiUrls.getLob, data);
      toast.success(response?.data?.message || "LOB updated successfully");
      return response.data;
    } catch (error) {
      console.error("Error", error);
      return rejectWithValue(error?.response?.data || {});
    }
  }
);

export const createLobData = createAsyncThunk(
  "lob/createLobData",
  async ({ data, navigate }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(apiUrls.getLob, data);
      toast.success(response?.data?.message || "LOB created successfully");
      navigate("/lob");
      return response.data;
    } catch (error) {
      console.error("Error", error);
      return rejectWithValue(error?.response?.data || {});
    }
  }
);

const lobSlice = createSlice({
  name: "lob",
  initialState: {
    lob: [],
    lobLoading: false,
    updateLoading: false,
    createLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    addAsyncReducers(builder, [
      { asyncThunk: fetchLobData, stateKey: "lob" },
      { asyncThunk: updateLobData, stateKey: "update" },
      { asyncThunk: createLobData, stateKey: "create" },
    ]);
  },
});

export default lobSlice.reducer;
