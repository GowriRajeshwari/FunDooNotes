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


class NewNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
    next : true,
    value : '',
    show : [],
    data:[],
    description:'',
    title:'',
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
    dialogBoxOpen:false
   
    };
  }
  handleDateChange = (date) => {
    this.setState({date : date})
  };
  componentDidMount=()=>{
   
   var d =new Date();
   d.setDate(new Date().getDate()+1)
    console.log(d.getTime())
    this.setState({ tomorrow : d,time : d.getHours() + ":" +d.getMinutes() + ":"+d.getSeconds()})
    getNotes().then(response => {
      console.log(response.data.data.data);
     if (response.status === 200) {
         
        this.setState({data : response.data.data.data});
        console.log(this.state.data[0].title)
     } else {
         this.setState({  snackbarmsg: "Netwrork is slow", snackbaropen: true });
     }
  });
  }
  takeNote=(event)=>{
    event.preventDefault();
    this.setState({next : false})
  }
 
  onchangeText=(event)=>{
    this.setState({description : event.target.value})
  }
  onChangeTitle=(event)=>{
    this.setState({title : event.target.value})
  }

  _onMouseMove=(event)=>{
    this.setState({show : true})
  }
  _onMouseOut=(event)=>{
    this.setState({show : false})
  }
  close=(event)=>{
    event.preventDefault();
    if(this.state.title !='' ){
      const datetostring = this.state.date.toString();
      let data = {
        title : this.state.title,
        description	: this.state.description,
        isPined : this.state.pined,
        color : this.state.color,
        isArchived : this.state.archived,
        labelIdList :[],
        reminder : datetostring,
        collaberator : this.state.originalArray
      }
      console.log(this.state.date)
      console.log(data)

    setNotes(data).then(response => {
      console.log(response);
     if (response.status === 200) {
        this.props.sendNewData();
        this.setState({ title : '',description : '',next : true})
     } else {
         this.setState({  snackbarmsg: "Netwrork is slow", snackbaropen: true });
     }
  });
  }else
  {
    this.setState({ title : '',description : '',next : true})
  }

  }
  timepicker=(event) =>{
    this.setState({timepicker : event.target.value})

  }

  handleClick = (event) => {
    // console.log("entered")
    this.setState({
      anchorEl: event.currentTarget,
      open: !this.state.open
  });
  };
  dateshow=()=>{
    this.setState({dateshow : !this.state.datashow})
  }
  back=()=>{
    console.log("back");
    this.setState({dateshow : false})
  }
  todaydate=()=>{
    this.setState({date : new Date().toDateString() +" "+ this.state.timeTodayTommorow ,date_timeshow : true});
  }
  tomorrowdate=()=>{
    this.setState({date : this.state.tomorrow.toDateString() +" "+ this.state.timeTodayTommorow,date_timeshow : true});
  }
  datesave=()=>{
    this.setState({date : this.state.startdate+" " + this.state.timepicker,date_timeshow : true});
  }
  
  handleDateChange = (date) => {
    this.setState({
      startdate: date.toDateString()
    });
  };
  collabshow=()=>{
    this.setState({collabshow : false})
  }
 
  onchangecollabator=async(event)=>{
   await this.setState({
      collabatorName: event.target.value  
  })
  let data = {
    searchWord : this.state.collabatorName
  }
  searchUserList(data).then(response => {
    // console.log(response.data.data.details[0]);
   if (response.status === 200) {
      this.setState({ details : response.data.data.details})
   } else {
   }
});
}
showingCollabator=(event)=>{
    this.setState({
        anchorEl: event.currentTarget,
        open: true
    });
}
collabatorClick=(dat)=>{
  this.setState({
    open : false,collabatorValue: dat
})
this.state.collabatorArray.push(dat)

}
collabsave=()=>{
  this.setState({collabshow : true,originalArray : this.state.collabatorArray})
}
time=()=>{
  this.setState({ timeShow : true})
}
archivebutton=async(event)=>{
  await this.setState({ archived : true })
  event.preventDefault();
  if(this.state.title !='' ){
    const datetostring = this.state.date.toString();
    let data = {
      title : this.state.title,
      description	: this.state.description,
      isPined : this.state.pined,
      color : this.state.color,
      isArchived : this.state.archived,
      labelIdList :[],
      reminder : datetostring,
      collaberator : this.state.originalArray
    }
    console.log(this.state.date)
    console.log(data)

  setNotes(data).then(response => {
    console.log(response);
   if (response.status === 200) {
       this.props.sendNewData();
      this.setState({ title : '',description : '',next : true})
   } else {
       this.setState({  snackbarmsg: "Netwrork is slow", snackbaropen: true });
   }
});
}else
{
  this.setState({ title : '',description : '',next : true})
}
}


