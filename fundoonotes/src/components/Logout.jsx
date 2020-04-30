import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import clsx from 'clsx';
import { makeStyles, useTheme,withStyles } from '@material-ui/core/styles';
import { getNotes,setNotes,deleteNotes,getNoteLabelList,addlabelNotes,logout } from '../services/notesService'
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import { blue } from '@material-ui/core/colors';
import setting from '../assets/setting.png'
import Checkbox from '@material-ui/core/Checkbox';
import Color from './Color'
import EditNotes from './EditNotes'
import checkboxoutline from '../assets/checkboxoutline.png';
import checkboxtick from '../assets/checkboxtick.png';
import Divider from '@material-ui/core/Divider';
import { Typography } from "@material-ui/core";

require('dotenv').config();

const useStyles = theme => ({
    
    menuButton: {
     
      marginRight: theme.spacing(1),
    },
    
  });

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
        anchorEl :false,
        open:false,
        id : this.props.id,
        noteIdList :[],
        addlabel : false,
        data : [],
        checked:false,
        setChecked : true,
        activeCheckboxes: [],
        noteLabel : this.props.noteLabel,
        email : '',
        firstName : ''


    };
  }
  componentDidMount=()=>{
      const email =  localStorage.getItem("email");
      const firstName = localStorage.getItem("firstName");
      this.setState({email : email,firstName : firstName})
  }
  handleClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
      open: !this.state.open
  });
}
logout=()=>{
    let data={}
    logout(data).then(response => {
        // console.log(response.data.data.details[0]);
       if (response.status === 204) {
        this.props.history.push({
            pathname: "/login",
        });
       } else {
       }
    });
}
 render(){
    const {classes} = this.props;
     return(
        <div style={{ padding :'5px'}}  >
              <IconButton
                          size="medium"
                          color="black"
                          aria-label="open drawer"
                          onClick={this.handleClick}
                          edge="start"
                          className={clsx(classes.menuButton, this.state.open)}
                        >
                          <Avatar>
                          
                            </Avatar>
                        </IconButton>
        <Popover 
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        open={this.state.open}
        anchorEl={this.state.anchorEl}
        onClose={this.handleClick}
        style={{ cursor: 'pointer'}}>
           
           <div style={{width : '300px',height:'150px'}}>
               <form style={{display : 'flex',flexDirection : 'row',padding : '10px'}}>
                       <IconButton
                        //   size="medium"
                          color="black"
                          aria-label="open drawer"
                        //   onClick={this.handleClick}
                          edge="start"
                          className={clsx(classes.menuButton, this.state.open)}
                        >
                         <Avatar>
                          
                          </Avatar>
                        </IconButton>  
                        <div style={{display : 'flex',flexDirection : 'column',justifyContent : 'center'}}>
                        <Typography>{this.state.email}</Typography>
                        <Typography>{this.state.firstName}</Typography>

                        </div>
                        <input type="file" onChange={this.onChange} id="file-input" style={{ display: 'none'}}/>
                       
                        </form>   

                        <Divider/>
                        <div onClick={this.logout}
                        style={{display : 'flex',justifyContent : 'flex-end',padding : '10px',border : '1px'}}>
                            LOGOUT
                        </div>
           </div>
    
        </Popover>
       
        
    </div> 
     )}}

     export default withStyles(useStyles)(Logout);



//      import React, { Component } from "react";
// import Paper from "@material-ui/core/Paper";
// import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";
// import profile from '../assets/profile.png';
// import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// import { login } from "../services/LoginService"
// import { Typography } from "@material-ui/core";
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import Grid from '@material-ui/core/Grid';
// import DateFnsUtils from '@date-io/date-fns';
// import {
//   MuiPickersUtilsProvider,
//   KeyboardTimePicker,
//   KeyboardDatePicker,
// } from '@material-ui/pickers';
// import Divider from '@material-ui/core/Divider';
// import Popper from '@material-ui/core/Popper';
// import Popover from '@material-ui/core/Popover';
// import reminder from '../assets/reminder.svg'
// import personAdd from '../assets/person_add.png'
// import color from '../assets/color.png'
// import download from '../assets/download.png'
// import galary from '../assets/galary.png'
// import pin from '../assets/pin.svg'
// import {searchUserList} from '../services/notesService'
// import { getNotes,setNotes,deleteNotes,getNoteLabelList,addlabelNotes,deletelabelNotes } from '../services/notesService'
// import Avatar from '@material-ui/core/Avatar';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import ListItemText from '@material-ui/core/ListItemText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Dialog from '@material-ui/core/Dialog';
// import PersonIcon from '@material-ui/icons/Person';
// import AddIcon from '@material-ui/icons/Add';
// import { blue } from '@material-ui/core/colors';
// import setting from '../assets/setting.png'
// import Checkbox from '@material-ui/core/Checkbox';
// import Color from './Color'
// import EditNotes from './EditNotes'
// import checkboxoutline from '../assets/checkboxoutline.png';
// import checkboxtick from '../assets/checkboxtick.png';

// require('dotenv').config();


