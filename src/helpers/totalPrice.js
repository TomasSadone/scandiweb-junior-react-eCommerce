export const totalPriceDisplay = (currency, cart) => {
  const symbol = cart.cartItems.map((cartItem) => {
    return cartItem.prices.find(
      (price) => price.currency.symbol === currency.selectedCurrency
    );
  });
  const total = cart.cartItems.reduce((currentTotal, item) => {
    const price = item.prices.find(
      (price) => price.currency.symbol === symbol[0]?.currency.symbol
    );
    return price.amount * item.quantity + currentTotal;
  }, 0);
  const roundTotal = () => Math.ceil(total * 100) / 100;
  return roundTotal();
};
