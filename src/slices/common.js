import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
};

export const commonSlice = createSlice({
    name: "common",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setLoading } = commonSlice.actions;

export default commonSlice.reducer;
