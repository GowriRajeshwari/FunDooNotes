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
    archived : false
   
    };
  }
   handleDateChange = (date) => {
    this.setState({date : date})
  };
  componentDidMount=()=>{
   
   var d = this.state.date;
   d.setDate(new Date().getDate()+1)
    console.log(d.getTime())
    this.setState({ tomorrow : d,time : d.getHours() + ":" +d.getMinutes() + ":"+d.getSeconds()})
    getNotes().then(response => {
      console.log(response.data.data.data);
     if (response.status === 200) {
         
        this.setState({data : response.data.data.data});
        // console.log(this.state.data.length)
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
        remainder : datetostring,
        collaberator : this.state.originalArray
      }
      console.log(this.state.date)
      console.log(data)

    setNotes(data).then(response => {
      console.log(response);
     if (response.status === 200) {
         
        // this.setState({data : response.data.data.data});
       
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
    this.setState({date : new Date(),date_timeshow : true});
  }
  tomorrowdate=()=>{
    this.setState({date : this.state.tomorrow,date_timeshow : true});
  }
  datesave=()=>{
    this.setState({date : this.state.startdate ,date_timeshow : true});
  }
  
  handleDateChange = (date) => {
    this.setState({
      startdate: date
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






  render() {
    
    return (
      <div className='maincontainer'>
        <div className="containerdash">
        {this.state.next ? 
            <div>
            <Paper className="paper">
            
            <Typography onClick={e => this.takeNote(e)} className="Typo">Take a Notes</Typography>
          
            </Paper>
            </div>
          : 
             this.state.collabshow ?
          <Paper className="paper2">
             <div className="NoteExpand">
               <div className='showicon'>
                    <TextField
                        id="standard-multiline-flexible"
                        label="Title"
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
                        label="  Take a Note"
                        multiline
                        rowsMax="4"
                        size="small"
                        style={{width:'100%'}}
                        onChange={this.onchangeText}
                        InputProps={{ disableUnderline: true }}
                      />
                      </div>
                      {this.state.date_timeshow ? <div>{this.state.date.toDateString()}</div> : null}
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
                    <div style={{ padding :'5px'}}>
                      <button className='iconbtn' onClick={e=>this.handleClick(e)}>
                        <img src={reminder} id="imgdashnotes" />
                        </button>
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
                                <Typography
                                 id="btn"
                                 value={this.state.time}
                              onClick={e => this.time(e)}>{this.state.time}</Typography>
                               {/* {this.state.timeShow ? 
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
                                    <div>Morning   8 : 00</div>
                                    <div>AfterNoon 1 : 00</div>
                                    <div>Evening   5 : 00</div>
                                    <div>Night     8 : 00</div>
                                 </Popover>
 
                                  : null} */}
                               </MuiPickersUtilsProvider>
                                 
                              

                               <div onClick={this.datesave}>save</div></div>
                              </div>
                              :
                          <div>
                            <div onClick={this.todaydate}>Today</div>
                            <div  onClick={this.tomorrowdate}>Tommorow</div>
                            <div onClick={this.dateshow}>pick date & time</div>
                          </div>}
                        
                        </Popover>
                    </div>
                    <div style={{ padding :'5px'}}>
                    <button className='iconbtn' onClick={this.collabshow}>
                        <img src={personAdd} id="imgdashnotes" />
                     </button>
                    </div>
                    <div style={{ padding :'5px'}}>
                    <button className='iconbtn'>
                        <img src={color} id="imgdashnotes" />
                        </button>
                    </div>
                    <div style={{ padding :'5px'}}>
                    <button className='iconbtn'>
                        <img src={galary} id="imgdashnotes" />
                        </button>
                    </div>
                    <div style={{ padding :'5px'}}>
                    <button className='iconbtn'>
                        <img src={download} id="imgdashnotes" />
                        </button>
                    </div>
                    <div style={{ padding :'5px'}}>
                    <button className='iconbtn'>
                        <img src={setting} id="imgdashnotes" />
                        </button>
                    </div> </div>

                              
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
    <div className="mydivouter">	
	<input type="button" className="mybuttonoverlap" value="Read More"/>
</div>
    <div className='notescontainer'>
    {this.state.data.map((data, index) => (
    <div key={index} onMouseMove={this._onMouseMove} onMouseLeave={this._onMouseOut} 
    style={{width : '350px',borderRadius:'10px',cursor:'pointer',padding:'20px'}}>  
      <Card  className="mydivouter">
      <CardContent>
        <div className='showicon'>
                      <Typography variant="h6" component="h2">
                        {data.title}
                      </Typography>
                        <div className="mybuttonoverlap" style={{ padding :'5px'}}>
                              <img src={pin} id="imgdashnotes" />
                      </div> 
                     
          </div>
        <Typography color="textSecondary" gutterBottom>
         {data.description}
        </Typography>
        <div  className="mybuttonoverlap" style={{height:'60px'}}>



        <div style={{ display : 'flex', flexDirection:'row',paddingTop : '10px'}}>          
        <div style={{ padding :'5px',display:'flex'}}>
          <button className='iconbtn' >
            <img src={reminder} id="imgdashnotes" />
            </button>
         
        </div>
        <div style={{ padding :'5px'}}>
            <button className='iconbtn' >
            <img src={personAdd} id="imgdashnotes" />
            </button>
           
        </div>
       
        <div style={{ padding :'5px'}}>
        <button className='iconbtn'>
            <img src={color} id="imgdashnotes" />
            </button>
        </div>
        <div style={{ padding :'5px'}}>
        <button className='iconbtn'>
            <img src={galary} id="imgdashnotes" />
            </button>
        </div>
        <div style={{ padding :'5px'}}>
        <button className='iconbtn'>
            <img src={download} id="imgdashnotes" />
            </button>
        </div> 
        <div style={{ padding :'5px'}}>
        <button className='iconbtn' onClick={this.setting}>
            <img src={setting} id="imgdashnotes" />
            </button>
        </div>
        </div>
        

        </div>
      </CardContent>
     
    </Card>
    </div>
    ))}
    </div>
    
       
      </div>
    );
  }
}
export default TakeaNotes;