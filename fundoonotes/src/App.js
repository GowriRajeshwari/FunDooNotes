import React from 'react';
import './App.css';
import { Router, Switch, Route } from "react-router-dom";
import service from './components/service';
import history from "./history";
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Dashboard from './components/Dashboard';
import TakeaNotes from './components/TakeaNotes';
import EditLabel from './components/EditLabel';
import EditNotes from './components/EditNotes';
import Archived from './components/Archived';
import Color from './components/Color';
import NewNote from './components/NewNote';
import DateTimePicker from './components/DateTimePicker';
import Collaborator from './components/Collaborator'
import DeleteIcon from './components/DeleteIcon'
import Trash from './components/Trash'
import Reminder from './components/Reminder';
import ListItemchecklist from './components/ListItemchecklist';
import LabelNotes from './components/LabelNotes';
import Logout from './components/Logout';
import AskQuestion from './components/AskQuestion';
import RatingStart from './components/Rating';
import AddCart from './components/AddCart';
import Cart from './components/Cart';
import FullWidthTabs from './components/Tabs';
import LabelShow from './components/LabelShow'



let token =  window.location.href.split('/' )[4];
let resetpassword="/resetpassword/"+token
// console.log(token);
// if('serviceWorker' in navigator){
//   navigator.serviceWorker.register('./serviceWorker.js',{scope : './'})
//     .then(reg => console.log('service worker registered',reg))
//     .catch(err => console.log('service worker not registered',err));
// }

function App() {
  return (
    <Router history={history}>
      <Switch>
    
        <Route path="/" exact component={service} />
        <Route path="/login" component={Login} />
        <Route path="/Register" component={Register} />
        <Route path="/Forgot" component={ForgotPassword} />
        <Route path={resetpassword} component={ResetPassword} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/TakeaNotes" component={TakeaNotes} />
        <Route path="/EditLabel" component={EditLabel} />
        <Route path="/Archived" component={Archived} />
        <Route path="/color" component={Color} />
        <Route path="/EditNotes" component={EditNotes} />
        <Route path="/NewNote" component={NewNote} />
        <Route path="/DateTimePicker" component={DateTimePicker} />
        <Route path="/Collaborator" component={Collaborator} />
        <Route path="/DeleteIcon" component={DeleteIcon} />
        <Route path="/Trash" component={Trash} />
        <Route path="/logout" component={Logout} />
        <Route path="/askQuestion" component={AskQuestion} />
        <Route path="/reminder" component={Reminder} />
        <Route path="/LabelNotes" component={LabelNotes} />
        <Route path="/ratingStart" component={RatingStart} />
        <Route path="/ListItemchecklist" component={ListItemchecklist} />
        <Route path="/Addcart"  component={AddCart} />
        <Route path="/cart"  component={Cart} />    
        <Route path="/tabs"  component={FullWidthTabs} />    
        <Route path="/labelShow"  component={LabelShow} />        






      </Switch>
    </Router>
  );
}
export default App;