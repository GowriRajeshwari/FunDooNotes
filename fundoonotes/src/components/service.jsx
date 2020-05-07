import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import Modal from '@material-ui/core/Modal';
import Snackbar from '@material-ui/core/Snackbar';
import { IconButton } from "@material-ui/core";



const drawerWidth = 240;

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
    title: {
    //   fontSize: 14,
    //   width : '250px',
    //   height : '250px'

    },
    widthheight:{
        width : '250px',
        height : '250px',
        padding : '20px'
    },
    pos: {
      marginBottom: 12,
    },
    root1: {
        minWidth: 275,
      },
      appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
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
      fontSize: 20,
      fontWeight : 'bold'
      },advance:{
          color:'blue'
      },
      boldpoint:{
          height : '10px',
          listStyleType : 'circle'
      },
      signin:{
          display:'flex',
          justifyContent : 'center',
          color : 'blue',
          marginTop : '20px'
      }
      
  });

class Service extends Component {
  constructor(props) {
    super(props);
    this.state = {
        open : false,
        setOpen : false,
        colorshow : false,
        colorshow1 :false,
        service:"",
        snackbaropen: false,
        snackbarmsg: '',
    };
    this.handleClose = this.handleClose.bind(this);
  }
  _onMouseMove=(event)=>{
    this.setState({colorshow : true})
  }
  _onMouseOut=(event)=>{
    this.setState({colorshow : false})
  }
  _onMouseMove1=(event)=>{
    this.setState({colorshow1 : true})
  }
  _onMouseOut1=(event)=>{
    this.setState({colorshow1 : false})
  }
  serviceadvance=(event)=>{ 
    console.log("service");
    this.setState({setOpen : true,service:"advance"})
  }
  servicebasic=(event)=>{ 
    console.log("service");
    this.setState({setOpen : true,service:"basic"})
  }
  handleOpen = () => {
    this.setState({setOpen : true});
  };

  handleClose = () => {
    this.setState({setOpen : false});
  };
  Done=()=>{
    this.setState({setOpen : false});
  }
  signin=(event)=>{
    this.props.history.push({
        pathname: "/login"
      });
  }
  processtopay=()=>{
      if(this.state.service != ""){
        this.props.history.push({
            pathname: "/Register",
            state: { service: this.state.service }
          });
      }
      else{

      }
  
  }
   //close snackbar
   handleClose(event) {
    // event.preventDefault();
    this.setState({ snackbaropen: false });
}
  render() {
      const {classes}=this.props;
    return (
        <div className="containeservice">
      <div className="servicecontainer">

         <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: this.state.open,
        })}
      >
        <Toolbar> 
          <Typography variant="h6" noWrap>
           FunDoo
          </Typography>
        </Toolbar>
      </AppBar>
     <div className="twocardrow">
      
      <div className="twocard" >
        <div className="zoom" onMouseMove={this._onMouseMove} onMouseOut={this._onMouseOut} onClick={e => this.serviceadvance(e)}>
                 <div className="serviceroot">
                        <Card >
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
                                <Typography className="boldpoint" color="textSecondary" gutterBottom>
                                . Ability to ad  only title and description
                                </Typography>
                                </div>
                        </Card>
                    </div>
                    <div  className="serviceroot1">
                        <Card>
                            <Typography className={this.state.colorshow ? "title2" : "title1"} >
                            ADD TO CART
                            </Typography>
                        </Card>
                    </div>
                    </div>
                </div>

                <div className="twocard"  ><div className="zoom" onMouseMove={this._onMouseMove1} onMouseOut={this._onMouseOut1}
                 onClick={e => this.servicebasic(e)}
                 >
                        <div className="serviceroot">
                                <Card >
                                <div className={classes.widthheight}>
                                <Typography className={classes.price} color="textSecondary" gutterBottom>
                                Price : $49 per
                                </Typography>
                                <Typography className={classes.price} color="textSecondary" gutterBottom>
                                month
                                </Typography>
                                <Typography className={classes.advance} color="textSecondary" gutterBottom>
                                    Basic
                                </Typography>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                . $49/month
                                </Typography>
                                <Typography className="boldpoint" color="textSecondary" gutterBottom>
                                . Ability to ad  only title and description
                                </Typography>
                                </div>
                                </Card>
                            </div>
                        <div  className="serviceroot1">
                            <Card>
                                <Typography  className={this.state.colorshow1 ? "title2" : "title1"} >
                                ADD TO CART
                                </Typography>
                            </Card>
                        </div>
                </div> 
                
                </div>
                </div>
                
                <Snackbar open={this.state.snackbaropen} autoHideDuration={6000} onClose={this.handleClose}
                    message={<span>{this.state.snackbarmsg}</span>}
                    action={[
                        <IconButton key="close" arial-label="close" color="inherit" onClick={this.handleClose}>
                            x</IconButton>
                    ]}>
                </Snackbar>

      </div>

      

      <Typography style={{cursor:"pointer"}} className={classes.signin} onClick={e => this.signin(e)}>
                               Sign In Instead
                                </Typography>
                                
                <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.setOpen}
                onClose={this.handleClose}
                className="modelmiddel"
            >
                <div className="classespaper">
                
                    <div className="textdash">
                    </div>
                    <div className="buttondone" onClick={e => this.Done(e)}>
                    <Button  size="small" onClick={e => this.processtopay(e)}>
                    Processed to checkout
                    </Button>
                    </div>
                  
        </div>
      </Modal>
      

                                
      </div>
      

    );
  }
}
export default withStyles(useStyles)(Service);