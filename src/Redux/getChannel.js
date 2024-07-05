import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance"

export const getChannels = createAsyncThunk("channelType/getChannels", async (_, { getState, rejectWithValue }) => {
    try {
        // const { lobUserCreation } = getState();
        // if (lobUserCreation?.lob?.length > 0) {
        //     return lobUserCreation.lob; 
        // }

        let url = `/api/channel?isAll=${true}&status=true`;
        const response = await axiosInstance.get(url);
        const formattedArray = response?.data?.data?.map(obj => ({
            ...obj,
            label: obj?.channelName?.charAt(0)?.toUpperCase() + obj?.channelName?.slice(1),
            value: obj?.channelName,
        }));
        return formattedArray;
    }
    catch (error) {
        console.error(error);
        return rejectWithValue([]);
    }
});

export const channelType = createSlice({
    name: 'channelType',
    initialState: {
        channelType: [],
        loading: true,
        error: ''
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getChannels.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getChannels.fulfilled, (state, action) => {
                state.channelType = action.payload;
                state.loading = false;
            })
            .addCase(getChannels.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.channelType = [];
            });
    },
})

export default channelType.reducer;