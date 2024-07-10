import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance"
import apiUrls from "../utils/apiUrls";

export const getLoginType = createAsyncThunk("loginType/getLoginType", async (_, { getState, rejectWithValue }) => {
    try {
        const { loginType } = getState();
        if (loginType?.loginType?.length > 0) {
            return loginType.loginType; 
        }
        const url = `${apiUrls.getLoginType}?isAll=${true}&status=true`;
        const response = await axiosInstance.get(url);
        const formattedArray = response?.data?.data?.map((obj) => ({
            ...obj,
            label: obj?.loginType?.charAt(0)?.toUpperCase() + obj?.loginType?.slice(1),
            value: obj?.loginType,
          }));
        return formattedArray;
    }
    catch (error) {
        console.error(error)
        return rejectWithValue([]);
    }
});

export const loginType = createSlice({
    name: 'loginType',
    initialState: {
        loginType: [],
        loading: true,
        error: ''
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getLoginType.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getLoginType.fulfilled, (state, action) => {
                state.loginType = action.payload;
                state.loading = false;
            })
            .addCase(getLoginType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.loginType = [];
            });
    },
})

export default loginType.reducer;