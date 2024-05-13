import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "./slices/common";

export const store = configureStore({
    reducer: {
        common: commonReducer,
    },
});
