import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './Css/Login.css'
import './Css/Register.css'
import './Css/ForgotPassword.css'
import './Css/ResetPassword.css'
import './Css/Dashboard.scss'
import './Css/service.css'
import './Css/TakeaNotes.css'


import * as serviceWorker from './serviceWorker';
// import sw from '../sw.js'


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
 serviceWorker.unregister();

// async function registerSW() {
//   if ('serviceWorker' in navigator) {
//     try {
//       await navigator.serviceWorker.register('/serviceWorker.js');
//     } catch (e) {
//       console.log(`SW registration failed`,e);
//     }
//   }
// }