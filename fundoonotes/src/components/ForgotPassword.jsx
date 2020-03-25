import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import mail from '../assets/mail.png';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            helperText: "",
            error: false,
            username: "",
            userdata: [],
            show: false,
            login: "Account recovery for",
            next: false,
            password: '',
            helperTextpassowrd: "",
            emailfrom :''
        };
     this.Send =this.Send.bind(this);
    }
    //Send Button
    Send(){

    }
    componentDidMount(){
        const email = localStorage.getItem("email");
        this.setState({emailfrom : email})
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
                                        helperText={this.state.helperText}
                                        id="btnForgot"
                                        variant="outlined"
                                        label="Enter full Email address"
                                        onChange={this.onChangeEmail.bind(this)}
                                    />
                                </div>

                                <div className="submitButtonForgot">
                                <Button id="subbtnForgot" onClick={e => this.Send(e)}>
                                        Send
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
export default ForgotPassword;