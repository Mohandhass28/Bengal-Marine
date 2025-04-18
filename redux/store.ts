import PhotosReducer from "./containerImages/containerImageSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    photos: PhotosReducer,
  },
});

export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispacher = typeof store.dispatch;
