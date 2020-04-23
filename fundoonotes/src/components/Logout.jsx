import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import clsx from 'clsx';
import { makeStyles, useTheme,withStyles } from '@material-ui/core/styles';
import { getNotes,setNotes,deleteNotes,getNoteLabelList,addlabelNotes,logout } from '../services/notesService'
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import { blue } from '@material-ui/core/colors';
import setting from '../assets/setting.png'
import Checkbox from '@material-ui/core/Checkbox';
import Color from './Color'
import EditNotes from './EditNotes'
import checkboxoutline from '../assets/checkboxoutline.png';
import checkboxtick from '../assets/checkboxtick.png';
import Divider from '@material-ui/core/Divider';
import { Typography } from "@material-ui/core";

require('dotenv').config();

const useStyles = theme => ({
    
    menuButton: {
     
      marginRight: theme.spacing(1),
    },
    
  });

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
        anchorEl :false,
        open:false,
        id : this.props.id,
        noteIdList :[],
        addlabel : false,
        data : [],
        checked:false,
        setChecked : true,
        activeCheckboxes: [],
        noteLabel : this.props.noteLabel,
        email : '',
        firstName : ''


    };
  }
  componentDidMount=()=>{
      const email =  localStorage.getItem("email");
      const firstName = localStorage.getItem("firstName");
      this.setState({email : email,firstName : firstName})
  }
  handleClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
      open: !this.state.open
  });
}
logout=()=>{
    let data={}
    logout(data).then(response => {
        // console.log(response.data.data.details[0]);
       if (response.status === 204) {
        this.props.history.push({
            pathname: "/",
        });
       } else {
       }
    });
}
 render(){
    const {classes} = this.props;
     return(
        <div style={{ padding :'5px'}}  >
              <IconButton
                          size="medium"
                          color="black"
                          aria-label="open drawer"
                          onClick={this.handleClick}
                          edge="start"
                          className={clsx(classes.menuButton, this.state.open)}
                        >
                          <Avatar>
                          
                            </Avatar>
                        </IconButton>
        <Popover 
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        open={this.state.open}
        anchorEl={this.state.anchorEl}
        onClose={this.handleClick}
        style={{ cursor: 'pointer'}}>
           
           <div style={{width : '300px',height:'150px'}}>
               <div style={{display : 'flex',flexDirection : 'row',padding : '10px'}}>
                       <IconButton
                        //   size="medium"
                          color="black"
                          aria-label="open drawer"
                        //   onClick={this.handleClick}
                          edge="start"
                          className={clsx(classes.menuButton, this.state.open)}
                        >
                         <Avatar>
                          
                          </Avatar>
                        </IconButton>  
                        <div style={{display : 'flex',flexDirection : 'column',justifyContent : 'center'}}>
                        <Typography>{this.state.email}</Typography>
                        <Typography>{this.state.firstName}</Typography>

                        </div>
                       
                        </div>   
                        <Divider/>
                        <div onClick={this.logout}
                        style={{display : 'flex',justifyContent : 'flex-end',padding : '10px',border : '1px'}}>
                            LOGOUT
                        </div>
           </div>
    
        </Popover>
       
        
    </div> 
     )}}

     export default withStyles(useStyles)(Logout);