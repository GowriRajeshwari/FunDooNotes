
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
import reminder from '../assets/reminder.svg'
import personAdd from '../assets/person_add.png'
import color from '../assets/color.png'
import download from '../assets/download.png'
import galary from '../assets/galary.png'
import pin from '../assets/pin.svg'


import { getNotes,setNotes } from '../services/notesService'


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
    title:''
   
    };
  }
  componentDidMount=()=>{
    getNotes().then(response => {
      console.log(response.data.data.data);
     if (response.status === 200) {
         
        this.setState({data : response.data.data.data});
        console.log(this.state.data.length)
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
      let data = {
        title : this.state.title,
        description	: this.state.description
      }
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
                        // value={this.state.value}
                        style={{width:'100%'}}
                        onChange={this.onchangeText}
                        InputProps={{ disableUnderline: true }}
                      />
                      </div>
                      <div style={{ display : 'flex', flexDirection:'row',paddingTop : '10px',justifyContent:'space-around'}}>          
                    <div style={{ padding :'5px'}}>
                      <button className='iconbtn'>
                        <img src={reminder} id="imgdashnotes" />
                        </button>
                    </div>
                    <div style={{ padding :'5px'}}>
                    <button className='iconbtn'>
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
                    </div> </div>
                              
                    <div className="button">
                    <Button size="small" onClick={e => this.close(e)}>Close</Button>
                    </div>

                  </div>
        </Paper>
    }
    
    </div>
    <div className="mydivouter">	
	<input type="button" className="mybuttonoverlap" value="Read More"/>
</div>
    <div className='notescontainer'>
    {this.state.data.map((data, index) => (
    <div onMouseMove={this._onMouseMove} onMouseLeave={this._onMouseOut} 
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
          <button className='iconbtn'>
            <img src={reminder} id="imgdashnotes" />
            </button>
        </div>
        <div style={{ padding :'5px'}}>
        <button className='iconbtn'>
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
        </div> </div>
        

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