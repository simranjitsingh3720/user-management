import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance"

export const getLocations = createAsyncThunk("location/getLocations", async () => {
    try {
        let url = `/api/location?isAll=${true}`;
        const response = await axiosInstance.get(url);
        const formattedArray = response?.data?.data?.map(obj => ({
            label: obj.locationName.charAt(0).toUpperCase() + obj.locationName.slice(1),
            value: obj.locationName
        }));
        return formattedArray;
    }
    catch (error) {
        console.log("error in fetching location");
    }
});

export const location = createSlice({
    name: 'location',
    initialState: {
        location: [],
        loading: true,
        error: ''
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getLocations.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getLocations.fulfilled, (state, action) => {
                state.location = action.payload;
                state.loading = false;
            })
            .addCase(getLocations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
})

export default location.reducer;