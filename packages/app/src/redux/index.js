import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import itemSlice from "./slices/itemSlice";

export default configureStore({
    reducer: {
        users: userSlice,
        items: itemSlice
    }
})