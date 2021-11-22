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
      state.list.pop(payload);
    },
  },
});
export const {} = imageSlice.actions;

export default imageSlice;
