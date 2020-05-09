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
import { placeOrder} from '../services/notesService'
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
        showCOD : true,
        address : '',
        cartId:''
    };
  }
  checkout=()=>{
    this.cartChange();
   this.setState({ showCOD : false})
  }
  cartChange=()=>{
    this.setState({cartStepper: this.state.cartStepper + 1})
  }
  changeTextArea=(event)=>{
    event.preventDefault();
    this.setState({ address : event.target.value})
  }
  placeOrder=()=>{
    let data={
      cartId : this.state.cartId,
      address : this.state.address
    }
    placeOrder(data).then(response => {
      console.log(response);
     if (response.status === 200) {
    this.setState({cartStepper: this.state.cartStepper + 1})
         
     } else {
         this.setState({  snackbarmsg: "Register Not Successfull", snackbaropen: true });
     }
  });

  }
 render(){
     return(
        <div style={{display:"flex",justifyContent:"center",flexWrap:"wrap"}}>
            <div style={{marginTop:"30px",width : "80%",display:"flex",flexDirection:"column"}}>
              
            <div> 
                <AddCart cartStepper={this.state.cartStepper}/>
            </div>
            <div style={{display :"flex",justifyContent:"flex-start",paddingBottom:"10px"}}>
            <span>ShoppingCart</span>
            </div>
            <Divider/>
            <div style={{minHeight : "120px",alignItems:"center",display:"flex",flexWrap:"wrap"}}>

                <div style={{width:"90px",flexWrap:"wrap",backgroundColor:"grey",
                borderRadius:"8px",justifyContent:"center",display:"flex",alignItems:"center",paddingLeft:"20px"}}>
                    <div style={{ color : "white"}}>
                    $99 per month advance
                    </div>

                </div>
                <div style={{display:"flex",flexDirection:"column",marginLeft:"30px",width:"250px",flexWrap:"wrap"}}>
                <div style={{ color:"blue",fontSize:"14px"}}>advance Pack Details</div>
                <div style={{fontSize:"14px"}}>Ability to add title, description, images, labels, checklist and colors</div>
                </div>

                <div style={{display:"flex",flexDirection:"column",marginLeft:"30px",width:"100px",flexWrap:"wrap"}}>
                <div style={{ color:"black",fontSize:"14px",fontWeight:"bold"}}>price</div>
                <div style={{ color:"blue",fontSize:"14px"}}>$99</div>
                </div>

                <div style={{display:"flex",flexDirection:"column",width:"100px",flexWrap:"wrap"}}>
                <div style={{ color:"black",fontSize:"14px",fontWeight:"bold"}}>validity</div>
                <div style={{ color:"blue",fontSize:"14px"}}>per month</div>
                </div>

                <div style={{justifyContent:"center",alignItems:"center", border: '1px solid grey',width:"200px",height:"100px",display:"flex",flexDirection:"column"}}>
                    <div>
                    Subtotal(1 item) : $99
                    </div>
                      {this.state.showCOD ? <div style={{backgroundColor:"lightblue",display:"flex",alignItem:"center",justifyContent:"center"}}>
            <div style={{padding:"2px",color:"black",cursor:"pointer"}} onClick={this.checkout}>
                Processed to checkout
            </div> </div> : 
            <div style={{backgroundColor:"lightblue",display:"flex",alignItem:"center",justifyContent:"center"}}>
            <div style={{padding:"2px",color:"black",cursor:"pointer"}} onClick={this.placeOrder}>
                Place Your Order
            </div> </div> }
            
                </div>

            </div>
            <Divider/>
            {this.state.showCOD ? 
            <span style={{color:"blue"}}>Subtotal ( 1 item ): $99</span> :

            <div style={{display:"flex",flexDirection:"row"}}>
              <div>
              <textarea rows="5" onChange={this.changeTextArea} value={this.state.address}>

              </textarea>
              </div>
              <div style={{display:"flex",flexDirection:"column",width:"250px",flexWrap:"wrap",marginLeft : " 30px"}}>
                <div style={{ color:"black",fontSize:"12px",fontWeight:"bold"}}>Payment method</div>
                <div style={{ color:"blue",fontSize:"14px"}}>Cash On Delivery</div>
                </div>
              </div>
             }
            </div>

        </div>
     )}}

     export default Cart;