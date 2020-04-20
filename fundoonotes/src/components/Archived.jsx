import React, { Component } from "react";
import {archiveNoteList ,archiveNote,updateReminderNotes,changeColor,removeRemainderNotes} from '../services/notesService'
import { Typography } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import reminder from '../assets/reminder.svg'
import personAdd from '../assets/person_add.png'
import color from '../assets/color.png'
import download from '../assets/download.png'
import galary from '../assets/galary.png'
import pin from '../assets/pin.svg'
import unarchive from '../assets/unarchive.png'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import DeleteIcon from './DeleteIcon'
import DateTimePicker from './DateTimePicker'
import Color from './Color'
import Dialog from '@material-ui/core/Dialog';
import EditNotes from './EditNotes'
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';





function searchigFor(query){
  return function(x){
    return x.title.toLowerCase().includes(query.toLowerCase())||x.description.toLowerCase().includes(query.toLowerCase())||!query;
  }
}
class Archived extends Component {
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
      color : '',
      archived : false,
      timeTodayTommorow : '08:00:00',
      timepicker :'',
      dialogBoxOpen:false,
      noteIdList : [],
      query : this.props.query

    
    };
  }


  componentDidMount=()=>{
  
    archiveNoteList().then(response => {
       console.log(response);
      if (response.status === 200) {
          
        this.setState({data : response.data.data.data});
        console.log(this.state.data[0].id)
        
      } else {
          this.setState({  snackbarmsg: "Netwrork is slow", snackbaropen: true });
      }
   });
   }

   archiveddata=async(dat)=>{
        await this.state.noteIdList.push(dat.toString())
        console.log(this.state.noteIdList);
       let data1 = {
           isArchived : false,
           noteIdList : this.state.noteIdList
       }
       archiveNote(data1).then(response => {
        console.log(response);
       if (response.status === 200) {
           
         this.componentDidMount();
         
       } else {
           this.setState({  snackbarmsg: "Netwrork is slow", snackbaropen: true });
       }
    });
   }
   getData=(val,index)=>{
    console.log(val,index)
    this.setState({color : val})
    document.getElementsByClassName("mydivouter")[index].style.backgroundColor= val;
  }
  sendtimeDate=(date)=>{
    this.setState({date : date,date_timeshow : true,dateshow : false});
  }
  sendtrash=(val)=>{
    this.componentDidMount();
  }
  dateshow=()=>{
    this.setState({dateshow : !this.state.datashow})
  }
  dialogboxOpen=(data)=>{
    console.log(data);
    this.setState({
      dialogBoxOpen: !this.state.dialogBoxOpen,
     editdata:data
    })
  
  }
  handelNoteDialogBox = () => {
    this.setState({
      dialogBoxOpen: !this.state.dialogBoxOpen
    }) 
    this.componentDidMount();
  
  }
  getdataupdate=()=>{
    this.handelNoteDialogBox();
    this.componentDidMount();
  }
  sendtrash=(val)=>{
    if(val == true){
    this.componentDidMount();
  
    }
  }
  archiveddata=async(dat)=>{
    await this.state.noteIdList.push(dat.toString())
    console.log(this.state.noteIdList);
   let data1 = {
       isArchived : false,
       noteIdList : this.state.noteIdList
   }
   archiveNote(data1).then(response => {
    console.log(response);
   if (response.status === 200) {
       
     this.componentDidMount();
     
   } else {
       this.setState({  snackbarmsg: "Netwrork is slow", snackbaropen: true });
   }
});
}
  getData=(val,index,id)=>{
    console.log(val,index,id)
    this.setState({color : val})
    document.getElementsByClassName("mydivouter")[index].style.backgroundColor= val;
  
    let data={
     color : val,
     noteIdList : [id]
    }
    console.log(data)
    changeColor(data).then(response => {
      console.log(response);
     if (response.status === 200) {
         
        this.componentDidMount();
     } else {
         this.setState({  snackbarmsg: "Netwrork is slow", snackbaropen: true });
     }
  });
  
  }
  handleDelete = (id) => {
    this.setState({date : '',date_timeshow : true})
    let data={
      noteIdList : [id]
    }
    console.log(data)
    removeRemainderNotes(data).then(response => {
      console.log(response);
     if (response.status === 200) {
         
        this.componentDidMount();
     } else {
         this.setState({  snackbarmsg: "Netwrork is slow", snackbaropen: true });
     }
  });
  };
  
