import React, { Component } from "react";
import { connect } from "react-redux";
import { getData } from "../helpers/getData";
import arrow from "../icons/arrow.svg";
import { changeCurrency } from "../slices/currencySelectorSlice";

class CurrencySelector extends Component {
  constructor(props) {
    super(props);

    this.dropDownMenu = React.createRef();
    this.dropDownButton = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.state = {
      currencies: [
        /*
                currencies object example: 
                {
                    "label": "USD",
                    "symbol": "$"
                },...
                */
      ],
      isOpen: false,
    };
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    getData(`
            query {
                currencies{
                  label
                  symbol
                }
            }
        `).then((data) => {
      this.setState((state) => ({
        ...state,
        currencies: data.currencies,
        currentCurrency:
          localStorage.getItem("selectedCurrency") || data.currencies[0].symbol,
      }));

      this.props.changeCurrency(
        localStorage.getItem("selectedCurrency") || data.currencies[0].symbol
      );
    });
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (
      !this.dropDownButton.current.contains(event.target) &&
      !this.dropDownMenu.current.contains(event.target)
    ) {
      this.setState((state) => ({
        ...state,
        isOpen: false,
      }));
    }
  }

  handleCurrencyChange = ({ target }) => {
    localStorage.setItem("selectedCurrency", `${target.id}`);
    this.setState((state) => ({
      ...state,
      currentCurrency: target.id,
    }));
    this.props.changeCurrency(target.id);
  };
  render() {
    const { isOpen, currentCurrency } = this.state;
    const { currencies } = this.state;

    const setIsOpen = () => {
      this.setState((state) => ({
        ...state,
        isOpen: !isOpen,
      }));
    };

    return (
      <>
        <li className="dropdown dropdown-currency-selector">
          <div
            className="dropdown-button"
            onClick={setIsOpen}
            ref={this.dropDownButton}
          >
            <a href="#">{currentCurrency}</a>
            <img
              className={`${isOpen && "dropdown-button-isOpen"}`}
              id="arrow"
              src={arrow}
              alt="arrow"
            />
          </div>

          <div
            ref={this.dropDownMenu}
            className={`dropdown-menu dropdown-menu-currency-selector ${
              isOpen && "dropdown-menu-isOpen"
            }`}
          >
            {currencies.map((currency) => (
              <div
                key={currency.symbol}
                id={currency.symbol}
                onClick={this.handleCurrencyChange}
                className={`dropdown-element ${
                  isOpen && "dropdown-element-isOpen"
                }
                ${
                  currency.symbol === currentCurrency &&
                  "dropdown-element-isOpen-selected"
                }
                `}
              >
                {`${currency.symbol} ${currency.label}`}
              </div>
            ))}
          </div>
        </li>
      </>
    );
  }
}

const mapDispatchToProps = () => {
  return {
    changeCurrency,
  };
};

export default connect(null, mapDispatchToProps())(CurrencySelector);
