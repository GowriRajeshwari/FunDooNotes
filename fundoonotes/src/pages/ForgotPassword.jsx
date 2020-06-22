import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import mail from '../assets/mail.png';
import { forgotpassword } from "../services/LoginService"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Snackbar from '@material-ui/core/Snackbar';
import { IconButton } from "@material-ui/core";


class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            helperTextEmail: "",
            error: false,
            username: "",
            userdata: [],
            show: false,
            login: "Account recovery for",
            next: false,
            password: '',
            helperTextpassowrd: "",
            emailfrom: '',
            snackbaropen: false,
            snackbarmsg: '',
            email: ''
        };
    }

    //close snackbar
    handleClose = (event) => {
        // event.preventDefault();
        this.setState({ snackbaropen: false });
    }

    //Send Button
    forgotButton = () => {
        // event.preventDefault();
        this.validator();
        console.log("forgot button is clicked");

        let data = {
            email: this.state.email,
        };
        console.log(data);
        if (this.state.helperTextEmail === '') {
            forgotpassword(data).then(response => {
                console.log(response);
                if (response.status === 200) {
                    this.setState({
                        snackbaropen: true,
                        snackbarmsg: "Mail is send Successfully."
                    })
                    // localStorage.setItem("username", this.state.username);
                    // this.props.history.push({
                    //     pathname: "/Dashboard",
                    // });
                } else {
                    this.setState({ snackbarmsg: "Mail is not sended successfully", snackbaropen: true });
                }
            });
        }


    }

    validator = () => {
        if (this.state.email != '') {
            if (/\S+@\S+\.\S+/.test(this.state.email)) {
                this.setState({
                    email: this.state.email, helperTextEmail: "",
                    error: false
                })
            } else {
                this.setState({
                    helperTextEmail: "Enter validate Email",
                    error: true,
                    email: this.state.email
                })
            }
        } else if (this.state.email == '') {
            this.setState({
                helperTextEmail: "Enter Email",
                error: true,
                email: this.state.email
            })
        }

    }
    componentDidMount() {
        const email = localStorage.getItem("email");
        this.setState({ emailfrom: email })
    }
    onChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })

    }


    render() {
        return (
            <div className="firstcontainerForgot">
                <span class="usernameForgot"><span>F</span><span>u</span><span>n</span><span>D</span><span>o</span><span>o</span></span>
                <div className="loginstyleForgot">{this.state.login}</div>
                <div className="EmailForgot">{this.state.emailfrom}</div>

                <Paper id="rootpaperForgot">

                    <div className="containerForgot">

                        <div className="borderForgot">
                            <div className="loginFromForgot">
                                <img src={mail} id="imgForgot" />
                                <div className="RecoveryForgot">Recovery email</div>
                                <div className="inputFieldForgot">
                                    <TextField
                                        error={this.state.helperTextEmail}
                                        helperText={this.state.helperTextEmail}
                                        id="btnForgot"
                                        variant="outlined"
                                        label="Emails"
                                        name='Emails'
                                        onChange={this.onChangeEmail}
                                    />
                                </div>

                                <div className="submitButtonForgot">
                                    <Button id="subbtnForgot" className="forgotButton" onClick={e => this.forgotButton(e)}>
                                        Send
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
export default ForgotPassword;