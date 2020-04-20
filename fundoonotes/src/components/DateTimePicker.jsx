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


class DateTimePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
        anchorEl :false,
        open:false,
        dateshow : false,
        date : new Date(),
        startdate:new Date(),
        tomorrow : '',
        timeTodayTommorow : '08:00:00',
        timepicker :'',


    };
  }
  componentDidMount=()=>{
   
    var d =new Date();
    d.setDate(new Date().getDate()+1)
    //  console.log(d.getTime())
     this.setState({ tomorrow : d,time : d.getHours() + ":" +d.getMinutes() + ":"+d.getSeconds()})
   
   }
  handleClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
      open: !this.state.open
  });
}
handleDateChange = (date) => {
    this.setState({startdate : date})
  };
  timepicker=(event) =>{
    this.setState({timepicker : event.target.value})

  }
  datesave=async()=>{
    await this.setState({date : this.state.startdate.toDateString()+" " + this.state.timepicker,date_timeshow : true,dateshow : false});
    this.props.sendtimeDate(this.state.date.toString());
    
  }
  todaydate=async()=>{
   await this.setState({date : new Date().toDateString() +" "+ this.state.timeTodayTommorow ,date_timeshow : true});
    this.props.sendtimeDate(this.state.date.toString());
  }
  tomorrowdate=async()=>{
    await this.setState({date : this.state.tomorrow.toDateString() +" "+ this.state.timeTodayTommorow,date_timeshow : true});
    this.props.sendtimeDate(this.state.date.toString());

  }
  dateshow=()=>{
    this.setState({dateshow : !this.state.dateshow})
  }
 render(){
     return(
     <div style={{ cursor: 'pointer'}}>
                        <img src={reminder} id="imgdashnotes" onClick={e=>this.handleClick(e)}/>
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
                          { this.state.dateshow ? 
                          <div>
                            <div style={{padding : '10px'}}>
                              <MuiPickersUtilsProvider utils={DateFnsUtils} >
                            <Grid container justify="space-around">
                              <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Date picker inline"
                                value={this.state.startdate}
                                onChange={date =>this.handleDateChange(date)}
                                KeyboardButtonProps={{
                                  'aria-label': 'change date',
                                }}
                              /></Grid></MuiPickersUtilsProvider>
                               <MuiPickersUtilsProvider utils={DateFnsUtils} >
                               <TextField
                                  id="time"
                                  label="Alarm clock"
                                  type="time"
                                  defaultValue="07:30"
                                   className="timepicker"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  inputProps={{
                                    step: 300, // 5 min
                                  }}
                                  onChange={this.timepicker}
                                  style={{width : '100%'}}
                                  />
                               </MuiPickersUtilsProvider>
                               <div onClick={this.datesave}  style={{height:"40px",padding : '10px',fontFamily : 'bold',cursor: 'pointer',display:'flex',justifyContent:"flex-end"}}>
                                 <div>save</div>
                                 </div></div>
                              </div>
                              :
                          <div style={{width : '170px',height : '170px',padding : '15px'}}>
                            <Typography style={{padding:'10px'}} onClick={this.todaydate}>Today</Typography>
                            <Typography style={{padding:'10px'}} onClick={this.tomorrowdate}>Tommorow</Typography>
                            <Typography style={{padding:'10px'}} onClick={this.dateshow}>pick date & time</Typography>
                          </div>
                          }
                        
                        </Popover>
                    </div>
     )}}

     export default DateTimePicker;