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
  deleteForeverNotes,
  trashNotes,
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

require("dotenv").config();

class DeleteIcon extends Component {
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
      activeCheckboxes: [],
      noteLabel: this.props.noteLabel,
      askQuestion: false,
      ashshowlength: this.props.ashshow,
      ashshow: this.props.message,
    };
  }
  componentDidMount = () => {
    if (this.props.ashshow > 0) {
      this.setState({ ashshow: "SHOW QUESTION" });
    } else {
      this.setState({ ashshow: "ASK A QUESTION" });
    }
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
  addLabelButton = async () => {
    for (let i = 0; i < this.state.noteLabel.length; i++) {
      this.state.activeCheckboxes.push(this.state.noteLabel[i].id);
      this.setState({ activeCheckboxes: this.state.activeCheckboxes });
    }

    await getNoteLabelList().then((response) => {
      if (response.status === 200) {
        this.setState({ data: response.data.data.details });
      } else {
        this.setState({ snackbarmsg: "Netwrork is slow", snackbaropen: true });
      }
    });
    this.setState({ addlabel: true });
  };
  backbutton = () => {
    this.setState({ addlabel: false });
  };
  handleChange = (event) => {
    this.setState({ checked: !this.state.checked });
  };
  checkboxoutline = (id, labelId) => {};
  handleCheck = (labelId, id) => {
    let found = this.state.activeCheckboxes.includes(labelId);
    if (found) {
      this.setState({
        activeCheckboxes: this.state.activeCheckboxes.filter(
          (x) => x !== labelId
        ),
      });
      deletelabelNotes(id, labelId).then((response) => {
        if (response.status === 200) {
          this.props.sendtrash(true);
        } else {
          this.setState({
            snackbarmsg: "Netwrork is slow",
            snackbaropen: true,
          });
        }
      });
    } else {
      this.setState({
        activeCheckboxes: [...this.state.activeCheckboxes, labelId],
      });

      addlabelNotes(id, labelId).then((response) => {
        if (response.status === 200) {
          this.props.sendtrash(true);
        } else {
          this.setState({
            snackbarmsg: "Netwrork is slow",
            snackbaropen: true,
          });
        }
      });
    }
  };
  askQuestion = () => {
    this.props.sendtrash(false, this.state.id);
  };
  deleteForever = async (id) => {
    await this.state.noteIdList.push(id.toString());
    let data = {
      noteIdList: this.state.noteIdList,
    };
    deleteForeverNotes(data).then((response) => {
      if (response.status === 200) {
        this.setState({ noteIdList: [] });
        this.props.sendtrash1(true);
      } else {
        this.setState({ noteIdList: [] });
        this.setState({ snackbarmsg: "Netwrork is slow", snackbaropen: true });
      }
    });
  };
  restore = async (id) => {
    await this.state.noteIdList.push(id.toString());
    let data = {
      isDeleted: false,
      noteIdList: this.state.noteIdList,
    };
    trashNotes(data).then((response) => {
      if (response.status === 200) {
        this.setState({ noteIdList: [] });
        this.props.sendtrash1(true);
      } else {
        this.setState({ noteIdList: [] });
        this.setState({ snackbarmsg: "Netwrork is slow", snackbaropen: true });
      }
    });
  };
  render() {
    return (
      <div style={{ padding: "5px" }}>
        <img
          src={setting}
          id="imgdashnotes"
          onClick={(e) => this.handleClick(e)}
        />

        {this.props.true ? (
          <div>
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
                      {this.state.data.map((data, index) => (
                        <List>
                          <div className="textdash">
                            <Checkbox
                              label={data.label}
                              onChange={() =>
                                this.handleCheck(data.id, this.state.id)
                              }
                              checked={this.state.activeCheckboxes.includes(
                                data.id
                              )}
                            />
                            }
                            <Typography style={{ width: "100%" }}>
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
                    onClick={() => this.deleteForever(this.state.id)}
                  >
                    DELETE FOREVER
                  </div>
                  <div
                    style={{
                      width: "200px",
                      height: "40px",
                      padding: "10px",
                      fontFamily: "bold",
                      cursor: "pointer",
                    }}
                    onClick={() => this.restore(this.state.id)}
                  >
                    RESTORE
                  </div>
                </div>
              )}
            </Popover>
          </div>
        ) : (
          <div>
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
                      {this.state.data.map((data, index) => (
                        <List>
                          <div className="textdash">
                            <Checkbox
                              label={data.label}
                              onChange={() =>
                                this.handleCheck(data.id, this.state.id)
                              }
                              checked={this.state.activeCheckboxes.includes(
                                data.id
                              )}
                            />
                            }
                            <Typography style={{ width: "100%" }}>
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
                    onClick={() => this.deletebutton(this.state.id)}
                  >
                    DELETE
                  </div>
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
                  <div
                    style={{
                      width: "200px",
                      height: "40px",
                      padding: "10px",
                      fontFamily: "bold",
                      cursor: "pointer",
                    }}
                    onClick={() => this.askQuestion()}
                  >
                    {this.state.ashshow}
                  </div>
                </div>
              )}
            </Popover>
          </div>
        )}
      </div>
    );
  }
}

export default DeleteIcon;
