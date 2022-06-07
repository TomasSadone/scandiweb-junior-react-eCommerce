import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

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

PriceDisplay.propTypes = {
  currency: PropTypes.shape({
    selectedCurrency: PropTypes.string,
  }),
  prices: PropTypes.arrayOf(PropTypes.object),
  className: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    currency: state.currency,
  };
};
export default connect(mapStateToProps)(PriceDisplay);