// class DeleteIcon extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//         anchorEl :false,
//         open:false,
//         id : this.props.id,
//         noteIdList :[],
//         addlabel : false,
//         data : [],
//         checked:false,
//         setChecked : true,
//         activeCheckboxes: [],
//         noteLabel : this.props.noteLabel


//     };
//   }

//   handleClick = (event) => {
//     this.setState({
//       anchorEl: event.currentTarget,
//       open: !this.state.open
//   });
// }

//   deletebutton=async(id)=>{
//     console.log(id)
//     await this.state.noteIdList.push(id.toString());
//     let data={
//       isDeleted : true,
//       noteIdList : this.state.noteIdList
//     }
//     console.log(data)
//     deleteNotes(data).then(response => {
//       console.log(response);
//      if (response.status === 200) {
//          this.setState({noteIdList : []});
//          this.props.sendtrash(true);
//      } else {
//          this.setState({  snackbarmsg: "Netwrork is slow", snackbaropen: true });
//      }
//   });
  
//   }
//   addLabelButton=async()=>{
//     console.log(this.state.noteLabel)
//     for(let i=0;i<this.state.noteLabel.length;i++){
//         this.state.activeCheckboxes.push(this.state.noteLabel[i].id)
//         this.setState({activeCheckboxes : this.state.activeCheckboxes})
//     }
  
//    await getNoteLabelList().then(response => {
//      if (response.status === 200) {
//         this.setState({data : response.data.data.details});
//      } else {
//          this.setState({  snackbarmsg: "Netwrork is slow", snackbaropen: true });
//      }
//   });
//     this.setState({addlabel : true })
 
//   }
//   backbutton=()=>{
//     this.setState({addlabel : false })

//   }
//   handleChange = (event) => {
//     this.setState({checked : !this.state.checked})
//     // this.state.setChecked(event.target.this.state.checked);
//   }
//   checkboxoutline=(id,labelId)=>{
//     // this.setState({checked : !this.state.checked})
//    console.log(this.state.checked)
//   //   addlabelNotes(id,labelId).then(response => {
//   //     console.log(response);
//   //    if (response.status === 200) {
//   //        this.props.sendtrash(true);
//   //    } else {
//   //        this.setState({  snackbarmsg: "Netwrork is slow", snackbaropen: true });
//   //    }
//   // });

//   }
//   handleCheck=(labelId,id)=> {
//     let found = this.state.activeCheckboxes.includes(labelId)
//     if (found) {
//       this.setState({ 
//         activeCheckboxes: this.state.activeCheckboxes.filter(x => x !== labelId)
//       })
//       deletelabelNotes(id,labelId).then(response => {
//         console.log(response);
//        if (response.status === 200) {
//            this.props.sendtrash(true);
//        } else {
//            this.setState({  snackbarmsg: "Netwrork is slow", snackbaropen: true });
//        }
//     });

//     } else {
//       this.setState({ 
//         activeCheckboxes: [ ...this.state.activeCheckboxes, labelId ]
//       })

//       addlabelNotes(id,labelId).then(response => {
//         console.log(response);
//        if (response.status === 200) {
//            this.props.sendtrash(true);
//        } else {
//            this.setState({  snackbarmsg: "Netwrork is slow", snackbaropen: true });
//        }
//     });
//     }
//   }

//  render(){
//      return(
//         <div style={{ padding :'5px'}}  >
//         <img src={setting} id="imgdashnotes" onClick={e=>this.handleClick(e)}/>
//         <Popover 
//           anchorOrigin={{
//             vertical: 'bottom',
//             horizontal: 'center',
//           }}
//           transformOrigin={{
//             vertical: 'top',
//             horizontal: 'center',
//           }}
//         open={this.state.open}
//         anchorEl={this.state.anchorEl}
//         onClose={this.handleClick}
//         style={{ cursor: 'pointer'}}>
           
        
//       { this.state.addlabel ? 
//                           <div>
//                             <div style={{padding : '10px'}}>
//                                <MuiPickersUtilsProvider utils={DateFnsUtils} >
//                                  <Typography onClick={()=>this.backbutton()}>Label Note</Typography>
//                                  { this.state.data.map((data, index) => (
//                                     <List>
//                                   <div className="textdash">
//                                 <Checkbox
//                                   label={data.label}
//                                   onChange={() => this.handleCheck(data.id,this.state.id)}
//                                   checked={this.state.activeCheckboxes.includes(data.id)}
//                                 />
//                                 }
//                                   <Typography style={{width : '100%'}}>{data.label}</Typography>
//                                   </div>

//                                   </List>
//                                   ))}
//                                </MuiPickersUtilsProvider>
                               
//                                </div>
//                               </div>
//                               :
//                               <div>
//                               <div style={{width : '200px',height:"40px",padding : '10px',fontFamily : 'bold',cursor: 'pointer'}} 
//                               onClick={()=>this.deletebutton(this.state.id)}>
//                               DELETE</div>
//                               <div style={{width : '200px',height:"40px",padding : '10px',fontFamily : 'bold',cursor: 'pointer'}}
//                                onClick={()=>this.addLabelButton()}>
//                               ADD LABEL</div>
//                               </div>
//                           }
//         </Popover>
       
        
//     </div> 
//      )}}

//      export default DeleteIcon;