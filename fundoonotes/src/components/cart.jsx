import React, { Component } from "react";
import profile from "../assets/profile.png";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import {
  Typography,
  Grid,
  CardContent,
  Card,
  TextField,
  Paper,
  Button,
  Divider,
  Popper,
  Popover,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  DialogTitle,
  Dialog,
  Checkbox,
  Stepper,
  Step,
  StepLabel,
} from "@material-ui/core";
import reminder from "../assets/reminder.svg";
import personAdd from "../assets/person_add.png";
import color from "../assets/color.png";
import download from "../assets/download.png";
import galary from "../assets/galary.png";
import pin from "../assets/pin.svg";
import { searchUserList, placeOrder, myCart } from "../services/notesService";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import { blue } from "@material-ui/core/colors";
import setting from "../assets/setting.png";
import Color from "./color";
import EditNotes from "./editNotes";
import checkboxoutline from "../assets/checkboxoutline.png";
import checkboxtick from "../assets/checkboxtick.png";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
function getSteps() {
  return ["signin", "review", "complete"];
}

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartStepper: 0,
      showCOD: true,
      address: "",
      cartId: "",
      service: [],
      isOrderPlaced: "",
      order: "Place Your Order",
    };
  }
  componentDidMount = () => {
    myCart().then((response) => {
      this.setState({
        isOrderPlaced: response.data.data[0].isOrderPlaced,
        cartStepper: response.data.data[0].isOrderPlaced ? 3 : 1,
        service: response.data.data[0].product,
        cartId: response.data.data[0].id,
      });
    });
  };
  checkout = () => {
    this.cartChange();
    this.setState({ showCOD: false });
  };
  cartChange = () => {
    this.setState({ cartStepper: this.state.cartStepper + 1 });
  };
  changeTextArea = (event) => {
    event.preventDefault();
    this.setState({ address: event.target.value });
  };
  placeOrder = () => {
    let data = {
      cartId: this.state.cartId,
      address: this.state.address,
    };
    placeOrder(data).then((response) => {
      if (response.status === 200) {
        this.setState({
          cartStepper: this.state.cartStepper + 1,
          showCOD: true,
          order: "Order Placed Successully",
        });
      } else {
        this.setState({
          snackbarmsg: "Register Not Successfull",
          snackbaropen: true,
        });
      }
    });
  };
  render() {
    const steps = getSteps();
    return (
      <div className="mainCart">
        <div className="Main2Cart">
          <div>
            <div className="ratingContainer">
              <div className="headingDiv">
                <div className="headingStyle">FundooNotes</div>
              </div>
              <Stepper activeStep={this.state.cartStepper}>
                {steps.map((label, index) => (
                  <Step key={label}>
                    <div>
                      {this.state.cartStepper === index ? (
                        <ShoppingCartIcon fontSize="medium" color="primary" />
                      ) : null}
                    </div>

                    <StepLabel>
                      <div className="labelStyle">{label}</div>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
          </div>
          <div className="shoppingDiv">
            <span className="shoppingcartStyle">ShoppingCart</span>
          </div>
          <Divider />
          <div className="divContainer">
            <div className="cash1Div">
              <div className="cashDiv">
                ${this.state.service.price} per month {this.state.service.name}
              </div>
            </div>
            <div className="PaymentCashDiv">
              <div className="cashDiv">advance Pack Details</div>
              <div className="subtotalStyle">
                Ability to add title, description, images, labels, checklist and
                colors
              </div>
            </div>

            <div className="priceDiv">
              <div className="validityStyle">price</div>
              <div className="cashDiv">${this.state.service.price}</div>
            </div>

            <div className="monthDiv">
              <div className="validityStyle">validity</div>
              <div className="monthStyle">per month</div>
            </div>

            <div className="subtotalDiv">
              <div className="subtotalStyle">
                Subtotal(1 item) : ${this.state.service.price}
              </div>
              {this.state.isOrderPlaced ? (
                <div className="processedDiv">
                  <div className="plcedStyle">Order Placed Successully</div>{" "}
                </div>
              ) : this.state.showCOD ? (
                <div className="processedDiv">
                  <div className="processedStyle" onClick={this.checkout}>
                    Processed to checkout
                  </div>{" "}
                </div>
              ) : (
                <div classNAme="orderDiv">
                  <div className="orderStyle" onClick={this.placeOrder}>
                    {this.state.order}
                  </div>{" "}
                </div>
              )}
            </div>
          </div>
          <Divider />
          {this.state.showCOD ? (
            <span className="spanStyle">Subtotal ( 1 item ): $99</span>
          ) : (
            <div className="textareaDiv">
              <div>
                <textarea
                  className="textarea"
                  cols="25"
                  rows="5"
                  onChange={this.changeTextArea}
                  value={this.state.address}
                ></textarea>
              </div>
              <div className="PaymentCashDiv">
                <div className="paymentDiv">Payment method</div>
                <div className="cashDiv">Cash On Delivery</div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Cart;
