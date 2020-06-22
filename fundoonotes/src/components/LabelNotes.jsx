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
import {
  getNotes,
  setNotes,
  deleteNotes,
  getNoteLabelList,
  addlabelNotes,
  deletelabelNotes,
} from "../services/notesService";
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

require("dotenv").config();

class LabelNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: false,
      open: false,
      id: this.props.id,
      noteIdList: [],
      addlabel: false,
      data: [],
      checked: false,
      setChecked: true,
      labelNotes: [],
      activeCheckboxes: [],
    };
  }

  componentDidMount = () => {
    getNoteLabelList().then((response) => {
      // console.log(response.data.data.details);
      if (response.status === 200) {
        this.setState({ data: response.data.data.details });
      } else {
        this.setState({ snackbarmsg: "Netwrork is slow", snackbaropen: true });
      }
    });
  };

  handleClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
      open: !this.state.open,
    });
  };

  deletebutton = async (id) => {
    console.log(id);
    await this.state.noteIdList.push(id.toString());
    let data = {
      isDeleted: true,
      noteIdList: this.state.noteIdList,
    };
    console.log(data);
    deleteNotes(data).then((response) => {
      console.log(response);
      if (response.status === 200) {
        this.setState({ noteIdList: [] });
        this.props.sendtrash(true);
      } else {
        this.setState({ snackbarmsg: "Netwrork is slow", snackbaropen: true });
      }
    });
  };
  addLabelButton = () => {
    this.setState({ addlabel: true });
  };
  backbutton = () => {
    this.setState({ addlabel: false });
  };
  handleChange = (event) => {
    this.setState({ checked: !this.state.checked });
    // this.state.setChecked(event.target.this.state.checked);
  };
  checkboxoutline = (data, index) => {
    this.state.labelNotes.push(data);
    this.props.labelNotes(this.state.labelNotes);
  };
  handleCheck = (data, labelId) => {
    let found = this.state.activeCheckboxes.includes(labelId);
    if (found) {
      this.setState({
        activeCheckboxes: this.state.activeCheckboxes.filter(
          (x) => x !== labelId
        ),
      });
      const index = this.state.labelNotes.findIndex(
        (labelNotes) => labelNotes.id === labelId
      );
      console.log(index, labelId);
      if (index > -1) {
        this.state.labelNotes.splice(index, 1);
      }
      this.setState({ labelNotes: this.state.labelNotes });
      this.props.labelNotes(this.state.labelNotes);
    } else {
      this.setState({
        activeCheckboxes: [...this.state.activeCheckboxes, labelId],
      });
      this.state.labelNotes.push(data);
      this.props.labelNotes(this.state.labelNotes);
    }
  };
  render() {
    return (
      <div>
        <img
          src={setting}
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
          style={{ cursor: "pointer" }}
        >
          {this.state.addlabel ? (
            <div>
              <div style={{ padding: "10px" }}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Typography onClick={() => this.backbutton()}>
                    Label Note
                  </Typography>
                  {/* { this.state.data.map((data, index) => (
                                    <List>
                                  <div className="textdash" key={index}>

                                  {this.state.checked ? <div style={{display : 'flex',justifyContent:'center',alignItems : 'center'}}  >
                                <img src={checkboxtick} id="imgdashnotes" />
                                </div> : 
                                <div style={{display : 'flex',justifyContent:'center',alignItems : 'center'}} 
                               >
                               {/* <Checkbox
                                 checked={this.state.checked}
                                 onChange={this.handleChange}
                                 inputProps={{ 'aria-label': 'primary checkbox' }}
                               /> */}

                  {/* <img src={checkboxoutline} id="imgdashnotes" /> */}
                  {/* </div> */}
                  {/* }  */}
                  {this.state.data.map((data, index) => (
                    <List>
                      <div className="textdash">
                        <Checkbox
                          label={data.label}
                          inputProps={{
                            "aria-label": "checkbox with default color",
                          }}
                          onChange={() => this.handleCheck(data, data.id)}
                          checked={this.state.activeCheckboxes.includes(
                            data.id
                          )}
                        />
                        }
                        <Typography
                          style={{ width: "100%" }}
                          onClick={() => this.checkboxoutline(data)}
                        >
                          {data.label}
                        </Typography>
                      </div>
                    </List>
                  ))}
                </MuiPickersUtilsProvider>
              </div>
            </div>
          ) : (
            <div>
              <div
                style={{
                  width: "200px",
                  height: "40px",
                  padding: "10px",
                  fontFamily: "bold",
                  cursor: "pointer",
                }}
                onClick={() => this.addLabelButton()}
              >
                ADD LABEL
              </div>
            </div>
          )}
        </Popover>
      </div>
    );
  }
}

export default LabelNotes;
