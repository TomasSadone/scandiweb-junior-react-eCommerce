import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: '',
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setInitialCategory: (state, { payload }) => {
      state.category = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setInitialCategory } = categorySlice.actions;

export default categorySlice.reducer;
