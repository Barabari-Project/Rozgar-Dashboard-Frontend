// src/redux/store.ts
import { configureStore, Store } from "@reduxjs/toolkit";
import userReducer from "./slices/UserSlice";
import statusReducer from "./slices/StatusSlice";

const store: Store = configureStore({
    reducer: {
        user: userReducer,
        status: statusReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
