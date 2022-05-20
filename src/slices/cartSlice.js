import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  overlayOpen: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addNewProduct: (state, action) => {
      state.cartItems.push(action.payload);
    },
    addItem: (state, { payload }) => {
      const item = state.cartItems.find(
        (cartItem) =>
          JSON.stringify(cartItem.selectedOptions) ===
            JSON.stringify(payload.selectedOptions) &&
          cartItem.productId === payload.productId
      );
      item.quantity = item.quantity + 1;
    },
    removeItem: (state, { payload }) => {
      const item = state.cartItems.find(
        (cartItem) =>
          JSON.stringify(cartItem.selectedOptions) ===
            JSON.stringify(payload.selectedOptions) &&
          cartItem.productId === payload.productId
      );
      item.quantity = item.quantity - 1;
    },
    removeProduct: (state, { payload }) => {
      const newCartItems = state.cartItems.filter(
        (cartItem) =>
          JSON.stringify(cartItem.selectedOptions) !==
            JSON.stringify(payload.selectedOptions) ||
          cartItem.productId !== payload.productId
      );
      state.cartItems = newCartItems;
    },
    toggleOverlay: (state, { payload }) => {
      state.overlayOpen = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addNewProduct,
  addItem,
  removeItem,
  removeProduct,
  toggleOverlay,
} = cartSlice.actions;

export default cartSlice.reducer;
