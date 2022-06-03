import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { getData } from "../helpers/getData";
import logo from "../icons/a-logo.svg";
import CurrencySelector from "./CurrencySelector";
import { setInitialCategory } from "../slices/categorySlice";
import { connect } from "react-redux";
import CartOverlay from "./CartOverlay";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    getData(`
            query {
                categories{
                    name
                }
            }
        `).then((data) => {
      this.props.setInitialCategory(data.categories[0].name);
      this.setState({
        categories: data.categories,
      });
    });
  }

  classIsActive = (isActive) => {
    if(isActive) return "active"
  }

  renderCategories = (category) => {
    return (
      <NavLink
        className={`btn-navbar ${({isActive}) => this.classIsActive(isActive)}`}
        key={category.name}
        to={`/${category.name}`}
      >
        {category.name.toUpperCase()}
      </NavLink>
    );
  };
  render() {
    const { categories } = this.state;
    return (
      <nav>
        <div className="container">
          <div className="navbar">
            <div className="navbar-categories-container">
              {categories.map(this.renderCategories)}
            </div>
            <div>
              <img id="logo" src={logo} alt="Logo" />
            </div>
            <div id="divisaycarro">
              <CurrencySelector />
              <CartOverlay />
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

const mapDispatchToProps = () => {
  return {
    setInitialCategory,
  };
};

export default connect(null, mapDispatchToProps())(Navbar);
