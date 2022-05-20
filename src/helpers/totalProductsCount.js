export const totalProductsCount = (cart) =>
  cart.cartItems.reduce((currentTotal, item) => {
    return item.quantity + currentTotal;
  }, 0);