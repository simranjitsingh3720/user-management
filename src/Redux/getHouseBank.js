import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance"

export const getHouseBanks = createAsyncThunk("houseBank/getHouseBanks", async (_, { getState, rejectWithValue }) => {
    try {
        // const { lobUserCreation } = getState();
        // if (lobUserCreation?.lob?.length > 0) {
        //     return lobUserCreation.lob; 
        // }

        let url = `/api/house-bank?isAll=${true}`;
        const response = await axiosInstance.get(url);
        const formattedArray = response?.data?.data?.map(obj => ({
            ...obj,
            label: obj?.houseBankCode,
            value: obj?.id,
        }));
        return formattedArray;
    }
    catch (error) {
        console.error(error);
        return rejectWithValue([]);
    }
});

export const houseBank = createSlice({
    name: 'houseBank',
    initialState: {
        houseBank: [],
        loading: true,
        error: ''
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getHouseBanks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getHouseBanks.fulfilled, (state, action) => {
                state.houseBank = action.payload;
                state.loading = false;
            })
            .addCase(getHouseBanks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.houseBank = [];
            });
    },
})

export default houseBank.reducer;