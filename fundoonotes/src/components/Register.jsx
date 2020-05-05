import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { register } from "../services/LoginService"
import Snackbar from '@material-ui/core/Snackbar';
import { IconButton } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';


const useStyles =(theme)=> ({
    root: {
      minWidth: 275,
      position: 'absolute',
      
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    pos: {
      marginBottom: 12,
    },
    root1: {
        minWidth: 275,
      },
      paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
      price:{
        fontSize: 13,
        fontWeight : 'bold'
        },advance:{
            color:'blue'
        },
        boldpoint:{
            height : '10px',
            listStyleType : 'circle'
        },
        title: {
              fontSize: 13,
            //   width : '250px',
            //   height : '250px'
        
            },
            widthheight:{
                width : '130px',
                height : '130px',
                padding : '20px'
            },
      
  });


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
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
            email:"",
            id:"",
            service:"",
            showCardColor:null
        };
    }

    componentWillMount() {
        // when params sent via url
        if (this.props.history.location.state) {
          let params = this.props.history.location.state.service;
        if(params == 'advance'){
          this.setState({ service: params , showCardColor :true });
        }
        else{
          this.setState({ service: params , showCardColor :false });
        }
        }
      }

    //Register Button
    Register = async() => {
        await this.validator();
        // event.preventDefault();
        console.log("register clicked");
        let data = {
            firstName: this.state.firstname,
            lastName: this.state.lastname,
            email: this.state.email,
            service: this.state.service,
            password: this.state.password,
            phoneNumber: this.state.phone
        };
        console.log(data);


        if(this.state.error == false){
            register(data).then(response => {
                console.log(response);
               if (response.status === 200) {
                    this.setState({
                        snackbarOpen: true,
                        snackbarMessage: "Succefully Registered."
                      })
                    this.props.history.push({
                        pathname: "/login",
                    });
               } else {
                   this.setState({  snackbarmsg: "Register Not Successfull", snackbaropen: true });
               }
            });
        }
        
    }

    validator=()=>{
        if(this.state.firstname != ''){
            if (/^[a-zA-Z].*[\s\.]*$/g.test(this.state.firstname)) {
                this.setState({
                    firstname: this.state.firstname, helpTextFN: "",
                    error: false
                })
            } else {
                this.setState({
                    helpTextFN: "Enter only alphabets",
                    error: true,
                    firstname: this.state.firstname
                })
            }
        }else{
            this.setState({
                helpTextFN: "Enter only alphabets",
                error: true,
                firstname: this.state.firstname
            })
        }

        if(this.state.lastname !=''){
            if (/^[a-zA-Z].*[\s\.]*$/g.test(this.state.lastname )) {
                this.setState({
                    lastname: this.state.lastname , helpTextLN: "",
                    error: false
                })
            } else {
                this.setState({
                    helpTextLN: "Enter only alphabets",
                    error: true,
                    lastname: this.state.lastname 
                })
            }
        }else{
            this.setState({
                helpTextLN: "Enter only alphabets",
                error: true,
                lastname: this.state.lastname 
            })
        }

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



        if(this.state.email != ''){
            if ( /\S+@\S+\.\S+/.test(this.state.email)) {
              this.setState({
                  email: this.state.email, helperTextEmail: "",
                  error: false
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


          if(this.state.phone != ''){
            if (/^[0-9]*$/.test(this.state.phone)) {
                this.setState({ phone: this.state.phone ,helperTextCountry: "",
                error: false })
              } else {
                  this.setState({
                      helperTextCountry: "Enter No only",
                      error: true,
                      phone: this.state.phone
                  })
              }
          } else {
            this.setState({
                helperTextCountry: "Enter No",
                error: true,
                phone: this.state.phone
            })
        }



    }
    //close snackbar
    handleClose=(event)=> {
        // event.preventDefault();
        this.setState({ snackbaropen: false });
    }
    //Next Button
    Next=(event)=> {
        event.preventDefault();
        this.setState({ next: true, password: '' })
    }
    //ArrowButton
    arrowButton(event) {
        event.preventDefault();
        this.setState({ next: false })
    }


    onchangeFirstName = (event) => {
        this.setState({ firstname: event.target.value})
    }

    onchangeLastName = event => {
        this.setState({
            lastname: event.target.value
        })
    }


    onchangeEmail=(event)=>{
        this.setState({
            email: event.target.value   })
    }

    onchangePassword = event => {
          this.setState({ password: event.target.value })
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
        this.setState({ phone: event.target.value})
      }

      
    render() {
      const {classes}=this.props;
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
                                        error={this.state.helpTextFN}
                                        helperText={this.state.helpTextFN}
                                        id="FirstName"
                                        variant="outlined"
                                        label="First Name"
                                        onChange={this.onchangeFirstName}
                                        // size="small"
                                    />
                                </div>
                                <div className="inputFieldReg">
                                    <TextField
                                        error={this.state.helpTextLN}
                                        helperText={this.state.helpTextLN}
                                        id="btnReg"
                                        variant="outlined"
                                        label="Last name"
                                        onChange={this.onchangeLastName}
                                        // size="small"
                                    />
                                </div>
                            </div>
                            <div className="rowReg">

                                <div className="inputFieldReg">
                                    <TextField
                                        error={this.state.helperTextEmail}
                                        helperText={this.state.helperTextEmail}
                                        id="btnEmailReg"
                                        variant="outlined"
                                        label="Email"
                                        onChange={this.onchangeEmail}
                                        // size="small"
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
                                        error={this.state.helperTextpassowrd}
                                        helperText={this.state.helperTextpassowrd}
                                        onChange={this.onchangePassword}
                                        // size="small"
                                    />
                                </div>
                                <div className="inputFieldReg">
                                    <TextField
                                        id="btnReg"
                                        variant="outlined"
                                        type="password"
                                        label="Confirm Password"
                                        error={this.state.helperTextCpassowrd}
                                        helperText={this.state.helperTextCpassowrd}
                                        onChange={this.onchangePasswordagain}
                                        // size="small"
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
                                        error={this.state.helperTextCountry}
                                        helperText={this.state.helperTextCountry}
                                        onChange={this.onchangePhone}
                                        // size="small"
                                    />
                                </div>
                            </div>
                            <div className="submitButtonReg">
                                <Button id="subbtnReg" className="Registerbtn" onClick={e => this.Register(e)}>
                                    Register
                                </Button>
                            </div>


                            
                       {this.state.showCardColor ?
                            <div className="rowReg">
                            <div ><div className="twocardR" onMouseMove={this._onMouseMove1} onMouseOut={this._onMouseOut1}
                                     >
                 
                                   <div className="servicerootR">
                                   <Card>
                                   <div className={classes.widthheight}>
                                <Typography className={classes.price} color="textSecondary" gutterBottom>
                                Price : $49 per
                                </Typography>
                                <Typography className={classes.price} color="textSecondary" gutterBottom>
                                month
                                </Typography>
                                <Typography className={classes.advance} color="textSecondary" gutterBottom>
                                advance
                                </Typography>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                . $49/month
                                </Typography>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                . Ability to ad  only title and description
                                </Typography>
                                </div>
                                        </Card>
                               
                                      </div>
                                    <div  className="serviceroot1R">
                                        <Card>
                                            <Typography  className="title1Radvance">
                                            Selected
                                            </Typography>
                                            </Card>
                                    
                                    </div>
                             </div> 
                
                              </div>
                              <div ><div className="twocardR" onMouseMove={this._onMouseMove1} onMouseOut={this._onMouseOut1}
                                >
                 
                                 <div className="servicerootR">
                                 <Card>
                                 <div className={classes.widthheight}>
                                <Typography className={classes.price} color="textSecondary" gutterBottom>
                                Price : $49 per
                                </Typography>
                                <Typography className={classes.price} color="textSecondary" gutterBottom>
                                month
                                </Typography>
                                <Typography className={classes.advance} color="textSecondary" gutterBottom>
                                basic
                                </Typography>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                . $49/month
                                </Typography>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                . Ability to ad  only title and description
                                </Typography>
                                </div>
                                        </Card>
                               
                                 </div>
                                    <div  className="serviceroot1R">
                                        <Card>
                                            <Typography  className="title1R">
                                            ADD TO CART
                                            </Typography>
                                            </Card>
                                    
                                    </div>
                             </div> 
                
                              </div>
                            </div>
                            :     <div className="rowReg">
                            <div ><div className="twocardR" onMouseMove={this._onMouseMove1} onMouseOut={this._onMouseOut1}
                                     >
                 
                                   <div className="servicerootR">
                                   <Card>
                                   <div className={classes.widthheight}>
                                <Typography className={classes.price} color="textSecondary" gutterBottom>
                                Price : $49 per
                                </Typography>
                                <Typography className={classes.price} color="textSecondary" gutterBottom>
                                month
                                </Typography>
                                <Typography className={classes.advance} color="textSecondary" gutterBottom>
                                advance
                                </Typography>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                . $49/month
                                </Typography>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                . Ability to ad  only title and description
                                </Typography>
                                </div>
                                        </Card>
                               
                                      </div>
                                    <div  className="serviceroot1R">
                                        <Card>
                                            <Typography  className="title1R">
                                            ADD TO CART
                                            </Typography>
                                            </Card>
                                    
                                    </div>
                             </div> 
                
                              </div>
                              <div ><div className="twocardR" onMouseMove={this._onMouseMove1} onMouseOut={this._onMouseOut1}
                                >
                 
                                 <div className="servicerootR">
                                 <Card>
                                 <div className={classes.widthheight}>
                                <Typography className={classes.price} color="textSecondary" gutterBottom>
                                Price : $49 per
                                </Typography>
                                <Typography className={classes.price} color="textSecondary" gutterBottom>
                                month
                                </Typography>
                                <Typography className={classes.advance} color="textSecondary" gutterBottom>
                                basic
                                </Typography>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                . $49/month
                                </Typography>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                . Ability to ad  only title and description
                                </Typography>
                                </div>
                                        </Card>
                               
                                 </div>
                                    <div  className="serviceroot1R">
                                        <Card>
                                            <Typography  className="title1Rbasic">
                                            Selected
                                            </Typography>
                                            </Card>
                                    
                                    </div>
                             </div> 
                
                              </div>
                            </div>}

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
export default withStyles(useStyles)(Register);