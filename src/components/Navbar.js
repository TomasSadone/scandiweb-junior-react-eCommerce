import React, { Component, useEffect, useState } from 'react'
import { getData } from '../helpers/getData';
import logo from '../icons/a-logo.svg';

export default class Navbar extends Component {
    //como lo hizo este loco:
    constructor(){
        super()
        //setear un state:
        this.state = {
            categories: [
            ]
        };
    };

    
    componentDidMount() {

        getData(`
        query {
            categories{
                name
            }
        }
        `)
        .then(data =>{ 
            this.setState({
            categories: data.categories
        })})
    };
    render() {
    const {categories} = this.state
    return (
      <header>
          <div className='container'>
                <div className='navbar'>
                    <div>
                        {
                            //preguntarle a juan si esta bien esa key
                             categories.map(category => {
                                return (
                                    <button 
                                        className='btn__navbar' 
                                        key={category.name}
                                    >
                                        {category.name.toUpperCase()}
                                    </button>
                                );
                            })        
                        }
                    </div>
                    <div>
                        <img id='logo' src={logo} alt="Logo"/>
                    </div>
                    <div id='divisaycarro'>
                        <select></select>
                        <select></select>

                    </div>
                </div>
            </div>
      </header>
    )
  }
}
