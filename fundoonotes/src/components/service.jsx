import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import profile from '../assets/profile.png';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { login } from "../services/LoginService"
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';


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
      fontSize: 14,
      width : '250px',
      height : '250px'

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
  });

class Service extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }


  render() {
      const {classes}=this.props;
    return (
      <div className="servicecontainer">
         <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: this.state.open,
        })}
      >
        <Toolbar>
         
          <Typography variant="h6" noWrap>
           Keep
          </Typography>


          
        </Toolbar>
      </AppBar>

      
      <div >
        <div className="twocard">
                 <div className="serviceroot">
                        <Card >
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Word of the Day
                                </Typography>
                        </Card>
                    </div>
                    <div  className="serviceroot1">
                        <Card>
                            <Typography className="title1"  >
                            Word of the Day
                            </Typography>
                        </Card>
                    </div>
                    </div>
                </div>

                <div><div className="twocard">
                <div className="serviceroot">
                        <Card >
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Word of the Day
                                </Typography>
                        </Card>
                    </div>
                <div  className="serviceroot1">
                    <Card>
                        <Typography className="title1"  >
                        Word of the Day
                        </Typography>
                    </Card>
                </div>
                </div> </div>

      </div>

    );
  }
}
export default withStyles(useStyles)(Service);