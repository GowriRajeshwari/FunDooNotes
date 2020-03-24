import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemTest from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Snackbar from '@material-ui/core/Snackbar';
import { IconButton } from "@material-ui/core";
import profile from '../assets/profile.png';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      helperText: "",
      error: false,
      messagebox: "",
      users: [], topic: "",
      username: "",
      allchat: [],
      messages: [],
      message: "",
      id: "",
      userdata: [],
      show: false,
      snackbaropen: false,
      snackbarmsg: '',
      login: "Sign in",
      next : false,
      password:'',
      helperTextpassowrd:""
    };
  }

   //setState for email field
   onChangeEmail(event) {
    if (event.target.value.length > 2) {
      this.setState({
        helperText: "",
        error: false,
        email: event.target.value,
    
      });
    } else {
      this.setState({
        helperText: "Invalid format",
        error: true,
        email: event.target.value,
      

      });
    }
  }
  //setState for password field
onChangePassword(event) {
  if (event.target.value.length > 7) {
    this.setState({
      helperTextpassowrd: "",
      error: false,
      password: event.target.value
    });
  } else {
    this.setState({
      helperTextpassowrd: "Password should be 7 letters",
      error: true,
      password: event.target.value
    });
  }
}
//Next Button
  Next(event){
    event.preventDefault();
    this.setState({next:true , password :'' })
  }
  //ArrowButton
  arrowButton(event){
    this.setState({next:false})
  }
  render() {
    return (
      <div className="firstcontainer">
        <span class="username"><span>F</span><span>u</span><span>n</span><span>D</span><span>o</span><span>o</span></span>
        <div className="loginstyle">{this.state.login}</div>

       
        <Paper id="rootpaper">
        {this.state.next ? 
          <div className="container">

            <div className="border">
              <div className="loginFrom">
              <div className="arrow">
              <Button onClick={this.arrowButton}>
              <ArrowBackIcon />
              </Button></div>
              
                <img src={profile} id="img" />
                <div className="inputField">
                  <TextField
                   hintText="Password"
                   floatingLabelText="Password"
                   id="btn"
                   variant="outlined"
                   type="password"
                   label="Password"
                   helperText={this.state.helperTextpassowrd}
                   onChangepassword={this.onChangePassword.bind(this)}
                  />
                </div>

                <div className="submitButton">
                  <Button id="subbtn" onClick={e => this.SignIn(e)}>
                    Sign in
                </Button>
                </div>
                <div className="belowlogin">
                  <Button id="forgotstyle" onClick={e => this.register(e)}>
                   Forgot Password
            </Button>
                </div>
              </div>
            </div>
          </div>
          : 
          <div className="container">

            <div className="border">
              <div className="loginFrom">
                <img src={profile} id="img" />
                <div className="inputField">
                  <TextField
                    helperText={this.state.helperText}
                    id="btn"
                    variant="outlined"
                    label="Emails"
                   onChange={this.onChangeEmail.bind(this)}
                  />
                </div>

                <div className="submitButton">
                  <Button id="subbtn" onClick={e => this.Next(e)}>
                    NEXT
                </Button>
                </div>
                <div className="belowlogin">
                  <Button id="forgotstyle" onClick={e => this.register(e)}>
                    Find my account
            </Button>
                </div>
              </div>
            </div>
          </div>}
        </Paper>

        <div className="registercontainer">
        <Button id="register" onClick={e => this.register(e)}>
              Create account
            </Button>
       </div> 
        





      </div>
    );
  }
}
export default Dashboard;