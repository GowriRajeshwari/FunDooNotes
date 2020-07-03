import React from "react";
import { Popover } from "@material-ui/core";
import color from "../assets/color.png";

class Color extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
      changeColor: this.props.changeColor,
      index: this.props.index,
    };
  }
  handleClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
      open: !this.state.open,
    });
  };
  changeColor = (color) => {
    this.setState({ changeColor: color }, () => this.colorprops);
  };
  colorprops = () => {
    this.props.sendColor(color, this.state.index);
  };
  render() {
    return (
      <div onClick={this.handleClick}>
        <img src={color} id="imgdashnotes" />
        <Popover
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          onClose={this.handleClick}
        >
          <div className="colorDiv">
            <div className="padding">
              <div
                className="colorStyleWhite"
                color="#FFFFFF"
                onClick={this.state.changeColor}
              ></div>
            </div>
            <div className="padding">
              <div
                className="colorStyle1"
                color="#fa8072"
                onClick={() => this.changeColor("#fa8072")}
              ></div>
            </div>
            <div className="padding">
              <div
                className="colorStyle2"
                color="#FFD700"
                onClick={() => this.changeColor("#FFD700")}
              ></div>
            </div>
            <div className="padding">
              <div
                className="colorStyle3"
                color="#FFFF66"
                onClick={() => this.changeColor("#FFFF66")}
              ></div>
            </div>
            <div className="padding">
              <div
                className="colorStyle4"
                color="#ADFF2F"
                onClick={() => this.changeColor("#ADFF2F")}
              ></div>
            </div>
            <div className="padding">
              <div
                className="colorStyle5"
                color="#5bb4b4"
                onClick={() => this.changeColor("#5bb4b4")}
              ></div>
            </div>
            <div className="padding">
              <div
                className="colorStyle6"
                color="#0606f8"
                onClick={() => this.changeColor("#0606f8")}
              ></div>
            </div>
            <div className="padding">
              <div
                className="colorStyle7"
                color="#00FFFF"
                onClick={() => this.changeColor("#00FFFF")}
              ></div>
            </div>
            <div className="padding">
              <div
                className="colorStyle8"
                color="#9b2c9b"
                onClick={() => this.changeColor("#9b2c9b")}
              ></div>
            </div>
            <div className="padding">
              <div
                className="colorStyle9"
                color="#FFC0CB"
                onClick={() => this.changeColor("#FFC0CB")}
              ></div>
            </div>
            <div className="padding">
              <div
                className="colorStyle10"
                color="#d10303"
                onClick={() => this.changeColor("#d10303")}
              ></div>
            </div>
            <div className="padding">
              <div
                className="colorStyle11"
                color="#808080"
                onClick={() => this.changeColor("#808080")}
              ></div>
            </div>
          </div>
        </Popover>
      </div>
    );
  }
}

export default Color;
