import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import profile from '../assets/profile.png';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { login } from "../services/LoginService"
require('dotenv').config();


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      helperText: "",
      error: false,
      username: "",
      userdata: [],
      show: false,
      login: "Sign in",
      next : false,
      password:'',
      helperTextpassowrd:""
    };
  }

  //sign in
  SignIn=(event)=>{
    event.preventDefault();
        console.log("login clicked");
        let data = {
          email: this.state.email,
          password: this.state.password
        };
        console.log(data);
        if (data.email || data.password != '') {
            login(data).then(response => {
                console.log(response);
               if (response.status === 200) {
                    this.setState({
                        snackbarOpen: true,
                        snackbarMessage: "Succefully Registered."
                      })
                    localStorage.setItem("id", response.data.id);
                    
                    this.props.history.push({
                        pathname: "/TakeaNotes",
                    });
               } else {
                   this.setState({  snackbarmsg: "Register Not Successfull", snackbaropen: true });
               }
            });
        }
        else {
            this.setState({  snackbarmsg: "Field are empty", snackbaropen: true });

        }
  }
  resetpassword(event){
    event.preventDefault();
    this.props.history.push({
      pathname: "/Reset",
    });
  }
  //ForgotButton
  ForgotButton(event){
    event.preventDefault();
    this.props.history.push({
      pathname: "/Forgot",
    });
    localStorage.setItem("email", this.state.email);
  }
  //Register Button
  register(event){
    event.preventDefault();
    this.props.history.push({
      pathname: "/Register",
    });

  }
  onchangeEmail=(event)=>{
    // console.log(event)
    if ( /\S+@\S+\.\S+/.test(event.target.value)) {
        this.setState({
            email: event.target.value, helperTextEmail: "",
            error: false
        })
    } else {
        this.setState({
            helperTextEmail: "Enter validate Email",
            error: true,
            email: event.target.value
        })
    }

}

onchangePassword = event => {
    if (/[\@\#\$\%\^\&\*\(\)\_\+\!]/.test(event.target.value) && /[a-z]/.test(event.target.value) && /[0-9]/.test(event.target.value) && /[A-Z]/.test(event.target.value)) {
      // console.log("on click function is working", event.target.value)
      this.setState({ password: event.target.value , helperTextpassowrd: "",
      error: false})
    } else {
      this.setState({
        helperTextpassowrd: "Minimum eight characters, at least one letter, one number and one special character:",
        error: true,
        password: event.target.value
    })
    }
  }
//Next Button
  Next=(event)=>{
    event.preventDefault();
    this.setState({next:true  })
  }
  //ArrowButton
  arrowButton=(event)=>{
    event.preventDefault();
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
              <Button onClick={e => this.arrowButton(e)}>
              <ArrowBackIcon />
              </Button></div>
              
                <img src={profile} id="img" />
                <div className="emaildisplay">{this.state.email}</div>
                <div className="inputField">
                  <TextField
                   id="btn"
                   variant="outlined"
                   type="password"
                   label="Password"
                   helperText={this.state.helperTextpassowrd}
                   onChange={this.onchangePassword}
                  />
                </div>

                <div className="submitButton">
                  <Button id="subbtn" onClick={e => this.SignIn(e)}>
                    Sign in
                </Button>
                </div>
                <div className="belowlogin">
                  <Button id="forgotstyle" onClick={e => this.ForgotButton(e)}>
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
                    helperText={this.state.helperTextEmail}
                    id="btn"
                    variant="outlined"
                    label="Emails"
                     onChange={this.onchangeEmail}
                  />
                </div>

                <div className="submitButton">
                  <Button id="subbtn" onClick={e => this.Next(e)}>
                    NEXT
                </Button>
                </div>
                <div className="belowlogin">
                  {/* <Button id="forgotstyle" onClick={e => this.resetpassword(e)}>
                  Create account(RP)
                   </Button> */}
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
export default Login;