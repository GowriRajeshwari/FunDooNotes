import React, { Component } from "react";
import {archiveNoteList ,archiveNote} from '../services/notesService'
import { Typography } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import reminder from '../assets/reminder.svg'
import personAdd from '../assets/person_add.png'
import color from '../assets/color.png'
import download from '../assets/download.png'
import galary from '../assets/galary.png'
import pin from '../assets/pin.svg'
import setting from '../assets/setting.png'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import DeleteIcon from './DeleteIcon'
import DateTimePicker from './DateTimePicker'
import Color from './Color'




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
  render() {
    return (
        <div className='notescontainer'>
        {this.state.data.filter(searchigFor(this.props.query)).map((data, index) => {
      if(data.isDeleted != true)
    return <div key={index} onMouseMove={this._onMouseMove} onMouseLeave={this._onMouseOut} 
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



        <div style={{ display : 'flex', flexDirection:'row',paddingTop : '5px',justifyContent:'space-around'}}>          

         <div style={{ padding :'5px'}}  onClick={e=>this.handleClick(e)}>
                     <DateTimePicker sendtimeDate={this.sendtimeDate}/>
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
                    <div style={{ padding :'5px'}} onClick={() => this.archiveddata(data.id)}  key={index}>
                        <img src={download} id="imgdashnotes" />
                    </div>
                    <DeleteIcon id={data.id} sendtrash={this.sendtrash}/>
                    
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
export default Archived;