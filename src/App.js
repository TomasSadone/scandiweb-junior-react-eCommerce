import React, { Component } from "react";
import { Provider } from "react-redux";
import AppRouter from "./router/AppRouter";
import { store, persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppRouter />
        </PersistGate>
      </Provider>
    );
  }
}
