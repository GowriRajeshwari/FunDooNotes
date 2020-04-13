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
import { getNotes,setNotes } from '../services/notesService'
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


class Collaborator extends Component {
  constructor(props) {
    super(props);
    this.state = {
     


    };
  }

 render(){
     return(
         
        <div>
        <Paper className="paper2">
          <div onClick={this.collabsave}>collabatore</div>
          <Divider/>
          <div></div>
          <div></div>
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
                           <List>
                    {this.state.details.map((details, index) => (
                      <ListItem button onClick={() => this.collabatorClick(details.firstName)} key={index}>
                        <ListItemAvatar>
                          <Avatar >
                            <PersonIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={details.firstName} />
                        <ListItemText primary={details.email} />

                      </ListItem>
                    ))}
                    </List>

                        </Popover>


                        <List>
                    {this.state.collabatorArray.map((collabatorArray, index) => (
                      <ListItem key={index}>
                        <ListItemAvatar>
                          <Avatar >
                            <PersonIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={collabatorArray} />
                      </ListItem>
                    ))}
                    </List>


                    <input
                    id="btn"
                    variant="outlined"
                    label="Emails"
                    value={this.state.collabatorName}
                     onChange={this.onchangecollabator}
                     onClick={e => this.showingCollabator(e)}
                  />
          <div onClick={this.collabsave}>save</div>

        </Paper>
        </div>
     )}}

     export default Collaborator;