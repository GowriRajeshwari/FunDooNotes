import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import mail from '../assets/mail.png';
import { forgotpassword } from "../services/LoginService"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

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
            emailfrom :''
        };
    //  this.Send =this.Send.bind(this);
    }
    //Send Button
    forgotButton=(event)=>{
        event.preventDefault();
        console.log("forgot button is clicked");
        let data = {
          email: this.state.email,
        };
        console.log(data);
        if (data.email != '') {
            forgotpassword(data).then(response => {
                console.log(response);
               if (response.status === 200) {
                    this.setState({
                        snackbarOpen: true,
                        snackbarMessage: "Mail is send Successfully."
                      })
                    // localStorage.setItem("username", this.state.username);
                    // this.props.history.push({
                    //     pathname: "/Dashboard",
                    // });
               } else {
                   this.setState({  snackbarmsg: "Mail is not sended successfully", snackbaropen: true });
               }
            });
        }
        else {
            this.setState({  snackbarmsg: "Field are empty", snackbaropen: true });

        }

    }
    componentDidMount(){
        const email = localStorage.getItem("email");
        this.setState({emailfrom : email})
    }
    onChangeEmail=(event)=>{
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
                                        helperText={this.state.helperTextEmail}
                                        id="btnForgot"
                                        variant="outlined"
                                        label="Enter full Email address"
                                        onChange={this.onChangeEmail}
                                    />
                                </div>

                                <div className="submitButtonForgot">
                                <Button id="subbtnForgot" onClick={e => this.forgotButton(e)}>
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