import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getPhotos = createAsyncThunk("photos/getPhotos", async () => {
  const response = await fetch("https://picsum.photos/v2/list?page=3&limit=9");
  const formattedResponse = await response.json();
  return formattedResponse;
});

const initialState = {
  photos: [],
  isLoading: false,
};

export const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getPhotos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPhotos.fulfilled, (state, { payload }) => {
        state.photos = payload;
        state.isLoading = false;
      })
      .addCase(getPhotos.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default gallerySlice.reducer;
