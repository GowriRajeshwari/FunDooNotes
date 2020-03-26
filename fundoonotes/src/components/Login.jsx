import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import profile from '../assets/profile.png';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

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
    // this.arrowButton = this.arrowButton.bind(this);
    // this.register = this.register.bind(this);
    // this.ForgotButton = this.ForgotButton.bind(this);
    // this.resetpassword = this.resetpassword.bind(this);
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

   //setState for email field
   onChangeEmail=(event)=>{
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
onChangePassword=(event)=> {
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
                   hintText="Password"
                   floatingLabelText="Password"
                   id="btn"
                   variant="outlined"
                   type="password"
                   label="Password"
                   helperText={this.state.helperTextpassowrd}
                   onChange={this.onChangePassword}
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
                    helperText={this.state.helperText}
                    id="btn"
                    variant="outlined"
                    label="Emails"
                     onChange={this.onChangeEmail}
                  />
                </div>

                <div className="submitButton">
                  <Button id="subbtn" onClick={e => this.Next(e)}>
                    NEXT
                </Button>
                </div>
                <div className="belowlogin">
                  <Button id="forgotstyle" onClick={e => this.resetpassword(e)}>
                  Create account(RP)
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
export default Login;