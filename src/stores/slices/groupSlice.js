import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from './../../utils/axiosInstance';
import apiUrls from './../../utils/apiUrls';
import { buildParams } from './../../utils/buildParams';
import { addAsyncReducers } from './../../utils/addAsyncReducers';
import toastifyUtils from '../../utils/toastify';

export const getGroup = createAsyncThunk(
  'group/getGroup',
  async (
    { isAll, page, pageSize, order, orderBy, lobId, childFieldsToFetch, ids, edge, searchKey, searchString, status } = {},
    { rejectWithValue }
  ) => {
    try {
      const params = buildParams({
        isAll,
        page,
        pageSize,
        order,
        orderBy,
        lobId,
        childFieldsToFetch,
        ids,
        edge,
        searchKey,
        searchString,
        status
      });
      const response = await axiosInstance.get(apiUrls.getGroup, { params });
      return response.data;
    } catch (error) {

      return rejectWithValue([]);
    }
  }
);

export const getGroupById = createAsyncThunk('group/getGroupById', async ({ id } = {}, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(apiUrls.getGroup + `/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue([]);
  }
});

export const updateGroup = createAsyncThunk('group/updateGroup', async ({ data, groupData, handleGroupStatus }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.put(apiUrls.getGroup, data);
    toastifyUtils.notifySuccess(response?.data?.message || 'Group updated successfully');
    if(handleGroupStatus) {
      handleGroupStatus(data.id, groupData);
    }
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data || {});
  }
});

export const createGroup = createAsyncThunk('group/createGroup', async ({ data, navigate }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(apiUrls.getGroup, data);
    toastifyUtils.notifySuccess(response?.data?.message || 'Group created successfully');
    navigate('/group');
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data || {});
  }
});

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
