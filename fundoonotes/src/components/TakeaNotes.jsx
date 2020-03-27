
import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import profile from '../assets/profile.png';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { login } from "../services/LoginService"
import { Typography } from "@material-ui/core";
require('dotenv').config();


class TakeaNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
    next : true
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
  render() {
    return (
      <div >
        <div className="containerdash">
        {this.state.next ? 
            <Paper className="paper">
            
            <Typography onClick={e => this.takeNote(e)} className="Typo">Take a Notes</Typography>
          
            </Paper>
          : 
          <Paper className="paper2">
             <div className="NoteExpand">
                    <TextField
                        // error={this.state.red}
                        helperText={this.state.helperTextEmail}
                        id="btndash"
                        variant="filled"
                        label="Title"
                        size='small'
                        InputProps={{ disableUnderline: true }}
                        //  onChange={this.onchangeEmail}
                    />
                    <TextField
                        // error={this.state.red}
                        helperText={this.state.helperTextEmail}
                        id="btndash"
                        variant="filled"
                        label="Take a Notes"
                        size='small'
                        InputProps={{ disableUnderline: true }}
                        //  onChange={this.onchangeEmail}
                    />
                    <div className="button">
                    <Button size="small" onClick={e => this.close(e)}>Close</Button>
                    </div>

                  </div>
        </Paper>
    }
    </div>
       
       
      </div>
    );
  }
}
export default TakeaNotes;