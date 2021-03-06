import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ExchangeRate } from "./components/ExchangeRate";
import "./style.css";
import { getInitialRates } from './store/rates';

// Intialise the value AJAX call
store.dispatch(getInitialRates);

ReactDOM.render(<Provider store={store}> <ExchangeRate /> </Provider> , document.getElementById("root"));
