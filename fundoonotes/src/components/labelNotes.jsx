import React, { Component } from "react";
import { Typography, Popover, List, Checkbox } from "@material-ui/core";
import profile from "../assets/profile.png";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
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
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import { blue } from "@material-ui/core/colors";
import setting from "../assets/setting.png";
import Color from "./color";
import EditNotes from "./editNotes";
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
    await this.state.noteIdList.push(id.toString());
    let data = {
      isDeleted: true,
      noteIdList: this.state.noteIdList,
    };
    deleteNotes(data).then((response) => {
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
          className="pointer"
        >
          {this.state.addlabel ? (
            <div>
              <div className="padding2">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Typography onClick={() => this.backbutton()}>
                    Label Note
                  </Typography>
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
                          className="widthStyle"
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
                className="labelButton"
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
