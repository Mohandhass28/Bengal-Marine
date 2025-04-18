import { createSlice } from "@reduxjs/toolkit";
import { reducers } from "./reducers";

export type imageObject = {
  id: number;
  image: string;
};

export interface photosAndType {
  Images: imageObject[];
  type: string;
}

const initialState: photosAndType = {
  Images: [],
  type: "",
};

const photosSlice = createSlice({
  name: "photos",
  initialState: initialState,
  reducers: {
    ...reducers,
  },
  extraReducers: (builder) => {},
});

export const { addImage, removeImage, restAll, setType } = photosSlice.actions;
export default photosSlice.reducer;
