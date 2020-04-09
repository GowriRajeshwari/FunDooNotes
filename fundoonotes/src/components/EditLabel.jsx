import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import del from '../assets/del.png';

const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  
class EditLabel extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
        open : false,
         setOpen : true,

     
    };
  }
   handleOpen = () => {
    this.setState({setOpen : true});
  };

  handleClose = () => {
    this.setState({setOpen : false});
  };
  Done=()=>{
    this.setState({setOpen : false});

  }
  render() {
    // const classes = useStyles();
    return (
        <div>
        
        <div className="modelcenter">
        <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.state.setOpen}
        onClose={this.handleClose}
        className="modelmiddel"
      >
        <div className="classespaper">
                    <Typography>Edit Label</Typography>
                    <div className="textdash">
                    <Button >
                    <img src={del} id="imgdash" />
                    </Button>
                    <TextField
                        // error={this.state.red}
                        helperText={this.state.helperTextEmail}
                        id="btndash"
                        variant="filled"
                        label="Create"
                        size='small'
                        InputProps={{ disableUnderline: true }}
                         onChange={this.onchangeEmail}
                    />
                    <Button >
                    <img src={del} id="imgdash" />
                    </Button>
                    </div>
                    <div className="buttondone" onClick={e => this.Done(e)}>
                    <Button  >
                    Done
                    </Button>
                    </div>
                  
        </div>
      </Modal>
      </div>
      </div>
     
    );
  }
}
export default EditLabel;