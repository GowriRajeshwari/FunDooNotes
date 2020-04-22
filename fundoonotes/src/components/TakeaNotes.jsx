import React, { Component } from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import personAdd from '../assets/person_add.png'
import color from '../assets/color.png'
import download from '../assets/download.png'
import galary from '../assets/galary.png'
import pin from '../assets/pin.svg'
import {searchUserList} from '../services/notesService'
import { getNotes,setNotes,deleteNotes,removeRemainderNotes,updateReminderNotes,changeColor,archiveNote,deletelabelNotes } from '../services/notesService'
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import { blue } from '@material-ui/core/colors';
import setting from '../assets/setting.png'
import Color from './Color'
import EditNotes from './EditNotes'
import NewNote from './NewNote'
import DeleteIcon from './DeleteIcon'
import DateTimePicker from './DateTimePicker'
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import schedule from '../assets/schedule.png'
import { Typography } from "@material-ui/core";
import List from '@material-ui/core/List';


require('dotenv').config();

function searchigFor(query){
  return function(x){
    return x.title.toLowerCase().includes(query.toLowerCase())||x.description.toLowerCase().includes(query.toLowerCase())||!query;
  }
}
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
    noteIdList :[],
    nonDeleteData:[],
    query : this.props.query,
    editdata : [],
    noteLabels:[]
      
    };
  }

  // componentWillReceiveProps(nextProps){
  //   const {gridView} = this.props
  //   if(nextProps.gridView !== gridView){
  //     this.setState({ gridView })
  //   }
  // }
 
   handleDateChange = (date) => {
    this.setState({date : date})
  };
  componentDidMount=()=>{
  //  this.setState({gridView : this.props.gridView})
   var d =new Date();
   d.setDate(new Date().getDate()+1)
    console.log(d.getTime())
    this.setState({ tomorrow : d,time : d.getHours() + ":" +d.getMinutes() + ":"+d.getSeconds()})
    getNotes().then(response => {
      console.log(response.data.data.data);
     if (response.status === 200) {
          this.setState({data : []})
        
        // this.setState({data : response.data.data.data});
        for(let i=0;i<response.data.data.data.length;i++){
          if(response.data.data.data[i].isDeleted != true && response.data.data.data[i].isArchived != true ){
            this.state.data.push(response.data.data.data[i]);
          }else{
            continue;
          }
        }
        this.setState({data : this.state.data})
        console.log(this.state.data);
        // for(let i=0;i<response.data.data.data.length;i++){
        //     this.state.noteLabels.push(response.data.data.data[i].noteLabels);
        // }
        // this.setState({noteLabels : this.state.noteLabels})
        // console.log(this.state.noteLabels);
      
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
       this.componentDidMount();
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
sendNewData=()=>{
  this.componentDidMount();
}

sendtimeDate=(date)=>{
  this.setState({date : date,date_timeshow : true,dateshow : false});
}
sendtrash=(val)=>{
  if(val == true){
  this.componentDidMount();

  }
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
reminder = (reminder,id) =>{
  if(reminder != 0 ){
  return <div  className="typoText" style={{paddingTop :'10px',width : '150px'}}>
   <Chip
    style={{width : '240px'}}
    icon={ <img src={schedule} />}
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
archived=()=>{
  this.componentDidMount();
}
handleDeletelabel=(labelId,id)=>{
  console.log(labelId,id)
  deletelabelNotes(id,labelId).then(response => {
    console.log(response);
   if (response.status === 200) {
      this.componentDidMount()
  } else {
       this.setState({  snackbarmsg: "Netwrork is slow", snackbaropen: true });
   }
});
}
  render() {
    
    return (
      <div className='maincontainer'>
          <NewNote sendNewData={this.sendNewData}/>
    
    <div className='notescontainer'>
    {this.state.data.filter(searchigFor(this.props.query)).map((data, index) => {
      // if(data.isDeleted != true && data.isArchived !=true)
    return <div key={index} onMouseMove={this._onMouseMove} onMouseLeave={this._onMouseOut} 
    style={{borderRadius:'20px',cursor:'pointer',padding:'20px'}} >  
      <Card  className={this.props.gridView ? "mydivoutergrid" : "mydivouter" } style={{backgroundColor :  this.state.data[index].color }}>
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
         { data.noteCheckLists.map((notelist, index) => (
          //  console.log(noteCheckLists)
                      <List>
                 <div className="textdash">

                   <Typography style={{width : '100%'}}>{notelist.itemName}</Typography>
                   
                    </div>

                    </List>
                    ))

                   } 
                 <div style={{display:'flex',flexWrap:'wrap',flexDirection : 'row',width:'190px',padding : '5px'}}>

                   { data.noteLabels.map((labelNotes, index) => (
                      
                    <div style={{padding : '5px'}}>
                    <Chip key={index}
                      style={{width : 'auto'}}
                      label={labelNotes.label}
                      onDelete={()=>this.handleDeletelabel(labelNotes.id,data.id)}
                      color="white"
                      value={this.state.date}
                    />
                    </div>
                    ))
                   } 

                   </div>

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
                    <div style={{ padding :'5px'}} onClick={()=>this.archivebutton(data)}>
                        <img src={download} id="imgdashnotes" />
                    </div>
                    <DeleteIcon id={data.id} sendtrash={this.sendtrash} noteLabel={data.noteLabels}/>
                    
                    </div>

        

        </div>
        
      </div>
     
    </Card>

    </div>
    
    })}
    </div>
            <Dialog
            open={this.state.dialogBoxOpen}
            onClose={this.handelNoteDialogBox}
            >
                <EditNotes data={this.state.editdata}
                sendupdate={this.getdataupdate} />
              </Dialog>
              {/* <Edit dialogBoxOpen="true" labeldata={this.labeldata} /> */}
              </div>
    );
  }
}
export default TakeaNotes;