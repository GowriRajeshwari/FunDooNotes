import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./Css/Login.scss";
import "./Css/Register.scss";
import "./Css/ForgotPassword.scss";
import "./Css/ResetPassword.scss";
import "./Css/Dashboard.scss";
import "./Css/service.scss";
import "./Css/TakeaNotes.scss";

import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
