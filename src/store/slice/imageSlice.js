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
    changeIdx: (state, { payload }) => {
      state.list.splice(payload.originIdx, 1, payload.dropedSrc);
      state.list.splice(payload.dropedIdx, 1, payload.originSrc);
    },
  },
});
export const { setImage, deleteImage, changeIdx } = imageSlice.actions;

export default imageSlice;
