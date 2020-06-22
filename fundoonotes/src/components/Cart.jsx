import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import profile from "../assets/profile.png";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { login } from "../services/LoginService";
import { Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Divider from "@material-ui/core/Divider";
import Popper from "@material-ui/core/Popper";
import Popover from "@material-ui/core/Popover";
import reminder from "../assets/reminder.svg";
import personAdd from "../assets/person_add.png";
import color from "../assets/color.png";
import download from "../assets/download.png";
import galary from "../assets/galary.png";
import pin from "../assets/pin.svg";
import { searchUserList } from "../services/notesService";
import { placeOrder, myCart } from "../services/notesService";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import { blue } from "@material-ui/core/colors";
import setting from "../assets/setting.png";
import Checkbox from "@material-ui/core/Checkbox";
import Color from "./Color";
import EditNotes from "./EditNotes";
import checkboxoutline from "../assets/checkboxoutline.png";
import checkboxtick from "../assets/checkboxtick.png";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
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
      console.log(response);
      this.setState({
        isOrderPlaced: response.data.data[0].isOrderPlaced,
        cartStepper: response.data.data[0].isOrderPlaced ? 3 : 1,
        service: response.data.data[0].product,
        cartId: response.data.data[0].id,
      });
    });
    console.log(this.state.isOrderPlaced);
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
    // this.setState({cartStepper: this.state.cartStepper + 1})

    // await this.setState({cartStepper: this.state.cartStepper + 1})
    let data = {
      cartId: this.state.cartId,
      address: this.state.address,
    };
    placeOrder(data).then((response) => {
      console.log(response);
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
      <div
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        <div
          style={{
            marginTop: "30px",
            width: "70%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>
            {/* <AddCart cartStepper={this.state.cartStepper}/> */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <div style={{ borderRadius: "8px", backgroundColor: "#fb0" }}>
                <div style={{ padding: "5px", color: "white" }}>
                  FundooNotes
                </div>
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
                      <div
                        style={{
                          padding: "5px",
                          fontFamily: "lato",
                          fontSize: "16px",
                        }}
                      >
                        {label}
                      </div>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              paddingBottom: "10px",
              fontFamily: "lato",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            <span style={{ fontFamily: "lato", fontSize: "18px" }}>
              ShoppingCart
            </span>
          </div>
          <Divider />
          <div
            style={{
              minHeight: "120px",
              alignItems: "center",
              display: "flex",
              flexWrap: "wrap",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                width: "90px",
                flexWrap: "wrap",
                backgroundColor: "grey",
                borderRadius: "8px",
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                paddingLeft: "20px",
              }}
            >
              <div
                style={{ color: "white", fontFamily: "lato", fontSize: "16px" }}
              >
                ${this.state.service.price} per month {this.state.service.name}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "30px",
                width: "250px",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{ color: "blue", fontSize: "16px", fontFamily: "lato" }}
              >
                advance Pack Details
              </div>
              <div style={{ fontSize: "16px", fontFamily: "lato" }}>
                Ability to add title, description, images, labels, checklist and
                colors
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "30px",
                width: "100px",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  fontFamily: "lato",
                  color: "black",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                price
              </div>
              <div
                style={{ fontFamily: "lato", color: "blue", fontSize: "16px" }}
              >
                ${this.state.service.price}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100px",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  fontFamily: "lato",
                  color: "black",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                validity
              </div>
              <div
                style={{ fontFamily: "lato", color: "blue", fontSize: "16px" }}
              >
                per month
              </div>
            </div>

            <div
              style={{
                padding: "2px",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid grey",
                width: "200px",
                height: "100px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ fontSize: "16px", fontFamily: "lato" }}>
                Subtotal(1 item) : ${this.state.service.price}
              </div>
              {this.state.isOrderPlaced ? (
                <div
                  style={{
                    boderRadius: "8px",
                    backgroundColor: "lightblue",
                    display: "flex",
                    alignItem: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "15px",
                      fontFamily: "lato",
                      padding: "5px",
                      color: "black",
                      cursor: "pointer",
                    }}
                  >
                    Order Placed Successully
                  </div>{" "}
                </div>
              ) : this.state.showCOD ? (
                <div
                  style={{
                    boderRadius: "8px",
                    backgroundColor: "lightblue",
                    display: "flex",
                    alignItem: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "16px",
                      fontFamily: "lato",
                      padding: "5px",
                      color: "black",
                      cursor: "pointer",
                    }}
                    onClick={this.checkout}
                  >
                    Processed to checkout
                  </div>{" "}
                </div>
              ) : (
                <div
                  style={{
                    backgroundColor: "lightblue",
                    display: "flex",
                    alignItem: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "16px",
                      fontFamily: "lato",
                      padding: "5px",
                      color: "black",
                      cursor: "pointer",
                    }}
                    onClick={this.placeOrder}
                  >
                    {this.state.order}
                  </div>{" "}
                </div>
              )}
            </div>
          </div>
          <Divider />
          {this.state.showCOD ? (
            <span
              style={{
                color: "blue",
                fontFamily: "lato",
                fontSize: "16px",
                marginTop: "10px",
              }}
            >
              Subtotal ( 1 item ): $99
            </span>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: " 10px",
              }}
            >
              <div>
                <textarea
                  style={{ resize: "none" }}
                  cols="25"
                  rows="5"
                  onChange={this.changeTextArea}
                  value={this.state.address}
                ></textarea>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "250px",
                  flexWrap: "wrap",
                  marginLeft: " 30px",
                }}
              >
                <div
                  style={{
                    fontFamily: "lato",
                    color: "black",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  Payment method
                </div>
                <div
                  style={{
                    fontFamily: "lato",
                    color: "blue",
                    fontSize: "16px",
                  }}
                >
                  Cash On Delivery
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Cart;
