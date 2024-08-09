import { createSlice } from "@reduxjs/toolkit";

const dialogSlice = createSlice({
  name: "dialog",
  initialState: {
    open: false,
    title: "",
    content: null,
    actions: null,
    size: "sm"
  },
  reducers: {
    showDialog: (state, action) => {
      state.open = true;
      state.title = action.payload.title || "";
      state.content = action.payload.content || null;
      state.actions = action.payload.actions || null;
      state.size = action.payload.size || "sm";
    },
    hideDialog: (state) => {
      state.open = false;
      state.title = "";
      state.content = null;
      state.actions = null;
    },
  },
});

export const { showDialog, hideDialog } = dialogSlice.actions;
export default dialogSlice.reducer;
