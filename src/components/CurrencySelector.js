import React, { Component } from "react";
import { connect } from "react-redux";
import arrow from "../icons/arrow.svg";
import { changeCurrency } from "../slices/currencySelectorSlice";

class CurrencySelector extends Component {
  constructor(props) {
    super(props);
    const { currencies } = this.props;
    this.dropDownMenu = React.createRef();
    this.dropDownButton = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
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
      currentCurrency:
        localStorage.getItem("selectedCurrency") || currencies[0].symbol,
    };
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
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

  render() {
    const { isOpen, currentCurrency } = this.state;
    const { currencies } = this.props;

    const handleCurrencyChange = ({ target }) => {
      localStorage.setItem("selectedCurrency", `${target.id}`);
      this.setState((state) => ({
        ...state,
        currentCurrency: target.id,
      }));
      this.props.changeCurrency(target.id);
    };
    const setIsOpen = () => {
      !isOpen
        ? this.setState((state) => ({
            ...state,
            isOpen: true,
          }))
        : this.setState((state) => ({
            ...state,
            isOpen: false,
          }));
    };

    return (
      <>
        <li className="dropdown">
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
            className={`dropdown-menu ${isOpen && "dropdown-menu-isOpen"}`}
            id="div"
          >
            {currencies.map((currency) => (
              <div
                key={currency.symbol}
                id={currency.symbol}
                onClick={handleCurrencyChange}
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
