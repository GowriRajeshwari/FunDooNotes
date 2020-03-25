import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import profile from '../assets/profile.png';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            helperText: "",
            error: false,
            username: "",
            userdata: [],
            show: false,
            login: "Create your FunDoo Account",
            next: false,
            password: '',
            helperTextpassowrd: ""
        };
        this.arrowButton = this.arrowButton.bind(this);
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
    Next(event) {
        event.preventDefault();
        this.setState({ next: true, password: '' })
    }
    //ArrowButton
    arrowButton(event) {
        event.preventDefault();
        this.setState({ next: false })
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
                                        helperText={this.state.helperText}
                                        id="btnReg"
                                        variant="outlined"
                                        label="First Name"
                                        onChange={this.onChangeEmail.bind(this)}
                                    />
                                </div>
                                <div className="inputFieldReg">
                                    <TextField
                                        helperText={this.state.helperText}
                                        id="btnReg"
                                        variant="outlined"
                                        label="Last name"
                                        onChange={this.onChangeEmail.bind(this)}
                                    />
                                </div>
                            </div>
                            <div className="rowReg">

                                <div className="inputFieldReg">
                                    <TextField
                                        helperText={this.state.helperText}
                                        id="btnEmailReg"
                                        variant="outlined"
                                        label="Email"
                                        onChange={this.onChangeEmail.bind(this)}
                                    />
                                </div>
                            </div>

                            <div className="rowReg">

                                <div className="inputFieldReg">
                                    <TextField
                                        hintText="Password"
                                        floatingLabelText="Password"
                                        id="btnReg"
                                        variant="outlined"
                                        type="password"
                                        label="NewPassword"
                                        helperText={this.state.helperTextpassowrd}
                                    // onChange={this.onChangeNewPassword.bind(this)}
                                    />
                                </div>
                                <div className="inputFieldReg">
                                    <TextField
                                        hintText="Password"
                                        floatingLabelText="Password"
                                        id="btnReg"
                                        variant="outlined"
                                        type="password"
                                        label="Re-enter New Password"
                                        helperText={this.state.helperTextCpassowrd}
                                    // onChange={this.onChangeConfirmPassword.bind(this)}
                                    />
                                </div>
                            </div>
                            <div className="submitButtonReg">
                                <Button id="subbtnReg" onClick={e => this.Next(e)}>
                                    Register
                                </Button>
                            </div>
                        </div>

                    </div>


                </Paper>
            </div>
        );
    }
}
export default Dashboard;