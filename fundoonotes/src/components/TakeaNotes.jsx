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
import NewNote from './NewNote'
require('dotenv').config();


class TakeaNotes extends Component {
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
        this.componentDidMount();
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

colorboxbutton=()=>{
//  return <Color/>
}
getData=(val,index)=>{
  console.log(val,index)
  this.setState({color : val})
  document.getElementsByClassName("mydivouter")[index].style.backgroundColor= val;
}
dialogboxOpen=(title,description,id)=>{
  console.log(id);
  this.setState({
    dialogBoxOpen: !this.state.dialogBoxOpen,
    title : title,
    description : description,
    id : id
  })

}
handelNoteDialogBox = () => {
  this.setState({
    dialogBoxOpen: !this.state.dialogBoxOpen
  }) 
}
getdataupdate=()=>{
  this.handelNoteDialogBox();
  this.componentDidMount();
}
sendNewData=()=>{
  this.componentDidMount();
}
deletebutton=(id)=>{
  // {"isDeleted":true,"noteIdList":["5e917458ad53b700227c5c56"]}
  let data={
    isDeleted : true,
    noteIdList : id
  }
}
  render() {
    
    return (
      <div className='maincontainer'>
          <NewNote sendNewData={this.sendNewData}/>
    
    <div className='notescontainer'>
    {this.state.data.map((data, index) => (
    <div key={index} onMouseMove={this._onMouseMove} onMouseLeave={this._onMouseOut} 
    style={{borderRadius:'10px',cursor:'pointer',padding:'20px'}} >  
      <Card  className="mydivouter" style={{backgroundColor :  this.state.data[index].color }}>
      <CardContent>
        <div className='showicon'>
                      <Typography variant="h6" component="h1" className="typoText">
                        {data.title}
                      </Typography>
                        <div className="mybuttonoverlap" style={{ padding :'5px'}}>
                              <img src={pin} id="imgdashnotes" />
                      </div> 
                     
          </div>
        <Typography color="textSecondary"  
        onClick={()=>this.dialogboxOpen(data.title,data.description,data.id)}>
         {data.description}
        </Typography>
        <Typography color="textSecondary">
         {data.reminder}
        </Typography>

        <div  className="mybuttonoverlap" style={{height:'60px'}}>



        <div style={{ display : 'flex', flexDirection:'row',paddingTop : '10px'}}>          

         <div style={{ padding :'5px'}}  onClick={e=>this.handleClick(e)}>
                        <img src={reminder} id="imgdashnotes" />
                        {/* <Popover 
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
                        
                        </Popover> */}
                    </div>
                    <div style={{ padding :'5px'}} onClick={this.collabshow}>
                        <img src={personAdd} id="imgdashnotes" />
                    </div>
                    <div style={{ padding :'5px'}}>
                    
                        <Color index={index} sendColor={this.getData}/>
                    </div>
                    <div style={{ padding :'5px'}}>
                        <img src={galary} id="imgdashnotes" />
                    </div>
                    <div style={{ padding :'5px'}} onClick={this.archivebutton}>
                        <img src={download} id="imgdashnotes" />
                    </div>
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
                            <div style={{width : '200px',height:"20px"}} onClick={()=>this.deletebutton(data.id)}>
                              DELETE</div>
                        
                        </Popover>
                    </div> 
                    
                    </div>

        

        </div>
        
      </CardContent>
     
    </Card>

    </div>
    
    ))}
    </div>
            <Dialog
            open={this.state.dialogBoxOpen}
            onClose={this.handelNoteDialogBox}
            >
                <EditNotes title={this.state.title} description={this.state.description} id={this.state.id}
                sendupdate={this.getdataupdate}/>
              </Dialog>
              </div>
    );
  }
}
export default TakeaNotes;