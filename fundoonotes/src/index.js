import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./css/login.scss";
import "./css/register.scss";
import "./css/forgotPassword.scss";
import "./css/resetPassword.scss";
import "./css/dashboard.scss";
import "./css/service.scss";
import "./css/takeaNotes.scss";
import "./css/color.scss";
import "./css/askQuestion.scss";
import "./css/cart.scss";

import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
