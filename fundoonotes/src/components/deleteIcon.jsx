import React, { Component } from "react";
import { Typography, Popover, List, Checkbox } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import {
  deleteNotes,
  getNoteLabelList,
  addlabelNotes,
  deletelabelNotes,
  deleteForeverNotes,
  trashNotes,
} from "../services/notesService";
import setting from "../assets/setting.png";

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
      <div className="padding">
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
                              onChange={() =>
                                this.handleCheck(data.id, this.state.id)
                              }
                              checked={this.state.activeCheckboxes.includes(
                                data.id
                              )}
                            />
                            }
                            <Typography className="widthStyle">
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
                    onClick={() => this.deleteForever(this.state.id)}
                  >
                    DELETE FOREVER
                  </div>
                  <div
                    className="labelButton"
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
                              onChange={() =>
                                this.handleCheck(data.id, this.state.id)
                              }
                              checked={this.state.activeCheckboxes.includes(
                                data.id
                              )}
                            />
                            }
                            <Typography className="widthStyle">
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
                    onClick={() => this.deletebutton(this.state.id)}
                  >
                    DELETE
                  </div>
                  <div
                    className="labelButton"
                    onClick={() => this.addLabelButton()}
                  >
                    ADD LABEL
                  </div>
                  <div
                    className="labelButton"
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
