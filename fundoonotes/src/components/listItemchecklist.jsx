import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  ListItemText,
  ListItemAvatar,
  Paper,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  Grid,
  ListItem,
  Popper,
  Divider,
  Popover,
  Avatar,
  List,
  Chip,
} from "@material-ui/core";
import personAdd from "../assets/person_add.png";
import color from "../assets/color.png";
import download from "../assets/download.png";
import galary from "../assets/galary.png";
import pin from "../assets/pin.svg";
import { searchUserList } from "../services/notesService";
import { getNotes, setNotes } from "../services/notesService";
import setting from "../assets/setting.png";
import Color from "./color";
import EditNotes from "./editNotes";
import DateTimePicker from "./dateTimePicker";
import schedule from "../assets/schedule.png";
import FaceIcon from "@material-ui/icons/Face";
import list_black from "../assets/list_black.png";
import delete1 from "../assets/delete.png";
import add from "../assets/add.png";
import clear from "../assets/clear.png";
import checkboxoutline from "../assets/checkboxoutline.png";
import checkboxtick from "../assets/checkboxtick.png";
import LabelNotes from "./labelNotes";
import Collaborator from "./collaborator";

require("dotenv").config();

class ListItemchecklist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      next: true,
      value: "",
      show: [],
      data: [],
      description: "",
      title: "",
      open: false,
      anchorEl: null,
      setAnchorEl: null,
      date: "",
      dateshow: false,
      date_timeshow: false,
      startdate: new Date(),
      collabshow: false,
      collabatorName: "",
      details: [],
      collabatorArray: [],
      collabatorValue: "",
      originalArray: [],
      tomorrow: "",
      pined: false,
      color: "",
      archived: false,
      timeTodayTommorow: "08:00:00",
      timepicker: "",
      dialogBoxOpen: false,
      items: "",
      itemsArray: [],
      listallitems: false,
      tickboxArray: [],
      tickbox: false,
      labelIdList: [],
      labelNotes: [],
    };
  }
  handleDateChange = (date) => {
    this.setState({ date: date });
  };
  componentDidMount = () => {
    var d = new Date();
    d.setDate(new Date().getDate() + 1);
    this.setState({
      tomorrow: d,
      time: d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
    });
  };
  takeNote = (event) => {
    event.preventDefault();
    this.setState({ next: false });
  };

  onchangeText = (event) => {
    this.setState({ description: event.target.value });
  };
  onChangeTitle = (event) => {
    this.setState({ title: event.target.value });
  };

  _onMouseMove = (event) => {
    this.setState({ show: true });
  };
  _onMouseOut = (event) => {
    this.setState({ show: false });
  };
  close = (event) => {
    event.preventDefault();
    for (let i = 0; i < this.state.labelNotes.length; i++) {
      this.state.labelIdList.push(this.state.labelNotes[i].id);
    }

    this.setState({ labelIdList: this.state.labelIdList }, this.dataPassing());
  };
  dataPassing = () => {
    const combineArray = this.state.itemsArray.concat(this.state.tickboxArray);
    const datetostring = this.state.date.toString();
    if (this.state.title != "") {
      const form_data = new FormData();
      form_data.append("title", this.state.title);
      form_data.append("description", this.state.description);
      form_data.append("reminder", datetostring);
      form_data.append("isPined", this.state.pined);
      form_data.append("isArchived", this.state.archived);
      form_data.append("color", this.state.color);
      form_data.append("labelIdList", JSON.stringify(this.state.labelIdList));
      form_data.append(
        "collaberators",
        JSON.stringify(this.state.originalArray)
      );
      form_data.append("checklist", JSON.stringify(combineArray));

      let data = {
        title: this.state.title,
        isPined: this.state.pined,
        color: this.state.color,
        isArchived: this.state.archived,
        labelIdList: this.state.labelIdList,
        reminder: datetostring,
        collaberator: this.state.originalArray,
        checklist: combineArray,
      };
      setNotes(form_data).then((response) => {
        if (response.status === 200) {
          this.props.sendlist();
          this.setState({
            itemsArray: [],
            tickboxArray: [],
            title: "",
            next: true,
            items: "",
          });
        } else {
          this.setState({
            snackbarmsg: "Netwrork is slow",
            snackbaropen: true,
          });
        }
      });
    } else {
      this.props.sendlist();
    }
  };
  timepicker = (event) => {
    this.setState({ timepicker: event.target.value });
  };

  handleClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
      open: !this.state.open,
    });
  };
  dateshow = () => {
    this.setState({ dateshow: !this.state.dateshow });
  };
  back = () => {};
  todaydate = () => {
    this.setState({
      date: new Date().toDateString() + " " + this.state.timeTodayTommorow,
      date_timeshow: true,
    });
  };
  tomorrowdate = () => {
    this.setState({
      date:
        this.state.tomorrow.toDateString() + " " + this.state.timeTodayTommorow,
      date_timeshow: true,
    });
  };
  datesave = () => {
    this.setState({
      date: this.state.startdate + " " + this.state.timepicker,
      date_timeshow: true,
      dateshow: false,
    });
  };

  handleDateChange = (date) => {
    this.setState({
      startdate: date.toDateString(),
    });
  };
  collabshow = () => {
    this.setState({ collabshow: false });
  };

  onchangecollabator = (event) => {
    this.setState({
      collabatorName: event.target.value,
    });
    let data = {
      searchWord: event.target.value,
    };
    const form_data = new FormData();
    form_data.append("searchWord", this.state.collabatorName);

    searchUserList(form_data).then((response) => {
      if (response.status === 200) {
        this.setState({ details: response.data.data.details });
      } else {
      }
    });
  };
  collabsave = () => {
    this.setState({
      collabshow: true,
      originalArray: this.state.collabatorArray,
    });
  };
  time = () => {
    this.setState({ timeShow: true });
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

  getData = (val) => {
    this.setState({ color: val });
    document.getElementById("NoteExpand").style.background = val;
  };
  sendtimeDate = (date) => {
    this.setState({ date: date, date_timeshow: true, dateshow: false });
  };

  handleDelete = () => {
    this.setState({ date: "", date_timeshow: false });
  };
  additem = async () => {
    let listData = { itemName: this.state.items, status: "open" };

    this.state.itemsArray.push(listData);
    this.setState({ listallitems: true, items: "" });
  };
  onchangelistItem = (event) => {
    this.setState({ items: event.target.value });
  };
  checkboxoutline = async (arrayvalue) => {
    let listData = { itemName: arrayvalue, status: "close" };
    this.state.tickboxArray.push(listData);
    await this.setState({ tickboxArray: this.state.tickboxArray });
    const index = this.state.itemsArray.findIndex(
      (itemsArray) => itemsArray.itemName === arrayvalue
    );
    if (index > -1) {
      this.state.itemsArray.splice(index, 1);
    }
    this.setState({ tickbox: true });
  };
  clear = () => {
    this.setState({ items: "" });
  };
  labelNotes = (value) => {
    this.setState({ labelNotes: value });
  };
  handleDeletelabel = (id, index) => {
    if (index > -1) {
      this.state.labelNotes.splice(index, 1);
    }
    this.setState({ labelNotes: this.state.labelNotes });
  };
  collaboratorsave = (value, capitialInitial) => {
    this.setState({
      originalArray: value,
      collabshow: false,
      capitialInitial: capitialInitial,
    });
  };
  collabsave = () => {
    this.setState({
      collabshow: false,
      originalArray: this.state.collabatorArray,
    });
  };
  collabshow = () => {
    this.setState({ collabshow: !this.state.collabshow });
  };
  render() {
    return (
      <div className="paper2">
        {this.state.collabshow ? (
          <Collaborator collbasave={this.collaboratorsave} />
        ) : (
          <div id="NoteExpand">
            <div className="showicon" className="padding2">
              <TextField
                id="standard-multiline-flexible"
                placeholder="Title"
                multiline
                rowsMax="4"
                size="small"
                className="widthStyle"
                onChange={this.onChangeTitle}
                InputProps={{ disableUnderline: true }}
              />
              <div className="padding">
                <img src={pin} id="imgdashnotes" />
              </div>
            </div>
            {this.state.listallitems
              ? this.state.itemsArray.map((itemsArray, index) => (
                  <List>
                    <div className="textdash">
                      <div
                        className="ImageDiv"
                        onClick={() =>
                          this.checkboxoutline(itemsArray.itemName)
                        }
                      >
                        <img src={checkboxoutline} id="imgdashnotes" />
                      </div>
                      <Typography className="widthStyle">
                        {itemsArray.itemName}
                      </Typography>
                      <div className="ImageDiv">
                        <img src={delete1} id="imgdashnotes" />
                      </div>
                    </div>
                  </List>
                ))
              : null}
            {this.state.date_timeshow ? (
              <Chip
                className="chipWidth"
                icon={<img src={schedule} />}
                label={this.state.date}
                onDelete={this.handleDelete}
                color="white"
                value={this.state.date}
              />
            ) : null}
            <Divider />
            <div className="textdash padding2">
              <div className="ImageDiv" onClick={this.additem}>
                <img src={add} id="imgdashnotes" />
              </div>

              <TextField
                id="standard-multiline-flexible"
                placeholder="List Item"
                multiline
                rowsMax="4"
                size="small"
                className="widthStyle"
                value={this.state.items}
                InputProps={{ disableUnderline: true }}
                onChange={this.onchangelistItem}
              />

              <div className="ImageDiv" onClick={this.clear}>
                <img src={clear} id="imgdashnotes" />
              </div>
            </div>
            <Divider />

            {this.state.tickbox
              ? this.state.tickboxArray.map((tickboxArray, index) => {
                  return (
                    <List>
                      <div className="textdash">
                        <div className="ImageDiv">
                          <img src={checkboxtick} id="imgdashnotes" />
                        </div>
                        <Typography
                          style={{
                            width: "100%",
                            textDecoration: "line-through",
                          }}
                        >
                          {tickboxArray.itemName}
                        </Typography>
                        <div className="ImageDiv">
                          <img src={delete1} id="imgdashnotes" />
                        </div>
                      </div>
                    </List>
                  );
                })
              : null}
            <div className="labelStyle">
              {this.state.labelNotes.map((labelNotes, index) => (
                <div className="padding">
                  <Chip
                    key={index}
                    className="chipStyle"
                    label={labelNotes.label}
                    onDelete={() =>
                      this.handleDeletelabel(labelNotes.id, index)
                    }
                    color="white"
                    value={this.state.date}
                  />
                </div>
              ))}
            </div>
            <div className="labelStyle">
              {this.state.originalArray.map((originalArray, index) => (
                <div className="padding">
                  <ListItem key={index}>
                    <ListItemAvatar>
                      <div className="collaboratorStyle">
                        <div>{this.state.capitialInitial}</div>
                      </div>
                    </ListItemAvatar>
                    <ListItemText primary={originalArray.firstName} />
                  </ListItem>
                </div>
              ))}
            </div>
            <div className="IconDiv">
              <DateTimePicker sendtimeDate={this.sendtimeDate} />
              <div onClick={this.collabshow}>
                <img src={personAdd} id="imgdashnotes" />
              </div>
              <div>
                <Color sendColor={this.getData} />
              </div>
              <div>
                <img src={galary} id="imgdashnotes" />
              </div>
              <div onClick={this.archivebutton}>
                <img src={download} id="imgdashnotes" />
              </div>
              <LabelNotes labelNotes={this.labelNotes} />

              <div className="centerStyle">
                <Button size="small" onClick={(e) => this.close(e)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default ListItemchecklist;
