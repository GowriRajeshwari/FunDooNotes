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
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Divider from '@material-ui/core/Divider';
import Popper from '@material-ui/core/Popper';
import Popover from '@material-ui/core/Popover';
import reminder from '../assets/reminder.svg'
import personAdd from '../assets/person_add.png'
import color from '../assets/color.png'
import download from '../assets/download.png'
import galary from '../assets/galary.png'
import pin from '../assets/pin.svg'
import {searchUserList} from '../services/notesService'
import { getNotes,setNotes,deleteNotes,getNoteLabelList,addlabelNotes,deletelabelNotes } from '../services/notesService'
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
import AddCart from './AddCart'


class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
        cartStepper:0,
    };
  }
  placeOrder=()=>{
    this.cartChange();
  }
  cartChange=()=>{
    this.setState({cartStepper: this.state.cartStepper + 1})
  }
 render(){
     return(
        <div style={{display:"flex",justifyContent:"center"}}>
            <div style={{marginTop:"30px",width : "80%",display:"flex",flexDirection:"column"}}>
                {/* <div>
            <Button onClick={this.placeOrder}>
                placeorder
            </Button>
            </div> */}
            <div> 
                <AddCart cartStepper={this.state.cartStepper}/>
            </div>
            <div style={{display :"flex",justifyContent:"flex-start",paddingBottom:"10px"}}>
            <span>ShoppingCart</span>
            </div>
            <Divider/>
            <div style={{height : "120px",alignItems:"center",display:"flex"}}>

                <div style={{width:"90px",flexWrap:"wrap",backgroundColor:"grey",borderRadius:"8px"}}>
                    <div style={{ color : "white",display:"flex",justifyContent:"center"}}>
                    $99 per month advance
                    </div>

                </div>
                <div style={{display:"flex",flexDirection:"column",marginLeft:"10px"}}>
                <div style={{ color:"blue",fontSize:"12px"}}>advance Pack Details</div>
                <div>Ability to add title, description, images, labels, checklist and colors</div>
                </div>
            </div>
            <Divider/>

            </div>

        </div>
     )}}

     export default Cart;