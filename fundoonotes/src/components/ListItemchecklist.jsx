import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import personAdd from '../assets/person_add.png'
import color from '../assets/color.png'
import download from '../assets/download.png'
import galary from '../assets/galary.png'
import pin from '../assets/pin.svg'
import { Typography } from "@material-ui/core";
import {searchUserList} from '../services/notesService'
import Divider from '@material-ui/core/Divider';
import { getNotes,setNotes } from '../services/notesService'
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import setting from '../assets/setting.png'
import Color from './Color'
import EditNotes from './EditNotes'
import DateTimePicker from './DateTimePicker'
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import list_black from '../assets/list_black.png'
import delete1 from '../assets/delete.png';
import add from '../assets/add.png';
import clear from '../assets/clear.png';
import checkboxoutline from '../assets/checkboxoutline.png';
import checkboxtick from '../assets/checkboxtick.png';
import LabelNotes from './LabelNotes'
import Collaborator from './Collaborator'
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';


require('dotenv').config();


class ListItemchecklist extends Component {
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
    date : '',
    dateshow : false,
    date_timeshow:false,
    startdate:new Date(),
    collabshow : false,
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
    items : '',
    itemsArray:[],
    listallitems : false,
    tickboxArray:[],
    tickbox:false,
    labelIdList :[],
    labelNotes:[]
   
    };
  }
  handleDateChange = (date) => {
    this.setState({date : date})
  };
  componentDidMount=()=>{
   console.log("ddddddd")
   var d =new Date();
   d.setDate(new Date().getDate()+1)
    console.log(d.getTime())
    this.setState({ tomorrow : d,time : d.getHours() + ":" +d.getMinutes() + ":"+d.getSeconds()})
 
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
  close=async(event)=>{
    event.preventDefault();
    for(let i=0;i< this.state.labelNotes.length;i++){
      this.state.labelIdList.push( this.state.labelNotes[i].id)
      console.log( this.state.labelNotes[i].id)
      }
      await this.setState({labelIdList : this.state.labelIdList})
    const combineArray =this.state.itemsArray.concat(this.state.tickboxArray);
    const datetostring = this.state.date.toString();
    console.log(combineArray)
    if(this.state.title !='' ){
      const form_data = new FormData();
      form_data.append("title", this.state.title);
      form_data.append("description", this.state.description);
      form_data.append("reminder", datetostring);
      form_data.append("isPined", this.state.pined);
      form_data.append("isArchived", this.state.archived);
      form_data.append("color", this.state.color);
      form_data.append("labelIdList", JSON.stringify(this.state.labelIdList));
      form_data.append("collaberators", JSON.stringify(this.state.originalArray));
      form_data.append("checklist", JSON.stringify(combineArray));

      let data = {
        title : this.state.title,
        isPined : this.state.pined,
        color : this.state.color,
        isArchived : this.state.archived,
        labelIdList :this.state.labelIdList,
        reminder : datetostring,
        collaberator : this.state.originalArray,
        checklist : combineArray

      }
      console.log(data)
  
    setNotes(form_data).then(response => {
      console.log(response);
     if (response.status === 200) {
        this.props.sendlist();
        this.setState({itemsArray:[],tickboxArray : [],title:'',next:true,items :''})
     } else {
         this.setState({  snackbarmsg: "Netwrork is slow", snackbaropen: true });
     }
  
  });}
  else{
    this.props.sendlist();

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
    this.setState({dateshow : !this.state.dateshow})
  }
  back=()=>{
    console.log("back");
  }
  todaydate=()=>{
    this.setState({date : new Date().toDateString() +" "+ this.state.timeTodayTommorow ,date_timeshow : true});
  }
  tomorrowdate=()=>{
    this.setState({date : this.state.tomorrow.toDateString() +" "+ this.state.timeTodayTommorow,date_timeshow : true});
  }
  datesave=()=>{
    this.setState({date : this.state.startdate+" " + this.state.timepicker,date_timeshow : true,dateshow : false});
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
// showingCollabator=(event)=>{
//     this.setState({
//         anchorEl: event.currentTarget,
//         open: true
//     });
// }
// collabatorClick=(dat)=>{
//   this.setState({
//     open : false,collabatorValue: dat
// })
// this.state.collabatorArray.push(dat)

// }
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


getData=(val)=>{
  console.log(val)
  this.setState({color : val})
  document.getElementById("NoteExpand").style.background= val;
}
sendtimeDate=(date)=>{
  this.setState({date : date,date_timeshow : true,dateshow : false});
}

handleDelete = () => {
  this.setState({date : '',date_timeshow : false})
};
additem=async()=>{

   let listData = { itemName: this.state.items, status: "open" };

   this.state.itemsArray.push(listData)
  this.setState({listallitems : true,items:''})



}
onchangelistItem=(event)=>{
  this.setState({items : event.target.value})
}
checkboxoutline=async(arrayvalue)=>{
  console.log(arrayvalue)
    let listData = { itemName: arrayvalue, status: "close" };
     this.state.tickboxArray.push(listData);
     await this.setState({tickboxArray : this.state.tickboxArray })
    const index = this.state.itemsArray.findIndex(itemsArray => itemsArray.itemName === arrayvalue);
    // const index= this.state.itemsArray.indexOf(listData.itemName);
    console.log(index)
    if(index > -1){
      this.state.itemsArray.splice(index,1)
    }
    this.setState({tickbox : true})
}
clear=()=>{
  this.setState({items : ''})
}
labelNotes=(value)=>{
  console.log(value)
  this.setState({labelNotes : value })
}
handleDeletelabel=(id,index)=>{
  if(index > -1){
    this.state.labelNotes.splice(index,1)
  }
  this.setState({labelNotes : this.state.labelNotes})
}
collaboratorsave=(value,capitialInitial)=>{
  console.log(value)
  this.setState({originalArray : value,collabshow : false,capitialInitial : capitialInitial })
}
collabsave=()=>{
  this.setState({collabshow : false,originalArray : this.state.collabatorArray})
}
collabshow=()=>{
  this.setState({collabshow : !this.state.collabshow,})
}
 render(){
     return(
     

          <div className="paper2">
            {this.state.collabshow ? 
                 <Collaborator collbasave={this.collaboratorsave}/>:
          <div id="NoteExpand">

            <div className='showicon' style={{paddingTop : '10px'}}>
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
                 {
                 this.state.listallitems ? 
                    this.state.itemsArray.map((itemsArray, index) => (
                      <List>
                 <div className="textdash">

                    <div style={{display : 'flex',justifyContent:'center',alignItems : 'center'}} 
                    onClick={()=>this.checkboxoutline(itemsArray.itemName)} >
                    <img src={checkboxoutline} id="imgdashnotes" />
                    </div>
                   <Typography style={{width : '100%'}}>{itemsArray.itemName}</Typography>
                    <div style={{display : 'flex',justifyContent:'center',alignItems : 'center'}}>
                    <img src={delete1} id="imgdashnotes" />
                    </div>
                    </div>

                    </List>
                    ))

                    : null}
                   {this.state.date_timeshow ? 
                   <Chip
                   style={{width : '300px'}}
                   icon={<FaceIcon />}
                   label={this.state.date}
                   onDelete={this.handleDelete}
                   color="white"
                   value={this.state.date}
                 />
                    : null}
                 <Divider/>
                 <div className="textdash" style={{paddingTop : '10px'}}>
                    <div style={{display : 'flex',justifyContent:'center',alignItems : 'center'}} onClick={this.additem} >
                    <img src={add} id="imgdashnotes" />
                    </div>
                    
                    <TextField
                      id="standard-multiline-flexible"
                      placeholder="List Item"
                      multiline
                      rowsMax="4"
                      size="small"
                      style={{width:'100%'}}
                      value={this.state.items}
                        InputProps={{ disableUnderline: true }}
                         onChange={this.onchangelistItem}
                    />
                   
                    <div style={{display : 'flex',justifyContent:'center',alignItems : 'center'}}
                    onClick={this.clear}>
                    <img src={clear} id="imgdashnotes" />
                    </div>
                    </div>
                 <Divider/>
                 
                 {this.state.tickbox ? 
                    this.state.tickboxArray.map((tickboxArray, index) => {
                      
                     return <List>
                 <div className="textdash">

                    <div style={{display : 'flex',justifyContent:'center',alignItems : 'center'}}  >
                    <img src={checkboxtick} id="imgdashnotes" />
                    </div>
                   <Typography  style={{width : '100%',textDecoration : 'line-through'}}>{tickboxArray.itemName}</Typography>
                    <div style={{display : 'flex',justifyContent:'center',alignItems : 'center'}}>
                    <img src={delete1} id="imgdashnotes" />
                    </div>
                    </div>

                    </List>
                    })

                    : null}
                 <div style={{display:'flex',flexWrap:'wrap',flexDirection : 'row',width:'100%',padding : '5px'}}>

                    {this.state.labelNotes.map((labelNotes, index) => (
                        <div style={{padding : '5px'}}>
                        <Chip key={index}
                        style={{width : 'auto'}}
                        label={labelNotes.label}
                        onDelete={()=>this.handleDeletelabel(labelNotes.id,index)}
                        color="white"
                        value={this.state.date}
                      />
                      </div>
                      
                      ))}
                      </div>
                      <div style={{display:'flex',flexWrap:'wrap',flexDirection : 'row',width:'100%',padding : '5px'}}>
                      
                      {this.state.originalArray.map((originalArray, index) => (
                         <div style={{padding : '5px'}}>
                        <ListItem key={index}>
                          <ListItemAvatar>
                          <div style={{width : '40px',height : '40px',backgroundColor : 'white',borderRadius : '50px',
                            justifyContent : 'center',alignItems :'center',display:'flex',border : '0.1px solid grey',
                            boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                      <div>{this.state.capitialInitial}</div>
                      </div>
                          </ListItemAvatar>
                          <ListItemText primary={originalArray.firstName} />
                          
                        </ListItem>
                        </div>
                      ))}
                     
                      </div>
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
                 <LabelNotes labelNotes={this.labelNotes}/>
 
                 <div style={{display : 'flex',justifyContent :'center'}}>
                 <Button size="small"  onClick={e => this.close(e)}>Close</Button>
                 </div>
                 </div>

                           
                 

                    </div> }
     </div>

     )
 }
}
 export default ListItemchecklist;