import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance"

export const getRoles = createAsyncThunk("role/getRoles", async (_, { getState, rejectWithValue }) => {
    try {
        const { role } = getState();
        if (role?.role?.length > 0) {
            return role.role; // Return existing data
        }

        let url = `/api/role?isAll=${true}`;
        const response = await axiosInstance.get(url);
        const formattedArray = response?.data?.data?.map(obj => ({
            ...obj,
            label: obj?.roleName?.charAt(0)?.toUpperCase() + obj?.roleName?.slice(1)
        }));
        return formattedArray;
    }
    catch (error) {
        console.log("error in fetching role");
        return rejectWithValue([]);
    }
});

export const role = createSlice({
    name: 'role',
    initialState: {
        role: [],
        loading: true,
        error: ''
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRoles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getRoles.fulfilled, (state, action) => {
                state.role = action.payload;
                state.loading = false;
            })
            .addCase(getRoles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
})

export default role.reducer;