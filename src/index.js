import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSun,
  faMoon,
  faTimes,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { Provider } from "react-redux";
import { store } from "./store";

library.add(faSun, faMoon, faBars, faTimes);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();