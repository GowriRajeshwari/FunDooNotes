
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
require('dotenv').config();


class TakeaNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
    next : true,
    value : '',
    data:[]
    };
  }
 
  takeNote=(event)=>{
    event.preventDefault();
    this.setState({next : false})
  }
  close=(event)=>{
    event.preventDefault();
    this.setState({next : true})
  }
  onchangeText=(event)=>{
    this.setState({value : event.target.value})
  }
  onChangeTitle=(event)=>{
    this.setState({data : event.target.value})
  }
  render() {
    return (
      <div >
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
               <div>
                    <TextField
                        id="standard-multiline-flexible"
                        label="Title"
                        multiline
                        rowsMax="4"
                        size="small"
                        style={{width:'100%'}}
                        // value={this.state.value}
                        onChange={this.onChangeTitle}
                        InputProps={{ disableUnderline: true }}
                      />
                    
                    </div>
                    <div>
                        <TextField
                        id="standard-multiline-flexible"
                        label="  Take a Note"
                        multiline
                        rowsMax="4"
                        size="small"
                        value={this.state.value}
                        style={{width:'100%'}}
                        onChange={this.onchangeText}
                        InputProps={{ disableUnderline: true }}
                      />
                      </div>
                  
                    <div className="button">
                    <Button size="small" onClick={e => this.close(e)}>Close</Button>
                    </div>

                  </div>
        </Paper>
    }
    
    </div>
    <div>
    <div>  
      <Card style={{width : '250px'}}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="h2">
          benev
        </Typography>
        <Typography color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
     
    </Card>
    </div>
    </div>
    
       
      </div>
    );
  }
}
export default TakeaNotes;