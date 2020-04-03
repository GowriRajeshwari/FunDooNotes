import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import history from "./history";
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Dashboard from './components/Dashboard';
import Dashboard1 from './components/Dashboard1';
import TakeaNotes from './components/TakeaNotes';
import EditLabel from './components/EditLabel';
import service from './components/service';
let token =  window.location.href.split('/' )[4];
let resetpassword="/resetpassword/"+token
console.log(token);


function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/Register" component={Register} />
        <Route path="/Forgot" component={ForgotPassword} />
        <Route path={resetpassword} component={ResetPassword} />
        <Route path="/Dashboard" component={Dashboard} />
        <Route path="/Dashboard1" component={Dashboard1} />
        <Route path="/TakeaNotes" component={TakeaNotes} />
        <Route path="/EditLabel" component={EditLabel} />
        <Route path="/Service" component={service} />


      </Switch>
    </Router>
  );
}
export default App;