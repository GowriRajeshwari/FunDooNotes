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




class Archived extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data : [],
      noteIdList : []
    
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
  render() {
    return (
        <div className='notescontainer'>
        {this.state.data.map((data, index) => (
            <List key={index} >
        <div 
        style={{borderRadius:'10px',cursor:'pointer',padding:'20px'}}>  
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
            <button className='iconbtn' onClick={() => this.archiveddata(data.id)}  key={index}>
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
        </List>

        ))}
        </div>
        
    );
  }
}
export default Archived;