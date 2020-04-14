import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import profile from '../assets/profile.png';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { login } from "../services/LoginService"
import { Typography } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Divider from '@material-ui/core/Divider';
import Popper from '@material-ui/core/Popper';
import Popover from '@material-ui/core/Popover';
import reminder from '../assets/reminder.svg'
import personAdd from '../assets/person_add.png'
import color from '../assets/color.png'
import download from '../assets/download.png'
import galary from '../assets/galary.png'
import pin from '../assets/pin.svg'
import {searchUserList} from '../services/notesService'
import { getNotes,setNotes,deleteNotes } from '../services/notesService'
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
import Color from './Color'
import EditNotes from './EditNotes'
require('dotenv').config();


class DeleteIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
        anchorEl :false,
        open:false,
        id : this.props.id,
        noteIdList :[]


    };
  }

  handleClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
      open: !this.state.open
  });
}

  deletebutton=async(id)=>{
    console.log(id)
    await this.state.noteIdList.push(id.toString());
    let data={
      isDeleted : true,
      noteIdList : this.state.noteIdList
    }
    console.log(data)
    deleteNotes(data).then(response => {
      console.log(response);
     if (response.status === 200) {
         this.setState({noteIdList : []});
         this.props.sendtrash(true);
     } else {
         this.setState({  snackbarmsg: "Netwrork is slow", snackbaropen: true });
     }
  });
  
  }
 render(){
     return(
        <div style={{ padding :'5px'}}  onClick={e=>this.handleClick(e)}>
        <img src={setting} id="imgdashnotes" />
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
        onClose={this.handleClick}>
            <div style={{width : '200px',height:"20px"}} onClick={()=>this.deletebutton(this.state.id)}>
              DELETE</div>
        
        </Popover>
    </div> 
     )}}

     export default DeleteIcon;