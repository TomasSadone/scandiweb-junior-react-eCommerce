import React, { Component } from "react";
import { connect } from "react-redux";

class PriceDisplay extends Component {
  render() {
    const { currency, prices, className } = this.props;
    const priceToDisplay = prices.find(
      (price) => price.currency.symbol === currency.selectedCurrency
    );
    return (
      <p className={className}>
        {priceToDisplay.currency.symbol + priceToDisplay.amount}
      </p>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currency: state.currency,
  };
};
export default connect(mapStateToProps)(PriceDisplay);
