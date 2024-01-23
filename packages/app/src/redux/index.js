import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import itemSlice from "./slices/itemSlice";
import questionSlice from "./slices/questionSlice";

export default configureStore({
    reducer: {
        users: userSlice,
        items: itemSlice,
        questions: questionSlice
    }
})