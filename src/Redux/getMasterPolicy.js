import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { masterPolicy2, masterPolicyNA, masterpolicy1 } from '../utils/masterPolicy';

export const getMasterPolicies = createAsyncThunk(
  'masterPolicy/getMasterPolicies',
  async (name, { getState, rejectWithValue }) => {
    let formattedArray;
    if (name === 'groupbusinesstravelaccident') {
      formattedArray = masterPolicyNA;
    } else if (name === 'smallbusinesstravelguard') {
      formattedArray = masterpolicy1;
    } else if (name === 'both') {
      formattedArray = masterpolicy1;
    } else {
      formattedArray = masterPolicy2;
    }
    return formattedArray;
  }
);

export const clearMasterPolicy = createAction('masterPolicy/clearMasterPolicy');

export const masterPolicy = createSlice({
  name: 'masterPolicy',
  initialState: {
    masterPolicy: [],
    loading: true,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(clearMasterPolicy, (state) => {
        state.masterPolicy = [];
      })
      .addCase(getMasterPolicies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMasterPolicies.fulfilled, (state, action) => {
        state.masterPolicy = action.payload;
        state.loading = false;
      })
      .addCase(getMasterPolicies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.masterPolicy = [];
      });
  },
});

export default masterPolicy.reducer;
