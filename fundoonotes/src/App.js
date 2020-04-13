import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import history from "./history";
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Dashboard from './components/Dashboard';
import TakeaNotes from './components/TakeaNotes';
import EditLabel from './components/EditLabel';
import EditNotes from './components/EditNotes';
import service from './components/service';
import Archived from './components/Archived';
import Color from './components/Color';
import NewNote from './components/NewNote';
import DateTimePicker from './components/DateTimePicker';
import Collaborator from './components/Collaborator'



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
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/TakeaNotes" component={TakeaNotes} />
        <Route path="/EditLabel" component={EditLabel} />
        <Route path="/Service" component={service} />
        <Route path="/Archived" component={Archived} />
        <Route path="/color" component={Color} />
        <Route path="/EditNotes" component={EditNotes} />
        <Route path="/NewNote" component={NewNote} />
        <Route path="/DateTimePicker" component={DateTimePicker} />
        <Route path="/Collaborator" component={Collaborator} />

      </Switch>
    </Router>
  );
}
export default App;