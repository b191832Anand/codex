import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./slices/blog";
import authReducer from "./slices/auth";
import resumeReducer from "./slices/resume";
import messageReducer from "./slices/message";
export const store = configureStore({
    reducer: {
        blogs: blogReducer,
        user: authReducer,
        resumes: resumeReducer,
        messages: messageReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
