import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isRefresh: false,
  isLoading: false,
  isOpenPreviewPDF: false,
  isOpenModalTask: false,
  isEditTask: false,
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setRefresh: (state) => {
      state.isRefresh = !state.isRefresh;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setOpenPreviewPDF: (state, action) => {
      state.isOpenPreviewPDF = action.payload;
    },
    setOpenModalTask: (state, action) => {
      state.isOpenModalTask = action.payload;
    },
    setEditTask: (state, action) => {
      state.isEditTask = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setLoading,
  setOpenPreviewPDF,
  setOpenModalTask,
  setRefresh,
  setEditTask,
} = commonSlice.actions;

export default commonSlice.reducer;
