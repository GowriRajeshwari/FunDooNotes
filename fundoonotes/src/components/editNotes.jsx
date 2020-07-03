import React, { Component } from "react";
import {
  ListItemText,
  ListItemAvatar,
  Paper,
  Button,
  TextField,
  Typography,
  ListItem,
  Divider,
  Popover,
  Avatar,
  List,
  Chip,
} from "@material-ui/core";
import personAdd from "../assets/person_add.png";
import download from "../assets/download.png";
import galary from "../assets/galary.png";
import pin from "../assets/pin.svg";
import {
  getNotes,
  updateNotes,
  setNotes,
  archiveNote,
  removeRemainderNotes,
} from "../services/notesService";
import PersonIcon from "@material-ui/icons/Person";
import setting from "../assets/setting.png";
import Color from "./color";
import DateTimePicker from "./dateTimePicker";
import { changeColor, updateReminderNotes } from "../services/notesService";
import FaceIcon from "@material-ui/icons/Face";
import {
  searchUserList,
  AddcollaboratorsNotes,
  removeCollaboratorsNotes,
} from "../services/notesService";
import schedule from "../assets/schedule.png";

require("dotenv").config();

class EditNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      next: true,
      value: "",
      show: [],
      description: this.props.data.description,
      open: false,
      anchorEl: null,
      setAnchorEl: null,
      date: this.props.data.reminder,
      datashow: false,
      date_timeshow: true,
      startdate: new Date(),
      collabshow: true,
      collabatorName: "",
      details: [],
      collabatorArray: this.props.data.collaborators,
      collabatorValue: "",
      originalArray: [],
      tomorrow: "",
      pined: false,
      color: this.props.data.color,
      archived: false,
      timeTodayTommorow: "08:00:00",
      timepicker: "",
      dialogBoxOpen: false,
      noteId: "",
      data: this.props.data,
      title: this.props.data.title,
      choice: this.props.choice,
      data1: [],
      collabatorName1: "",
      details1: [],
      anchorEl1: false,
      open1: false,
      profileImage1: "",
      email1: "",
      firstName1: "",
      capitalInitial1: "",
      fullDetails1: this.props.data.collaborators,
    };
  }
  onchangeText = (event) => {
    this.setState({ description: event.target.value });
  };
  onChangeTitle = (event) => {
    this.setState({ title: event.target.value });
  };
  close = (event) => {
    event.preventDefault();
    const datetostring = this.state.date.toString();
    let data = {
      noteId: this.state.data.id,
      title: this.state.title,
      description: this.state.description,
    };
    updateNotes(data).then((response) => {
      if (response.status === 200) {
        this.props.sendupdate();
      } else {
        this.setState({ snackbarmsg: "Netwrork is slow", snackbaropen: true });
      }
    });
  };
  getData = (val) => {
    this.setState({ color: val });
    document.getElementById("NoteExpand").style.background = val;

    let data = {
      color: val,
      noteIdList: [this.state.data.id],
    };
    changeColor(data).then((response) => {
      if (response.status === 200) {
      } else {
        this.setState({ snackbarmsg: "Netwrork is slow", snackbaropen: true });
      }
    });
  };
  sendtimeDate = (date) => {
    this.setState({ date: date, date_timeshow: true, dateshow: false });
  };

  handleDelete = (id) => {
    this.setState({ date: "", date_timeshow: false });
    let data = {
      noteIdList: [id],
    };
    removeRemainderNotes(data).then((response) => {
      if (response.status === 200) {
        // this.componentDidMount();
      } else {
        this.setState({ snackbarmsg: "Netwrork is slow", snackbaropen: true });
      }
    });
  };

  sendtimeDate = (date, id) => {
    this.setState({ date: date.toString() });
    let data = {
      reminder: date,
      noteIdList: [id],
    };
    updateReminderNotes(data).then((response) => {
      if (response.status === 200) {
      } else {
        this.setState({ snackbarmsg: "Netwrork is slow", snackbaropen: true });
      }
    });
  };

  reminder = (reminder, id) => {
    if (this.state.date != 0) {
      return (
        <div className="typoTextStyle">
          <Chip
            width={240}
            icon={<img src={schedule} />}
            label={this.state.date}
            onDelete={() => this.handleDelete(id)}
            color="white"
            value={this.state.date}
          />
        </div>
      );
    } else {
      return null;
    }
  };

  archivebutton = (event) => {
    this.setState({ archived: true });
    event.preventDefault();
    if (this.state.title != "") {
      const datetostring = this.state.date.toString();
      let data = {
        title: this.state.title,
        description: this.state.description,
        isPined: this.state.pined,
        color: this.state.color,
        isArchived: true,
        labelIdList: [],
        reminder: datetostring,
        collaberator: this.state.originalArray,
      };
      setNotes(data).then((response) => {
        if (response.status === 200) {
          this.props.sendNewData();
          this.setState({ title: "", description: "", next: true, color: "" });
        } else {
          this.setState({
            snackbarmsg: "Netwrork is slow",
            snackbaropen: true,
          });
        }
      });
    } else {
      this.setState({ title: "", description: "", next: true });
    }
  };
  archivebutton = (data) => {
    if (data.title != "") {
      let data1 = {
        isArchived: true,
        noteIdList: [data.id],
      };
      archiveNote(data1).then((response) => {
        if (response.status === 200) {
          this.props.sendupdate();
        } else {
          this.setState({
            snackbarmsg: "Netwrork is slow",
            snackbaropen: true,
          });
        }
      });
    } else {
      this.setState({ title: "", description: "", next: true });
    }
  };

  componentDidMount = () => {
    const profileImage1 = localStorage.getItem("userProfile");
    const email = localStorage.getItem("email");
    const firstName = localStorage.getItem("firstName");
    this.setState({
      email1: email,
      firstName1: firstName,
      profileImageFromRes1: profileImage1,
    });
  };
  onchangecollabator = (event) => {
    event.persist();
    this.setState({
      collabatorName1: event.target.value,
    });
    let data = {
      searchWord: event.target.value,
    };
    const form_data = new FormData();
    form_data.append("searchWord", event.target.value);

    searchUserList(data).then((response) => {
      if (response.status === 200) {
        this.setState({
          anchorEl1: event.currentTarget,
          open1: true,
        });
        this.setState({ details1: response.data.data.details });
      } else {
      }
    });
  };
  collabatorClick = (dat, fullDetails, id, event) => {
    const res = dat.charAt(0).toUpperCase();
    this.setState({
      open1: false,
      collabatorValue1: dat,
      capitalInitial1: res,
      anchorEl1: event.currentTarget,
    });
    this.state.fullDetails1.push(fullDetails);
    AddcollaboratorsNotes(fullDetails, id).then((response) => {
      if (response.status === 200) {
      } else {
        this.setState({ snackbarmsg: "Netwrork is slow", snackbaropen: true });
      }
    });
  };
  showingCollabator = (event) => {
    this.setState({
      anchorEl1: event.currentTarget,
      open1: true,
    });
  };
  handleClick = (event) => {
    this.setState({
      anchorEl1: event.currentTarget,
      open1: !this.state.open,
    });
  };
  collabsave = () => {
    this.setState({
      collabshow1: false,
      originalArray1: this.state.collabatorArray1,
    });
    this.props.sendupdate();
  };
  deleteCollabator = (data, fullData, id) => {
    const index = this.state.fullDetails1.findIndex(
      (fullDetails1) => fullDetails1.firstName === data
    );
    if (index > -1) {
      this.state.fullDetails1.splice(index, 1);
    }
    this.setState({ fullDetails1: this.state.fullDetails1 });

    removeCollaboratorsNotes(id, fullData.userId).then((response) => {
      if (response.status === 200) {
      } else {
        this.setState({ snackbarmsg: "Netwrork is slow", snackbaropen: true });
      }
    });
  };

  render() {
    return (
      <div>
        {this.state.choice == "editNotes" ? (
          <div className="paper3">
            <div id="NoteExpand" style={{ backgroundColor: this.state.color }}>
              <div className="showicon padding2">
                <TextField
                  id="standard-multiline-flexible"
                  placeholder="Title"
                  multiline
                  rowsMax="4"
                  size="small"
                  className="widthStyle"
                  value={this.state.title}
                  onChange={this.onChangeTitle}
                  InputProps={{ disableUnderline: true }}
                />
                <div className="padding">
                  <img src={pin} id="imgdashnotes" />
                </div>
              </div>
              <div style={{ paddingTop: "20px" }}>
                <TextField
                  id="standard-multiline-flexible"
                  placeholder="Take a Note"
                  multiline
                  rowsMax="4"
                  size="small"
                  className="widthStyle"
                  value={this.state.description}
                  onChange={this.onchangeText}
                  InputProps={{ disableUnderline: true }}
                />
              </div>
              {this.state.date_timeshow
                ? this.reminder(this.state.date, this.state.data.id)
                : null}
              <List>
                {this.state.originalArray.map((originalArray, index) => (
                  <ListItem key={index}>
                    <ListItemAvatar>
                      <Avatar>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={originalArray} />
                  </ListItem>
                ))}
              </List>
              <div className="IconDiv">
                <DateTimePicker
                  sendtimeDate={(date) =>
                    this.sendtimeDate(date, this.state.data.id)
                  }
                />
                <div onClick={this.collabshow}>
                  <img src={personAdd} id="imgdashnotes" />
                </div>
                <div>
                  <Color sendColor={this.getData} />
                </div>
                <div>
                  <img src={galary} id="imgdashnotes" />
                </div>
                <div onClick={() => this.archivebutton(this.state.data)}>
                  <img src={download} id="imgdashnotes" />
                </div>
                <div>
                  <img src={setting} id="imgdashnotes" />
                </div>
                <div className="centerStyle">
                  <Button size="small" onClick={(e) => this.close(e)}>
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <Paper className="paper4">
              <div className="padding2">Collaborators</div>
              <Divider />
              <div className="padding">
                <form className="formStyle">
                  <img
                    src={
                      this.state.profileImageFromRes1 == ""
                        ? null
                        : "http://fundoonotes.incubation.bridgelabz.com/" +
                          this.state.profileImageFromRes1
                    }
                    className="imgStyle"
                  />

                  <div className="formInside">
                    <Typography>{this.state.email1}</Typography>
                    <Typography>{this.state.firstName1}</Typography>
                  </div>
                </form>
              </div>
              <div>
                <List>
                  {this.state.fullDetails1.map((fullDetails, index) => (
                    <ListItem key={index}>
                      <ListItemAvatar>
                        <div className="collaboratorStyle">
                          <div>
                            {fullDetails.firstName.charAt(0).toUpperCase()}
                          </div>
                        </div>
                      </ListItemAvatar>
                      <ListItemText primary={fullDetails.firstName} />
                      <div
                        onClick={() =>
                          this.deleteCollabator(
                            fullDetails.firstName,
                            fullDetails,
                            this.state.data.id
                          )
                        }
                      >
                        X
                      </div>
                    </ListItem>
                  ))}
                </List>
                <div className="avatarDiv">
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                  <TextField
                    id="standard-multiline-flexible"
                    placeholder="Emails"
                    multiline
                    rowsMax="4"
                    size="small"
                    className="collabtext"
                    value={this.state.collabatorName1}
                    onChange={this.onchangecollabator}
                    InputProps={{ disableUnderline: true }}
                  />
                </div>
                <div
                  onClick={() => this.collabsave(this.state.data.id)}
                  className="padding2"
                >
                  save
                </div>
              </div>
            </Paper>
            <Popover
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              open={this.state.open1}
              anchorEl={this.state.anchorEl1}
              onClose={this.handleClick}
            >
              {this.state.details1.map((details, index) => (
                <List key={index}>
                  <ListItem
                    button
                    onClick={(event) =>
                      this.collabatorClick(
                        details.firstName,
                        details,
                        this.state.data.id,
                        event
                      )
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={details.firstName} />
                    <ListItemText primary={details.email} />
                  </ListItem>
                </List>
              ))}
            </Popover>
          </div>
        )}
      </div>
    );
  }
}
export default EditNotes;
