import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { getData } from "../helpers/getData";
import logo from "../icons/a-logo.svg";
import CurrencySelector from "./CurrencySelector";

export default class Navbar extends Component {
  //como lo hizo este loco:
  constructor() {
    super();
    //setear un state:
    this.state = {
      categories: [],
      currencies: [{
        symbol: ''
      }]
    };
  }

  componentDidMount() {
    getData(`
            query {
                categories{
                    name
                }
                currencies{
                  label
                  symbol
                }
            }
        `).then((data) => {
      localStorage.setItem("category", `${data.categories[0].name}`);
      this.setState({
        categories: data.categories,
        currencies: data.currencies,
      });
    });
    // const { categories } = this.state;
  }
  render() {
    const { categories, currencies } = this.state;
    return (
      <nav>
        <div className="container">
          <div className="navbar">
            <div className="categories__container">
              {categories.map((category) => {
                return (
                  <NavLink
                    className={({ isActive }) =>
                      "btn__navbar " + (isActive ? "active" : "")
                    }
                    key={category.name}
                    to={`/${category.name}`}
                  >
                    {category.name.toUpperCase()}
                  </NavLink>
                );
              })}
            </div>
            <div>
              <img id="logo" src={logo} alt="Logo" />
            </div>
            <div id="divisaycarro">
              <CurrencySelector currencies={currencies} />
              <select></select>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

/*
return (
  <button
    className="btn__navbar"
    // {({isActive})=>'btn__navbar ' + (isActive ? 'active' : '')}
    key={category.name}
    to={`/${category.name}`}
  >
    {category.name.toUpperCase()}
  </button>
);

*/
/*

*/
