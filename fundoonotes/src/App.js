import React from "react";
import "./App.css";
import { Router, Switch, Route } from "react-router-dom";
import service from "./components/service";
import history from "./history";
import Login from "./pages/login";
import Register from "./pages/register";
import ForgotPassword from "./pages/forgotPassword";
import ResetPassword from "./pages/resetPassword";
import Dashboard from "./components/dashboard";
import TakeaNotes from "./components/takeaNotes";
import EditLabel from "./components/editLabel";
import EditNotes from "./components/editNotes";
import Archived from "./components/archived";
import Color from "./components/color";
import NewNote from "./components/newNote";
import DateTimePicker from "./components/dateTimePicker";
import Collaborator from "./components/collaborator";
import DeleteIcon from "./components/deleteIcon";
import Trash from "./components/trash";
import Reminder from "./components/reminder";
import ListItemchecklist from "./components/listItemchecklist";
import LabelNotes from "./components/labelNotes";
import AskQuestion from "./components/askQuestion";
import RatingStart from "./components/rating";
import Cart from "./components/cart";
import FullWidthTabs from "./components/tabs";
import LabelShow from "./components/labelShow";

let token = window.location.href.split("/")[4];
let resetpassword = "/resetpassword/" + token;

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
        <Route path="/askQuestion" component={AskQuestion} />
        <Route path="/reminder" component={Reminder} />
        <Route path="/LabelNotes" component={LabelNotes} />
        <Route path="/ratingStart" component={RatingStart} />
        <Route path="/ListItemchecklist" component={ListItemchecklist} />
        <Route path="/cart" component={Cart} />
        <Route path="/tabs" component={FullWidthTabs} />
        <Route path="/labelShow" component={LabelShow} />
      </Switch>
    </Router>
  );
}
export default App;
