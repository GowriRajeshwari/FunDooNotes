import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import profile from '../assets/profile.png';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

class ResetPassword extends Component {
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
      helperTextpassowrd:"",
      confirmPassword:'',
      helperTextCpassowrd:''
    };

  }

  //setState for password field
  onChangeNewPassword(event) {
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

  //setState for password field
  onChangeConfirmPassword(event) {
    if (event.target.value.length > 7) {
      this.setState({
        helperTextCpassowrd: "",
        error: false,
        confirmPassword: event.target.value
      });
    } else {
      this.setState({
        helperTextCpassowrd: "Password should be 7 letters",
        error: true,
        confirmPassword: event.target.value
      });
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
                   onChange={this.onChangeNewPassword.bind(this)}
                  />
                </div>
                <div className="inputFieldReset">
                <TextField
                   hintText="Password"
                   floatingLabelText="Password"
                   id="btnReset"
                   variant="outlined"
                   type="password"
                   label="Re-enter New Password"
                   helperText={this.state.helperTextCpassowrd}
                   onChange={this.onChangeConfirmPassword.bind(this)}
                  />
                </div>

                <div className="submitButtonReset">
                  <Button id="subbtnReset" onClick={e => this.Next(e)}>
                    Change Password
                </Button>
                </div>
                
              </div>
            </div>
          </div>
        </Paper>

       
      </div>
    );
  }
}
export default ResetPassword;