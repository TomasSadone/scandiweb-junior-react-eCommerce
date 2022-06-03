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
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.setIsOpen = this.setIsOpen.bind(this);
    this.setIsOpenFalse = this.setIsOpenFalse.bind(this);
    this.state = {
      currencies: [],
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
      }));

      this.props.changeCurrency(
        localStorage.getItem("selectedCurrency") || data.currencies[0].symbol
      );
    });
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  setIsOpenFalse = () => {
    this.setState((state) => ({
      ...state,
      isOpen: false,
    }));
  };

  handleClickOutside(event) {
    if (
      !this.dropDownButton.current.contains(event.target) &&
      !this.dropDownMenu.current.contains(event.target)
    ) {
      this.setIsOpenFalse();
    }
    if (this.dropDownMenu.current.contains(event.target)) {
      this.handleCurrencyChange(event);
      this.setIsOpenFalse();
    }
  }

  handleCurrencyChange = ({ target }) => {
    localStorage.setItem("selectedCurrency", `${target.id}`);
    this.props.changeCurrency(target.id);
  };

  setIsOpen = () => {
    this.setState((state) => ({
      ...state,
      isOpen: !this.state.isOpen,
    }));
  };

  displayCurrency = (currency) => {
    return (
      <div
        key={currency.symbol}
        id={currency.symbol}
        className={`dropdown-element ${this.classNameIsOpen("element")}
        ${this.classNameElementSelected(currency)}
        `}
      >
        {`${currency.symbol} ${currency.label}`}
      </div>
    );
  };

  classNameIsOpen = (text) => {
    if (this.state.isOpen) return `dropdown-${text}-isOpen`;
  };

  classNameElementSelected = (currency) => {
    if (currency.symbol === this.props.currentCurrency)
      return "dropdown-element-isOpen-selected";
  };

  render() {
    const { currencies } = this.state;
    const { currentCurrency } = this.props;
    return (
      <>
        <li className="dropdown dropdown-currency-selector">
          <div
            className="dropdown-button"
            onClick={this.setIsOpen}
            ref={this.dropDownButton}
          >
            <a href="#">{currentCurrency}</a>
            <img
              className={`${this.classNameIsOpen("button")}`}
              id="arrow"
              src={arrow}
              alt="arrow"
            />
          </div>

          <div
            ref={this.dropDownMenu}
            className={`dropdown-menu dropdown-menu-currency-selector ${this.classNameIsOpen(
              "menu"
            )}`}
          >
            {currencies.map(this.displayCurrency)}
          </div>
        </li>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentCurrency: state.currency.selectedCurrency,
  };
};

const mapDispatchToProps = () => {
  return {
    changeCurrency,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(CurrencySelector);
