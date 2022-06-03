import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCurrency: localStorage.getItem("selectedCurrency") || "$",
};

export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    changeCurrency: (state, action) => {
      state.selectedCurrency = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeCurrency } = currencySlice.actions;

export default currencySlice.reducer;
