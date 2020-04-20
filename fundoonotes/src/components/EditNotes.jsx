import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import personAdd from '../assets/person_add.png'
import download from '../assets/download.png'
import galary from '../assets/galary.png'
import pin from '../assets/pin.svg'
import { getNotes,updateNotes,setNotes,archiveNote } from '../services/notesService'
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import setting from '../assets/setting.png'
import Color from './Color'
import DateTimePicker from './DateTimePicker'
import { changeColor , updateReminderNotes} from '../services/notesService'
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';


require('dotenv').config();


class EditNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
    next : true,
    value : '',
    show : [],
    description:this.props.data.description,
    open:false,
    anchorEl:null,
    setAnchorEl: null,
    date : this.props.data.reminder,
    datashow : false,
    date_timeshow:true,
    startdate:new Date(),
    collabshow : true,
    collabatorName : '',
    details : [],
    collabatorArray:[],
    collabatorValue :'',
    originalArray : [],
    tomorrow : '',
    pined : false,
    color : this.props.data.color,
    archived : false,
    timeTodayTommorow : '08:00:00',
    timepicker :'',
    dialogBoxOpen:false,
    noteId:'',
    data:this.props.data,
    title:this.props.data.title
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
    // if(this.state.title !='' ){
      const datetostring = this.state.date.toString();
      let data = {
        noteId : this.state.data.id,
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
  }
  getData=(val)=>{
    console.log(val)
    this.setState({color : val})
    document.getElementById("NoteExpand").style.background= val;

    let data={
      color : val,
      noteIdList : [this.state.data.id]
     }
     console.log(data)
     changeColor(data).then(response => {
       console.log(response);
      if (response.status === 200) {
        // this.props.sendupdate();
      } else {
          this.setState({  snackbarmsg: "Netwrork is slow", snackbaropen: true });
      }
   });

  }
  sendtimeDate=(date)=>{
    this.setState({date : date,date_timeshow : true,dateshow : false});
  }

  handleDelete = () => {
    this.setState({date : '',date_timeshow : false})
  };

  sendtimeDate=async(date,id)=>{
  await this.setState({date : date.toString()});
    console.log(date)
    let data={
      reminder : date ,
      noteIdList: [id]
    }
    console.log(data)
  
    updateReminderNotes(data).then(response => {
      console.log(response);
     if (response.status === 200) {
         
     } else {
         this.setState({  snackbarmsg: "Netwrork is slow", snackbaropen: true });
     }
  });
  
  }

  reminder = (reminder,id) =>{
    if(this.state.date != 0 ){
    return <div  className="typoText" style={{paddingTop :'10px',width : '150px'}}>
     <Chip
      style={{width : '240px'}}
      icon={<FaceIcon />}
      label={this.state.date}
      onDelete={()=>this.handleDelete(id)}
      color="white"
      value={this.state.date}
    />
    </div>
    }
    else{
      return null;
    }
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
        this.setState({ title : '',description : '',next : true,color : ''})
     } else {
         this.setState({  snackbarmsg: "Netwrork is slow", snackbaropen: true });
     }
  });
  }else
  {
    this.setState({ title : '',description : '',next : true})
  }
  }
  archivebutton=(data)=>{
    console.log(data.title)
    if(data.title !='' ){
      // {"isArchived":true,"noteIdList":["5e981759ad53b700227c5cb5"]}
      let data1={
        isArchived : true,
        noteIdList : [data.id]
      }
      console.log(data1)
    archiveNote(data1).then(response => {
      console.log(response);
     if (response.status === 200) {
        //  this.componentDidMount();
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
        
          <div className="paper3">
             <div id="NoteExpand" style={{backgroundColor :  this.state.color }}>
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
                      {this.state.date_timeshow ? this.reminder(this.state.date,this.state.data.id) : null }
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
                      <DateTimePicker  sendtimeDate={(date)=>this.sendtimeDate(date,this.state.data.id)}/>
                    <div  onClick={this.collabshow}>
                        <img src={personAdd} id="imgdashnotes" />
                    </div>
                    <div >
                    <Color sendColor={this.getData}/>
                    </div>
                    <div>
                        <img src={galary} id="imgdashnotes" />
                    </div>
                    <div onClick={()=>this.archivebutton(this.state.data)}>
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
        </div>
       
      )
  }
}
export default EditNotes;
