export const displayPrice = (prices) => {
  if (!localStorage.getItem("selectedCurrency")) {
    return prices[0].currency.symbol + prices[0].amount;
  } else {
    const getCurrency = prices.find(
      (price) =>
        price.currency.symbol === localStorage.getItem("selectedCurrency")
    );
    return getCurrency.currency.symbol + getCurrency.amount;
  }
};
//yo quiero redux para que aca setee un state, y que cuando ese state se modifica lo agarre produt card (y cualquier lugar donde se muestre el precio)
// que agarren ese valor del store y modifiquen su store local, para disparar un re renderizado. tambien hay que usarlo para setear el valor activo del select,
//porque si no cuando queremos cambiar a usd no cambia, y no modifica nada
//
// hacer un componente que muestre el precio asi solo se re renderiza eso
//y no toda la tarjeta o lo que sea
// en el componente hacer algo asi como si la lenght del string > 1 que use eso y si no busque en localstorage
// la lenght de la selected en el state