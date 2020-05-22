import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import profile from '../assets/profile.png';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { login } from "../services/LoginService";
import Snackbar from '@material-ui/core/Snackbar';
import { IconButton } from "@material-ui/core";


require('dotenv').config();


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      helperText: "",
      error: null,
      username: "",
      userdata: [],
      show: false,
      login: "Sign in",
      next : false,
      password:'',
      helperTextpassowrd:"",
      red :"",
      email : '',
      emailse : '',
      snackbaropen: false,
      snackbarmsg: '',
    };
  }

    //close snackbar
    handleClose=(event)=> {
      // event.preventDefault();
      this.setState({ snackbaropen: false });
  }
  //sign in
  SignIn=async()=>{
    // event.preventDefault();
   
    
    await this.validator();
    console.log(this.state.error )
    if(this.state.error != true){
      console.log("login clicked");
      let data = {
        email: this.state.email,
        password: this.state.password
      };

      console.log(data);
        
      login(data).then(response => {
          console.log(response);
         if (response.status === 200) {
              this.setState({
                snackbaropen: true,
                  snackbarmsg: "Succefully Registered."
                })
                console.log(response.data.id);

              localStorage.setItem("id", response.data.id);
              localStorage.setItem("userId",response.data.userId);
              localStorage.setItem("email",response.data.email);
              localStorage.setItem("firstName",response.data.firstName)
              localStorage.setItem("userProfile",response.data.imageUrl)
                console.log(localStorage.getItem("id"))
              this.props.history.push({
                  pathname: "/dashboard",
              });
         } else {
             this.setState({  snackbarmsg: "Login Not Successfull,Make sure email & password is correct", snackbaropen: true });
         }
      });
    }
      
       
       
  }
  validator=()=>{
    if(this.state.email != ''){
      if ( /\S+@\S+\.\S+/.test(this.state.email)) {
        this.setState({
            email: this.state.email, helperTextEmail: "",
            // error: false
        })
    } else{
      this.setState({
        helperTextEmail: "Enter validate Email",
        error: true,
        email: this.state.email
    })
      }
    }else if(this.state.email == ''){
      this.setState({
        helperTextEmail: "Enter Email",
        error: true,
        email: this.state.email
    })
    }

    if(this.state.password != ''){
      if (/[\@\#\$\%\^\&\*\(\)\_\+\!]/.test(this.state.password) && /[a-z]/.test(this.state.password) && /[0-9]/.test(this.state.password) && /[A-Z]/.test(this.state.password)) {
        this.setState({ password: this.state.password , helperTextpassowrd: "",
        // error: false
      })
      } else{
        this.setState({
              helperTextpassowrd: "Min 8 char, at least 1 letter,1 no & 1 spl char",
              error: true,
              password: this.state.password
          })
      }
    }else if(this.state.password == ''){
      this.setState({
        helperTextpassowrd: "Enter the password",
        error: true,
        password: this.state.password
    })
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
      pathname: "/",
    });

  }
  onchangeEmail=(event)=>{
    this.setState({
      email: event.target.value  
  })

}

onchangePassword = event => {
  this.setState({ password: event.target.value})
  }
//Next Button
  Next=(event)=>{
    event.preventDefault();
    this.setState({next:true,emailse : this.state.email})
  }
  //ArrowButton
  arrowButton=(event)=>{
    event.preventDefault();
    this.setState({next:false,email : this.state.emailse})
  }
  render() {
    return (
      <div className="firstcontainer">
        <span class="username"><span>F</span><span>u</span><span>n</span><span>D</span><span>o</span><span>o</span></span>
        <div className="loginstyle">{this.state.login}</div>

       
        <Paper id="rootpaper">
        
          <div className="container">

            <div className="border">
              <div className="loginFrom">
                <img src={profile} id="img" />
                <div className="inputField">
                  <TextField
                    error={this.state.helperTextEmail}
                    helperText={this.state.helperTextEmail}
                    id="btnEmail"
                    variant="outlined"
                    label="Emails"
                     onChange={this.onchangeEmail}
                  />
                </div>

                <div className="inputField">
                  <TextField
                    // error={this.state.red}
                    error={this.state.helperTextpassowrd }
                   id="btnPassword"
                   variant="outlined"
                   type="password"
                   label="Password"
                   helperText={this.state.helperTextpassowrd }
                   onChange={this.onchangePassword}
                  />
                </div>

                <div className="submitButton">
                  <Button id="subbtn" className="SignIn" onClick={e => this.SignIn(e)}>
                    Sign in
                </Button>
                </div>
                <div className="belowlogin">
                  <Button id="forgotstyle" className="ForgotButton" onClick={e => this.ForgotButton(e)}>
                   Forgot Password
                   </Button>
                </div>

                {/* <div className="submitButton">
                  <Button id="subbtn" onClick={e => this.Next(e)}>
                    NEXT
                </Button>
                </div> */}
                {/* <div className="belowlogin">
                  <Button id="forgotstyle" onClick={e => this.resetpassword(e)}>
                  Create account(RP)
                   </Button>
                </div> */}
              </div>
            </div>
          </div>
        </Paper>

        <div className="registercontainer">
        <Button id="register" className="register" onClick={e => this.register(e)}>
              Create account
            </Button>
       </div> 
       <Snackbar open={this.state.snackbaropen} autoHideDuration={6000} onClose={this.handleClose}
                    message={<span>{this.state.snackbarmsg}</span>}
                    action={[
                        <IconButton key="close" arial-label="close" color="inherit" onClick={this.handleClose}>
                            x</IconButton>
                    ]}>
                </Snackbar>
       
      </div>
    );
  }
}
export default Login;