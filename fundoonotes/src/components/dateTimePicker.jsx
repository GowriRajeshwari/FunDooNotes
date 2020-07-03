import React, { Component } from "react";
import { TextField, Typography, Grid, Popover } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import reminder from "../assets/reminder.svg";
require("dotenv").config();

class DateTimePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: false,
      open: false,
      dateshow: false,
      date: new Date(),
      startdate: new Date(),
      tomorrow: "",
      timeTodayTommorow: "08:00:00",
      timepicker: "",
    };
  }
  componentDidMount = () => {
    var d = new Date();
    d.setDate(new Date().getDate() + 1);
    this.setState({
      tomorrow: d,
      time: d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
    });
  };
  handleClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
      open: !this.state.open,
    });
  };
  handleDateChange = (date) => {
    this.setState({ startdate: date });
  };
  timepicker = (event) => {
    this.setState({ timepicker: event.target.value });
  };
  datesave = () => {
    this.setState(
      {
        date: this.state.startdate.toDateString() + " " + this.state.timepicker,
        date_timeshow: true,
        dateshow: false,
      },
      () => this.propsData()
    );
  };
  todaydate = () => {
    this.setState(
      {
        date: new Date().toDateString() + " " + this.state.timeTodayTommorow,
        date_timeshow: true,
      },
      () => this.propsData()
    );
  };
  propsData = () => {
    this.props.sendtimeDate(this.state.date.toString());
  };
  tomorrowdate = () => {
    this.setState(
      {
        date:
          this.state.tomorrow.toDateString() +
          " " +
          this.state.timeTodayTommorow,
        date_timeshow: true,
      },
      () => this.propsData()
    );
  };
  dateshow = () => {
    this.setState({ dateshow: !this.state.dateshow });
  };
  render() {
    return (
      <div className="pointer">
        <img
          src={reminder}
          id="imgdashnotes"
          onClick={(e) => this.handleClick(e)}
        />
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
          className="pointer"
        >
          {this.state.dateshow ? (
            <div>
              <div className="padding2">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="space-around">
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Date picker inline"
                      value={this.state.startdate}
                      onChange={(date) => this.handleDateChange(date)}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <TextField
                    id="time"
                    label="Alarm clock"
                    type="time"
                    defaultValue="07:30"
                    className="timepicker"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                    onChange={this.timepicker}
                    className="widthStyle"
                  />
                </MuiPickersUtilsProvider>
                <div onClick={this.datesave} className="labelButton2">
                  <div>save</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="dateDiv">
              <Typography className="padding2" onClick={this.todaydate}>
                Today
              </Typography>
              <Typography className="padding2" onClick={this.tomorrowdate}>
                Tommorow
              </Typography>
              <Typography className="padding2" onClick={this.dateshow}>
                pick date & time
              </Typography>
            </div>
          )}
        </Popover>
      </div>
    );
  }
}

export default DateTimePicker;
