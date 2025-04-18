import { createAsyncThunk } from "@reduxjs/toolkit";

export const loadProfile = createAsyncThunk(
  "image/addImage",
  async (_, { dispatch }) => {
    try {
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
