import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import pin from "../assets/pin.svg";
import { searchUserList } from "../services/notesService";
import { getNotes, setNotes, deleteNotes } from "../services/notesService";
import Dialog from "@material-ui/core/Dialog";
import EditNotes from "./EditNotes";
import NewNote from "./NewNote";
import DeleteIcon from "./DeleteIcon";
import Chip from "@material-ui/core/Chip";
import schedule from "../assets/schedule.png";
import ClipLoader from "react-spinners/ClipLoader";

require("dotenv").config();

function searchigFor(query) {
  return function (x) {
    return (
      x.title.toLowerCase().includes(query.toLowerCase()) ||
      x.description.toLowerCase().includes(query.toLowerCase()) ||
      !query
    );
  };
}

class Trash extends Component {
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
      date: new Date(),
      datashow: false,
      date_timeshow: true,
      startdate: new Date(),
      collabshow: true,
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
      noteIdList: [],
      nonDeleteData: [],
      query: this.props.query,
      loading: true,
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
    getNotes().then((response) => {
      if (response.status === 200) {
        this.setState({ data: response.data.data.data, loading: false });
      } else {
        this.setState({ snackbarmsg: "Netwrork is slow", snackbaropen: true });
      }
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
    if (this.state.title != "") {
      const datetostring = this.state.date.toString();
      let data = {
        title: this.state.title,
        description: this.state.description,
        isPined: this.state.pined,
        color: this.state.color,
        isArchived: this.state.archived,
        labelIdList: [],
        reminder: datetostring,
        collaberator: this.state.originalArray,
      };
      setNotes(data).then((response) => {
        if (response.status === 200) {
          this.componentDidMount();
          this.setState({ title: "", description: "", next: true });
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
    this.setState({ dateshow: !this.state.datashow });
  };
  back = () => {
    this.setState({ dateshow: false });
  };
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

  onchangecollabator = async (event) => {
    await this.setState({
      collabatorName: event.target.value,
    });
    let data = {
      searchWord: this.state.collabatorName,
    };
    searchUserList(data).then((response) => {
      if (response.status === 200) {
        this.setState({ details: response.data.data.details });
      } else {
      }
    });
  };
  showingCollabator = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
      open: true,
    });
  };
  collabatorClick = (dat) => {
    this.setState({
      open: false,
      collabatorValue: dat,
    });
    this.state.collabatorArray.push(dat);
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
  archivebutton = async (event) => {
    await this.setState({ archived: true });
    event.preventDefault();
    if (this.state.title != "") {
      const datetostring = this.state.date.toString();
      let data = {
        title: this.state.title,
        description: this.state.description,
        isPined: this.state.pined,
        color: this.state.color,
        isArchived: this.state.archived,
        labelIdList: [],
        reminder: datetostring,
        collaberator: this.state.originalArray,
      };
      setNotes(data).then((response) => {
        if (response.status === 200) {
          this.setState({ title: "", description: "", next: true });
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

  colorboxbutton = () => {};
  getData = (val, index) => {
    this.setState({ color: val });
    document.getElementsByClassName("mydivouter")[
      index
    ].style.backgroundColor = val;
  };
  dialogboxOpen = (title, description, id) => {
    this.setState({
      dialogBoxOpen: !this.state.dialogBoxOpen,
      title: title,
      description: description,
      id: id,
    });
  };
  handelNoteDialogBox = () => {
    this.setState({
      dialogBoxOpen: !this.state.dialogBoxOpen,
    });
  };
  getdataupdate = () => {
    this.handelNoteDialogBox();
    this.componentDidMount();
  };
  sendNewData = () => {
    this.componentDidMount();
  };

  sendtimeDate = (date) => {
    this.setState({ date: date, date_timeshow: true, dateshow: false });
  };
  sendtrash = (val) => {
    this.componentDidMount();
  };
  reminder = (reminder, id) => {
    if (reminder != 0) {
      return (
        <div
          className="typoText"
          style={{ paddingTop: "10px", width: "150px" }}
        >
          <Chip
            style={{ width: "240px" }}
            icon={<img src={schedule} />}
            label={reminder}
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
  render() {
    return (
      <div className="maincontainer">
        <ClipLoader
          css={{ width: "50px", height: "50px", marginTop: "45px" }}
          size={150}
          color={"#123abc"}
          loading={this.state.loading}
        />
        <div
          className={this.props.gridView ? "notescontainer1" : "notescontainer"}
        >
          {this.state.data
            .filter(searchigFor(this.props.query))
            .map((data, index) => {
              if (data.isDeleted === true)
                return (
                  <div
                    key={index}
                    style={{
                      borderRadius: "10px",
                      cursor: "pointer",
                      padding: "10px",
                    }}
                  >
                    <Card
                      className={
                        this.props.gridView ? "mydivoutergrid" : "mydivouter"
                      }
                      style={{
                        backgroundColor: this.state.data[index].color,
                        padding: "5px",
                      }}
                    >
                      <div className="showicon">
                        <div
                          className={
                            this.props.gridView ? "typoText1" : "typoText"
                          }
                        >
                          {data.title}
                        </div>
                        <div
                          className="mybuttonoverlap"
                          style={{ padding: "5px" }}
                        >
                          <img src={pin} id="imgdashnotes" />
                        </div>
                      </div>
                      <div
                        className="typoText"
                        onClick={() =>
                          this.dialogboxOpen(
                            data.title,
                            data.description,
                            data.id
                          )
                        }
                      >
                        {data.description}
                      </div>
                      {this.state.date_timeshow
                        ? this.reminder(data.reminder, data.id)
                        : null}

                      <div className="mybuttonoverlap">
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            paddingTop: "5px",
                            justifyContent: "flex-start",
                          }}
                        >
                          <div
                            style={{ padding: "5px" }}
                            onClick={(e) => this.handleClick(e)}
                          >
                            <DeleteIcon
                              id={data.id}
                              true="true"
                              sendtrash={this.sendtrash}
                            />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                );
            })}
        </div>
      </div>
    );
  }
}
export default Trash;
