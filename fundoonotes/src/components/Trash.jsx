import React, { Component } from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import pin from '../assets/pin.svg'
import {searchUserList} from '../services/notesService'
import { getNotes,setNotes,deleteNotes } from '../services/notesService'
import Dialog from '@material-ui/core/Dialog';
import EditNotes from './EditNotes'
import NewNote from './NewNote'
import DeleteIcon from './DeleteIcon'

require('dotenv').config();


function searchigFor(query){
  return function(x){
    return x.title.toLowerCase().includes(query.toLowerCase())||x.description.toLowerCase().includes(query.toLowerCase())||!query;
  }
}

class Trash extends Component {
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
    dialogBoxOpen:false,
    noteIdList :[],
    nonDeleteData:[],
    query : this.props.query

   
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
      console.log(response.data.data.data[0].isDeleted);
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

sendtimeDate=(date)=>{
  this.setState({date : date,date_timeshow : true,dateshow : false});
}
sendtrash=(val)=>{
  this.componentDidMount();
}
  render() {
    
    return (
      
    
    <div className='notescontainer'>
    {this.state.data.filter(searchigFor(this.props.query)).map((data, index) => {
      if(data.isDeleted === true)
    return <div key={index}  
    style={{borderRadius:'10px',cursor:'pointer',padding:'10px'}} >  
      <Card  className="mydivouter" style={{backgroundColor :  this.state.data[index].color }}>
      <CardContent>
        <div className='showicon'>
                      <div  className="typoText">
                        {data.title}
                      </div>
                        <div className="mybuttonoverlap" style={{ padding :'5px'}}>
                              <img src={pin} id="imgdashnotes" />
                      </div> 
                     
          </div>
        <div  className="typoText"
        onClick={()=>this.dialogboxOpen(data.title,data.description,data.id)}>
         {data.description}
        </div>
        <div  className="typoText">
         {data.reminder}
        </div>

        <div  className="mybuttonoverlap" >



        <div style={{ display : 'flex', flexDirection:'row',paddingTop : '5px',justifyContent:'flex-start'}}>          

         <div style={{ padding :'5px'}}  onClick={e=>this.handleClick(e)}>
                   
                    <DeleteIcon id={data.id} sendtrash={this.sendtrash}/>
                    
                    </div>
                    </div>

        

        </div>
        
      </CardContent>
     
    </Card>

    </div>
    
    })}
    </div>
    );
  }
}
export default Trash;