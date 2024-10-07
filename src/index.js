import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import './index.css';
import "tailwindcss/tailwind.css";
// import { store } from './Redux/store'; // Adjust the path based on your file structure
// console.log("hi");
import {store} from './Redux/Store'
import { Provider } from 'react-redux';



ReactDOM.render(
  <React.StrictMode>
     <Provider store={store}>
    <App />
  </Provider>,
  </React.StrictMode>,
  document.getElementById("root")
);
