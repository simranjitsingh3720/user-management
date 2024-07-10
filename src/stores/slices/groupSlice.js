import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axiosInstance from './../../utils/axiosInstance';
import apiUrls from './../../utils/apiUrls';
import { COMMON_ERROR } from './../../utils/globalConstants';
import { buildParams } from './../../utils/buildParams';
import { addAsyncReducers } from './../../utils/addAsyncReducers';

export const getGroup = createAsyncThunk(
  'group/getGroup',
  async ({ isAll, page, pageSize, order, orderBy, lobId, childFieldsToFetch, ids, edge } = {}, { rejectWithValue }) => {
    try {
      const params = buildParams({ isAll, page, pageSize, order, orderBy, lobId, childFieldsToFetch, ids, edge });
      const response = await axiosInstance.get(apiUrls.getGroup, { params });
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error?.message || COMMON_ERROR);
      return rejectWithValue([]);
    }
  }
);

export const getGroupById = createAsyncThunk(
  'group/getGroupById',
  async ({ id } = {}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(apiUrls.getGroup + `/${id}`);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error?.message || COMMON_ERROR);
      return rejectWithValue([]);
    }
  }
);

export const updateGroup = createAsyncThunk(
  'group/updateGroup',
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(apiUrls.getGroup, data);
      toast.success(response?.data?.message || 'Group updated successfully');
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error?.message || COMMON_ERROR);
      return rejectWithValue(error?.response?.data || {});
    }
  }
);

export const createGroup = createAsyncThunk(
  'group/createGroup',
  async ({ data, navigate }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(apiUrls.getGroup, data);
      toast.success(response?.data?.message || 'Group created successfully');
      navigate("/group");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.error?.message || COMMON_ERROR);
      return rejectWithValue(error?.response?.data || {});
    }
  }
);

const initialState = {
  group: [],
  groupPermission: [],
  groupPermissionLoading: false,
  groupLoading: false,
  updateLoading: false,
  createLoading: false,
};

const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    clearGroup: (state) => {
      state.group = [];
    },
  },
  extraReducers: (builder) => {
    addAsyncReducers(builder, [
      { asyncThunk: getGroup, stateKey: 'group' },
      { asyncThunk: getGroupById, stateKey: 'groupPermission' },
      { asyncThunk: updateGroup, stateKey: 'update' },
      { asyncThunk: createGroup, stateKey: 'create' },
    ]);
  },
});

export const { clearGroup } = groupSlice.actions;
export default groupSlice.reducer;
