import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { register } from "../services/LoginService"
import Snackbar from '@material-ui/core/Snackbar';
import { IconButton } from "@material-ui/core";


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            country: "",
            confirmpassword: "",
            helperText: "",
            phone: "",
            error: false,
            show: false,
            login: "Create your FunDoo Account",
            next: false,
            password: '',
            helperTextpassowrd: "",
            helperTextCountry: "",
            helperTextCpassowrd: "",
            helperTextEmail:"",
            helpTextFN: "",
            helpTextLN: "",
            snackbaropen: false,
            snackbarmsg: '',
            email:""
        };
        this.arrowButton = this.arrowButton.bind(this);
        this.handleClose = this.handleClose.bind(this);

    }
    //Register Button
    Register = (event) => {
       // const errors = this.validate(this.state)
        event.preventDefault();
        console.log("register clicked");
        let data = {
            firstName: this.state.firstname,
            lastName: this.state.lastname,
            email: this.state.email,
            service: 'advance',
            password: this.state.password,
            phoneNumber: this.state.phone
        };
        console.log(data);
        if (data.email || data.password != '') {
            register(data).then(response => {
                console.log(response);
               if (response.status === 200) {
                    this.setState({
                        snackbarOpen: true,
                        snackbarMessage: "Succefully Registered."
                      })
                    // localStorage.setItem("username", this.state.username);
                    this.props.history.push({
                        pathname: "/",
                    });
               } else {
                   this.setState({  snackbarmsg: "Login Not Successfull", snackbaropen: true });
               }
            });
        }
        else {
            this.setState({  snackbarmsg: "Make sure all the fields are filled", snackbaropen: true });

        }
    }

    //close snackbar
    handleClose(event) {
        // event.preventDefault();
        this.setState({ snackbaropen: false });
    }
    //Next Button
    Next(event) {
        event.preventDefault();
        this.setState({ next: true, password: '' })
    }
    //ArrowButton
    arrowButton(event) {
        event.preventDefault();
        this.setState({ next: false })
    }


    onchangeFirstName = (event) => {
        if (/^[a-zA-Z].*[\s\.]*$/g.test(event.target.value)) {
            this.setState({
                firstname: event.target.value, helpTextFN: "",
                error: false
            })
        } else {
            this.setState({
                helpTextFN: "Enter only alphabets",
                error: true,
                firstname: event.target.value
            })
        }
    }

    onchangeLastName = event => {
        if (/^[a-zA-Z].*[\s\.]*$/g.test(event.target.value)) {
            this.setState({
                lastname: event.target.value, helpTextLN: "",
                error: false
            })
        } else {
            this.setState({
                helpTextLN: "Enter only alphabets",
                error: true,
                lastname: event.target.value
            })
        }
    }

    validate = data => {
        const errors = {}
        if (!/([A-Z0-9a-z_-][^@])+?@[^$#<>?]+?\.[\w]{2,4}/.test(data.Email))
            errors.email = 'Invalid email'
        return errors
    }

    onchangeEmail=(event)=>{
        console.log(event)
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
    
      onchangePasswordagain = async event => {

        await this.setState({
          confirmpassword: event.target.value
        })
        this.checkPassword()
      }
    
      checkPassword () {
        if (this.state.password === this.state.confirmpassword) {
          this.setState({ snackbarOpen: true, snackbarmsg: 'done' })
        } else {
          this.setState({
            snackbarOpen: true,
            snackbarmsg: 'enter same password'
          })
        }
      }
      onchangePhone = event => {
        if (/^[0-9]*$/.test(event.target.value)) {
          this.setState({ phone: event.target.value ,helperTextCountry: "",
          error: false })
        } else {
            this.setState({
                helperTextCountry: "Enter No only",
                error: true,
                phone: event.target.value
            })
        }
      }

      
    render() {
        return (
            <div className="firstcontainerReg">

                <Paper id="rootpaperReg" elevation={3} >

                    <div className="containerReg">
                        <div className="container2Reg">
                            <span class="usernameReg"><span>F</span><span>u</span><span>n</span><span>D</span><span>o</span><span>o</span></span>
                            <div className="loginstyleReg">{this.state.login}</div>
                            <div className="rowReg">
                                <div className="inputFieldReg">
                                    <TextField
                                        helperText={this.state.helpTextFN}
                                        id="btnReg"
                                        variant="outlined"
                                        label="First Name"
                                        onChange={this.onchangeFirstName}
                                    />
                                </div>
                                <div className="inputFieldReg">
                                    <TextField
                                        helperText={this.state.helpTextLN}
                                        id="btnReg"
                                        variant="outlined"
                                        label="Last name"
                                        onChange={this.onchangeLastName}
                                    />
                                </div>
                            </div>
                            <div className="rowReg">

                                <div className="inputFieldReg">
                                    <TextField
                                        helperText={this.state.helperTextEmail}
                                        id="btnEmailReg"
                                        variant="outlined"
                                        label="Email"
                                        onChange={this.onchangeEmail}
                                    />
                                </div>
                            </div>

                            <div className="rowReg">

                                <div className="inputFieldReg">
                                    <TextField
                                        id="btnReg"
                                        variant="outlined"
                                        type="password"
                                        label="NewPassword"
                                        helperText={this.state.helperTextpassowrd}
                                        onChange={this.onchangePassword}
                                    />
                                </div>
                                <div className="inputFieldReg">
                                    <TextField
                                        id="btnReg"
                                        variant="outlined"
                                        type="password"
                                        label="Confirm Password"
                                        helperText={this.state.helperTextCpassowrd}
                                        onChange={this.onchangePasswordagain}
                                    />
                                </div>
                            </div>

                            <div className="rowReg">

                                
                                <div className="inputFieldReg">
                                    <TextField
                                        id="btnReg"
                                        variant="outlined"
                                        label="Phone"
                                        // type="number"
                                        helperText={this.state.helperTextCountry}
                                        onChange={this.onchangePhone}
                                    />
                                </div>
                            </div>
                            <div className="submitButtonReg">
                                <Button id="subbtnReg" onClick={e => this.Register(e)}>
                                    Register
                                </Button>
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
export default Register;