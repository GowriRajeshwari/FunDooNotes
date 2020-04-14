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
import { getNotes,updateNotes } from '../services/notesService'
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
import DeleteIcon from './DeleteIcon'
import DateTimePicker from './DateTimePicker'
require('dotenv').config();


class EditNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
    next : true,
    value : '',
    show : [],
    data:[],
    description:this.props.description,
    title:this.props.title,
    open:false,
    anchorEl:null,
    setAnchorEl: null,
    date : new Date(),
    datashow : false,
    date_timeshow:false,
    startdate:new Date(),
    collabshow : true,
    collabatorName : '',
    details : [],
    collabatorArray:[],
    collabatorValue :'',
    originalArray : [],
    tomorrow : '',
    pined : false,
    color : '',
    archived : false,
    timeTodayTommorow : '08:00:00',
    timepicker :'',
    dialogBoxOpen:false,
    noteId:this.props.id
   
    };
  }
  onchangeText=(event)=>{
    this.setState({description : event.target.value})
  }
  onChangeTitle=(event)=>{
    this.setState({title : event.target.value})
  }
  close=(event)=>{
    event.preventDefault();
    if(this.state.title !='' ){
      const datetostring = this.state.date.toString();
      let data = {
        noteId : this.state.noteId,
        title : this.state.title,
        description	: this.state.description,
  
      }
      console.log(data)

      updateNotes(data).then(response => {
      console.log(response);
     if (response.status === 200) {
        this.props.sendupdate();
     } else {
         this.setState({  snackbarmsg: "Netwrork is slow", snackbaropen: true });
     }
  });
  }else
  {
    this.setState({ title : '',description : '',next : true})
  }

  }
  render(){
      return(
        <div>
          <Paper className="paper3">
             <div id="NoteExpand">

               <div className='showicon' style={{paddingTop : '10px'}}>
                    <TextField
                        id="standard-multiline-flexible"
                        placeholder="Title"
                        multiline
                        rowsMax="4"
                        size="small"
                        style={{width:'100%'}}
                        value={this.state.title}
                        onChange={this.onChangeTitle}
                        InputProps={{ disableUnderline: true }}
                      />
                      <div style={{ padding :'5px'}}>
                              <img src={pin} id="imgdashnotes" />
                      </div>
                    
                    </div>
                    <div style={{paddingTop : '20px'}}>
                        <TextField
                        id="standard-multiline-flexible"
                        placeholder="Take a Note"
                        multiline
                        rowsMax="4"
                        size="small"
                        style={{width:'100%'}}
                        value={this.state.description}
                        onChange={this.onchangeText}
                        InputProps={{ disableUnderline: true }}
                      />
                      </div>
                      {this.state.date_timeshow ? <div style={{paddingTop : '10px'}}>{this.state.date}</div> : null}
                      <List>
                    {this.state.originalArray.map((originalArray, index) => (
                      <ListItem key={index}>
                        <ListItemAvatar>
                          <Avatar >
                            <PersonIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={originalArray} />
                        
                      </ListItem>
                    ))}
                    </List>
                      <div style={{ display : 'flex', flexDirection:'row',paddingTop : '10px',justifyContent:'space-around'}}>          
                    <DateTimePicker sendtimeDate={this.sendtimeDate}/>
                    <div  onClick={this.collabshow}>
                        <img src={personAdd} id="imgdashnotes" />
                    </div>
                    <div >
                    
                        <Color sendColor={this.getData}/>
                    </div>
                    <div>
                        <img src={galary} id="imgdashnotes" />
                    </div>
                    <div  onClick={this.archivebutton}>
                        <img src={download} id="imgdashnotes" />
                    </div>
                    <div >
                        <img src={setting} id="imgdashnotes" />
                    </div> 
                    <div style={{display : 'flex',justifyContent :'center'}}>
                    <Button size="small"  onClick={e => this.close(e)}>Close</Button>
                    </div>
                    </div>

                              
                    

                  </div>
        </Paper>
        </div>
      )
  }
}
export default EditNotes;
