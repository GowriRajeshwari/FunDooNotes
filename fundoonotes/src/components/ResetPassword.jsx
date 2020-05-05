import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import profile from '../assets/profile.png';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { resetPassword } from "../services/LoginService";
import Snackbar from '@material-ui/core/Snackbar';
import { IconButton } from "@material-ui/core";



class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      helperText: "",
      error: false,
      username: "",
      userdata: [],
      show: false,
      login: "Reset Password",
      next : false,
      password:'',
      helperTextpassowrd:"",
      confirmPassword:'',
      helperTextCpassowrd:'',
      snackbaropen: false,
      snackbarmsg: '',
      confirmpassword:'',
      pass:null
    };

  }
 Reset=async()=>{
    // event.preventDefault();
        await this.validator();
        let data = {
          newPassword: this.state.password,
        };

        const id = localStorage.getItem("id");
        console.log(data,id);

        if (data.newPassword != '' ) {
        
          if(this.state.pass == true){
            resetPassword(data,id).then(response => {
                console.log(response);
               if (response.statusText == "No Content") {
                    this.setState({
                        snackbaropen: true,
                        snackbarmsg: "Succefully changed."
                      })
                    //  localStorage.setItem("id", response.data.id);
                    
                    this.props.history.push({
                        pathname: "/login",
                    });
               } else {
                   this.setState({  snackbarmsg: "Password not successfull", snackbaropen: true });
               }
            });
          }
        }
        else {
            this.setState({  snackbarmsg: "Make sure password and confirm is correct", snackbaropen: true });

        }
  }
  validator=()=>{
    if(this.state.password != ''){
      if (/[\@\#\$\%\^\&\*\(\)\_\+\!]/.test(this.state.password) && /[a-z]/.test(this.state.password) && /[0-9]/.test(this.state.password) && /[A-Z]/.test(this.state.password)) {
        this.setState({ password: this.state.password , helperTextpassowrd: "",
        error: false})
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
    if(this.state.confirmpassword == ''){
      this.setState({
        helperTextCpassowrd: "Enter the confirm password",
        error: true,
        confirmpassword: this.state.confirmpassword
    })
    }else{
      this.checkPassword();
      
    }


    
  }

    //close snackbar
    handleClose=(event)=> {
      // event.preventDefault();
      this.setState({ snackbaropen: false });
  }
  onchangePassword = event => {
    this.setState({ password: event.target.value })
}

onchangePasswordagain =  event => {

    this.setState({
    confirmpassword: event.target.value
  })
}

checkPassword=()=>{
  if (this.state.password === this.state.confirmpassword) {
    this.setState({ snackbaropen: true, snackbarmsg: 'Password changed',pass:true });
    this.setState({ confirmpassword: this.state.confirmpassword , helperTextpassowrd: "",
        error: false})
  } else {
    this.setState({
      snackbaropen: true,
      snackbarmsg: 'enter same password',
      pass : false
    })
  }
}
  render() {
    return (
      <div className="firstcontainerReset">
        <span class="usernameReset"><span>F</span><span>u</span><span>n</span><span>D</span><span>o</span><span>o</span></span>
        <div className="loginstyleReset">{this.state.login}</div>

       
        <Paper id="rootpaperReset">
        
          <div className="containerReset">

            <div className="borderReset">
              <div className="loginFromReset">
              {/* <div>Reset Your Password</div> */}
                <div className="inputFieldReset">
                <TextField
                   hintText="Password"
                   floatingLabelText="Password"
                   id="btnReset"
                   variant="outlined"
                   type="password"
                   label="NewPassword"
                   helperText={this.state.helperTextpassowrd}
                   error={this.state.helperTextpassowrd}
                   onChange={this.onchangePassword}
                  />
                </div>
                <div className="inputFieldReset">
                <TextField
                   hintText="Password"
                   floatingLabelText="Password"
                   id="ConfirmPassword"
                   variant="outlined"
                   type="password"
                   label="Re-enter New Password"
                   helperText={this.state.helperTextCpassowrd}
                   error={this.state.helperTextCpassowrd}
                   onChange={this.onchangePasswordagain}
                  />
                </div>

                <div className="submitButtonReset">
                  <Button id="subbtnReset" className="Reset" onClick={e => this.Reset(e)}>
                    Change Password
                </Button>
                </div>
                
              </div>
            </div>
          </div>
        </Paper>
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
export default ResetPassword;