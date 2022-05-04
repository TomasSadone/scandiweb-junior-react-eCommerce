import React, { Component } from 'react'
import { Provider } from 'react-redux'
import AppRouter from './router/AppRouter'
import { store } from './store/store'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppRouter/>
      </Provider>
    )
  }
}

