import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Modal from '@material-ui/core/Modal';

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
         setOpen : false
     
    };
  }
   handleOpen = () => {
    this.setState({setOpen : true});
  };

  handleClose = () => {
    this.setState({setOpen : false});
  };
  render() {
    // const classes = useStyles();
    return (
        <div>
        <Button  onClick={this.handleOpen}>
        Open Modal
      </Button>
        <div className="modelcenter">
        <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.state.setOpen}
        onClose={this.handleClose}
      >
        <div className="classespaper">
          <h2 id="simple-modal-title">Text in a modal</h2>
          <p id="simple-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>
          
        </div>
      </Modal>
      </div>
      </div>
     
    );
  }
}
export default EditLabel;