sendtimeDate=(date,id)=>{
  console.log(date)
  let data={
    reminder : date ,
    noteIdList: [id]
  }
  console.log(data)

  updateReminderNotes(data).then(response => {
    console.log(response);
   if (response.status === 200) {
       
      this.componentDidMount();
   } else {
       this.setState({  snackbarmsg: "Netwrork is slow", snackbaropen: true });
   }
});

}
handleClick = (event) => {
  // console.log("entered")
  this.setState({
    anchorEl: event.currentTarget,
    open: !this.state.open
});
};
reminder = (reminder,id) =>{
  if(reminder != 0 ){
  return <div  className="typoText" style={{paddingTop :'10px',width : '150px'}}>
   <Chip
    style={{width : '240px'}}
    icon={<FaceIcon />}
    label={reminder}
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
  render() {
    return (
      <div className='notescontainer'>
      {this.state.data.filter(searchigFor(this.props.query)).map((data, index) => {
        // if(data.isDeleted != true && data.isArchived !=true)
      return <div key={index} onMouseMove={this._onMouseMove} onMouseLeave={this._onMouseOut} 
      style={{borderRadius:'20px',cursor:'pointer',padding:'20px'}} >  
        <Card  className="mydivouter" style={{backgroundColor :  this.state.data[index].color }}>
        <div style={{padding : '10px'}}>
          <div className='showicon'>
                        <div  className="typoText">
                          {data.title}
                        </div>
                          <div className="mybuttonoverlap" style={{ padding :'5px'}}>
                                <img src={pin} id="imgdashnotes" />
                        </div> 
                       
            </div>
          <div  className="typoText"
          onClick={()=>this.dialogboxOpen(data)}>
           {data.description}
          </div> 
          {this.state.date_timeshow ? this.reminder(data.reminder,data.id) : null }
           
  
          <div  className="mybuttonoverlap" >
  
  
  
          <div style={{ display : 'flex', flexDirection:'row',paddingTop : '5px',justifyContent:'space-around'}}>          
  
           <div style={{ padding :'5px'}}  onClick={e=>this.handleClick(e)}>
                       <DateTimePicker  sendtimeDate={(date)=>this.sendtimeDate(date,data.id)}/>
                      </div>
                      <div style={{ padding :'5px'}} onClick={this.collabshow}>
                          <img src={personAdd} id="imgdashnotes" />
                      </div>
                      <div style={{ padding :'5px'}}>
                      
                          <Color index={index} sendColor={(val,index)=>this.getData(val,index,data.id)}/>
                      </div>
                      <div style={{ padding :'5px'}}>
                          <img src={galary} id="imgdashnotes" />
                      </div>
                      <div style={{ padding :'5px'}} onClick={() => this.archiveddata(data.id)}  key={index}>
                        <img src={unarchive} id="imgdashnotes" />
                      </div>
                      <DeleteIcon id={data.id} sendtrash={this.sendtrash}/>
                      
                      </div>
  
          
  
          </div>
          
        </div>
       
      </Card>
  
      </div>
      
      })}
       <Dialog
              open={this.state.dialogBoxOpen}
              onClose={this.handelNoteDialogBox}
              >
                  <EditNotes data={this.state.editdata}
                  sendupdate={this.getdataupdate}/>
                </Dialog>
      </div>
             
                
        
    );
  }
}
export default Archived;