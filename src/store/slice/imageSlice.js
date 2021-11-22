import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  isFetching: false,
  errorMessage: null,
};

const imageSlice = createSlice({
  name: "image",
  initialState: initialState,
  reducers: {
    setImage: (state, { payload }) => {
      state.list.push(payload);
    },
    deleteImage: (state, { payload }) => {
      state.list = state.list.filter((src) => src !== payload);
    },
  },
});
export const { setImage, deleteImage } = imageSlice.actions;

export default imageSlice;
