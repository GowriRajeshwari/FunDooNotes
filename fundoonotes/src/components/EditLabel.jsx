import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import delete1 from '../assets/delete.png';
import add from '../assets/add.png';
import Dialog from '@material-ui/core/Dialog';
import { getNoteLabelList,addLabels,deleteNoteLabel } from '../services/notesService'


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
         dialogBoxOpen:true,
         dialogBoxClose : false,
          data : [],
          label : ''
     
    };
  }
  componentDidMount=()=>{
    
    getNoteLabelList().then(response => {
      console.log(response.data.data.details);
     if (response.status === 200) {
        
        this.setState({data : response.data.data.details});
       
      
     } else {
         this.setState({  snackbarmsg: "Netwrork is slow", snackbaropen: true });
     }
  });
  }
  handelNoteDialogBox = () => {
    this.setState({
      dialogBoxOpen: !this.state.dialogBoxOpen
    }) 
    this.componentDidMount();
    this.props.labeldata();

  
  }
   handleOpen = () => {
    this.setState({setOpen : true});
  };

  handleClose = () => {
    this.setState({setOpen : false});
  };
  Done=()=>{
    // this.handelNoteDialogBox();
    // this.setState({setOpen : false});
    this.props.labeldata();

  }
  addlabel=()=>{
    const userId = localStorage.getItem("userId");
    console.log(userId)
    let data={
      label : this.state.label,
      isDeleted : false,
      userId : userId
    }
    addLabels(data).then(response => {
      console.log(response);
     if (response.status === 200) {
        this.componentDidMount();
        this.setState({ label : ''})
     } else {
         this.setState({  snackbarmsg: "Netwrork is slow", snackbaropen: true });
     }
  });
    
  }
  onchangelabel=(event)=>{
    this.setState({ label : event.target.value })
  }
  deletelabel=(id)=>{
    
    deleteNoteLabel(id).then(response => {
      console.log(response);
     if (response.status === 200) {
        this.componentDidMount();
        // this.setState({ label : ''})
     } else {
         this.setState({  snackbarmsg: "Netwrork is slow", snackbaropen: true });
     }
  });
  }
  render() {
    // const classes = useStyles();
    return (
        
        <Dialog
            open={this.state.dialogBoxOpen}
            onClose={this.handelNoteDialogBox}
            >
        <div className="classespaper">
                    <Typography>Edit Label</Typography>
                    <div className="textdash">
                    <Button style={{width : '50px',height : '50px'}} onClick={this.addlabel} >
                    <img src={add} id="imgdashdelete" />
                    </Button>
                    <div style={{display : 'flex',justifyContent:'center'}}>
                    <TextField
                        id="btndash"
                        variant="filled"
                        placeholder="Create"
                        size='small'
                        style={{display : 'flex',justifyContent:'center'}}
                        InputProps={{ disableUnderline: true }}
                         onChange={this.onchangelabel}
                    />
                    </div>
                    <Button  >
                    <img src={delete1} id="imgdashdelete" />
                    </Button>
                    </div>
                    <div className="buttondone" onClick={e => this.Done(e)}>
                    <Button  >
                    Done
                    </Button>
                    
                    </div>
                    <div>
                    {this.state.data.map((data, index) => (
                        <div className="textdash">
                        <Button style={{width : '50px',height : '50px'}} onClick={this.addlabel} >
                        <img src={add} id="imgdashdelete" />
                        </Button>
                        <TextField
                            // error={this.state.red}
                            helperText={this.state.helperTextEmail}
                            id="btndash"
                            variant="filled"
                            value={data.label}
                            size='small'
                            InputProps={{ disableUnderline: true }}
                             onChange={this.onchangelabel}
                        />
                        <Button onClick={()=>this.deletelabel(data.id)}>
                        <img src={delete1} id="imgdashdelete" />
                        </Button>
                        </div>))}
                    </div>

                   
                  
        </div>
      </Dialog>
    
     
    );
  }
}
export default EditLabel;