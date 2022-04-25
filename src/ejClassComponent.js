import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class ejemplo extends Component {
    // propiedades como las sugirio el rcc:
    //   static propTypes = {second: third}
    
    
    //como lo hizo este loco:
    constructor(props){
        //esto para pasarle las props a los higher order components,
        //o parent constructor:
        super(props)
        //setear un state:
        this.state = {
            name: 'Tomas',
            lastName: 'Sadone',
            age: '20',
            isJobLess: true,
        };

    }

  render() {
//desestructurar el state por simpleza:
const {name, lastName, age, isJobLess} = this.state;
//desestructurar props por simpleza:
const {nombreDeProp} = this.props


//cambiar un state (no se si va aca o fuera de render):
this.setState({
    isJobLess: false
});
    return (
      <div>{name} {lastName} is {age} years old and {isJobLess ? 'is job less' : 'has a job'}</div>
    )
  }
}
