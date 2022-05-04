import { configureStore } from "@reduxjs/toolkit";
import currencySelectorReducer from '../slices/currencySelectorSlice'

const initialState = {
    selectedCurrency: localStorage.getItem('selectedCurrency') || ''
  };

export const store = configureStore({
  reducer: {
    currency: currencySelectorReducer,
  },
  initialState
});
