// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import ExpansionPanel from '@material-ui/core/ExpansionPanel';
// import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
// import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// import Typography from '@material-ui/core/Typography';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import TextField from "@material-ui/core/TextField";
// import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
// import Button from '@material-ui/core/Button';


// const useStyles = makeStyles(theme => ({
//     root: {
//         width: '50%',
//         height : '20%'
//     },
//     heading: {
//         fontSize: theme.typography.pxToRem(15),
//         fontWeight: theme.typography.fontWeightRegular,
//     },
// }));

// export default function SimpleExpansionPanel() {
//     const classes = useStyles();

//     return (
//         <div className={classes.root}>
//             <ExpansionPanel>
//                 <ExpansionPanelSummary
//                     expandIcon={<ExpandMoreIcon />}
//                     // aria-controls="panel1a-content"
//                     // id="panel1a-header"
//                 >
//                     <Typography className={classes.heading}>Take a Notes</Typography>
//                 </ExpansionPanelSummary>
//                 <ExpansionPanelDetails className="panel">
//                     <div className="NoteExpand">
//                     <TextField
//                         // helperText={this.state.helperTextEmail}
//                         id="btndash"
//                         variant="filled"
//                         label="Title"
//                         size="small"
//                         InputProps={{ disableUnderline: true }}
//                         // onChange={this.onchangeEmail}
//                     />
//                     <TextField
//                         // helperText={this.state.helperTextEmail}
//                         InputProps={{ disableUnderline: true }}
//                         id="btndash"
//                         variant="filled"
//                         label="Take a Note"
//                         size="small"
//                         // onChange={this.onchangeEmail}
//                     />
//                     <ExpansionPanelActions>
//           <Button size="small">Close</Button>
          
//         </ExpansionPanelActions>
//                     </div>
//                 </ExpansionPanelDetails>
//             </ExpansionPanel>
//         </div>
//     );
// }



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