getData=(val)=>{
  console.log(val)
  this.setState({color : val})
  document.getElementById("NoteExpand").style.background= val;
}



 render(){
     return(
        <div className="containerdash">
        {this.state.next ? 
            <div >
            <Paper className="paper" >
            <div>
            <Typography onClick={e => this.takeNote(e)} className="Typo">Take a Notes</Typography>
            </div>
            </Paper>

            </div>
          : 
             this.state.collabshow ?
          <Paper className="paper2">
             <div id="NoteExpand">

               <div className='showicon'>
                    <TextField
                        id="standard-multiline-flexible"
                        placeholder="Title"
                        multiline
                        rowsMax="4"
                        size="small"
                        style={{width:'100%'}}
                        onChange={this.onChangeTitle}
                        InputProps={{ disableUnderline: true }}
                      />
                      <div style={{ padding :'5px'}}>
                              <img src={pin} id="imgdashnotes" />
                      </div>
                    
                    </div>
                    <div>
                        <TextField
                        id="standard-multiline-flexible"
                        placeholder="Take a Note"
                        multiline
                        rowsMax="4"
                        size="small"
                        style={{width:'100%'}}
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
                    <div style={{ padding :'5px'}}  onClick={e=>this.handleClick(e)}>
                        <img src={reminder} id="imgdashnotes" />
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
                          {this.state.dateshow ? 
                          <div>
                           <div onClick={this.back}>X</div>
                            <div>
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
                                  />
                               </MuiPickersUtilsProvider>
                               <div onClick={this.datesave}>save</div></div>
                              </div>
                              :
                          <div style={{width : '170px',height : '170px',padding : '15px'}}>
                            <Typography style={{padding:'10px'}} onClick={this.todaydate}>Today</Typography>
                            <Typography style={{padding:'10px'}} onClick={this.tomorrowdate}>Tommorow</Typography>
                            <Typography style={{padding:'10px'}} onClick={this.dateshow}>pick date & time</Typography>
                          </div>}
                        
                        </Popover>
                    </div>
                    <div style={{ padding :'5px'}} onClick={this.collabshow}>
                        <img src={personAdd} id="imgdashnotes" />
                    </div>
                    <div style={{ padding :'5px'}}>
                    
                        <Color sendColor={this.getData}/>
                    </div>
                    <div style={{ padding :'5px'}}>
                    {/* <button className='iconbtn'> */}
                        <img src={galary} id="imgdashnotes" />
                        {/* </button> */}
                    </div>
                    <div style={{ padding :'5px'}} onClick={this.archivebutton}>
                        <img src={download} id="imgdashnotes" />
                    </div>
                    <div style={{ padding :'5px'}}>
                        <img src={setting} id="imgdashnotes" />
                    </div> 
                    
                    </div>

                              
                    <div className="button">
                    <Button size="small" onClick={e => this.close(e)}>Close</Button>
                    </div>

                  </div>
        </Paper>
          :

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
         
    }
    </div>
)}
 }

 export default NewNote;