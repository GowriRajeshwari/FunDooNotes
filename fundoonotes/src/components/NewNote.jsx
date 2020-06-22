import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import profile from '../assets/profile.png';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { login } from "../services/LoginService"
import { Typography } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Divider from '@material-ui/core/Divider';
import Popper from '@material-ui/core/Popper';
import Popover from '@material-ui/core/Popover';
import reminder from '../assets/reminder.svg'
import personAdd from '../assets/person_add.png'
import color from '../assets/color.png'
import download from '../assets/download.png'
import galary from '../assets/galary.png'
import pin from '../assets/pin.svg'
import { searchUserList } from '../services/notesService'
import { getNotes, setNotes } from '../services/notesService'
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import { blue } from '@material-ui/core/colors';
import setting from '../assets/setting.png'
import Color from './Color'
import EditNotes from './EditNotes'
import DateTimePicker from './DateTimePicker'
import Collaborator from './Collaborator'
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import list_black from '../assets/list_black.png'
import ListItemchecklist from './ListItemchecklist'
import LabelNotes from './LabelNotes'
import schedule from '../assets/schedule.png'

require('dotenv').config();


class NewNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      next: true,
      value: '',
      show: [],
      data: [],
      description: '',
      title: '',
      open: false,
      anchorEl: null,
      setAnchorEl: null,
      date: '',
      dateshow: false,
      date_timeshow: false,
      startdate: new Date(),
      collabshow: false,
      collabatorName: '',
      details: [],
      collabatorArray: [],
      collabatorValue: '',
      originalArray: [],
      tomorrow: '',
      pined: false,
      color: '',
      archived: false,
      timeTodayTommorow: '08:00:00',
      timepicker: '',
      dialogBoxOpen: false,
      listitem: true,
      labelIdList: [],
      labelNotes: [],
      capitialInitial: ''

    };
  }
  handleDateChange = (date) => {
    this.setState({ date: date })
  };
  componentDidMount = () => {

    var d = new Date();
    d.setDate(new Date().getDate() + 1)
    console.log(d.getTime())
    this.setState({ tomorrow: d, time: d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() })

  }
  takeNote = (event) => {
    event.preventDefault();
    this.setState({ next: false, listitem: true })
  }

  onchangeText = (event) => {
    this.setState({ description: event.target.value })
  }
  onChangeTitle = (event) => {
    this.setState({ title: event.target.value })
  }

  _onMouseMove = (event) => {
    this.setState({ show: true })
  }
  _onMouseOut = (event) => {
    this.setState({ show: false })
  }
  close = async (event) => {
    event.preventDefault();
    for (let i = 0; i < this.state.labelNotes.length; i++) {
      this.state.labelIdList.push(this.state.labelNotes[i].id)
      console.log(this.state.labelNotes[i].id)
    }
    this.setState({ labelIdList: this.state.labelIdList })
    if (this.state.title != '') {
      const datetostring = this.state.date.toString();
      const form_data = new FormData();
      form_data.append("title", this.state.title);
      form_data.append("description", this.state.description);
      form_data.append("reminder", datetostring);
      form_data.append("isPined", this.state.pined);
      form_data.append("isArchived", this.state.archived);
      form_data.append("color", this.state.color);
      form_data.append("labelIdList", JSON.stringify(this.state.labelIdList));
      form_data.append("collaberators", JSON.stringify(this.state.originalArray));

      console.log(form_data)

      setNotes(form_data).then(response => {
        console.log(response);
        if (response.status === 200) {
          this.props.sendNewData();
          document.getElementById("NoteExpand").style.background = 'white';
          this.setState({ originalArray: [], title: '', description: '', next: true, color: '', date_timeshow: false, date: '', labelNotes: [], labelIdList: [] })
        } else {
          this.setState({ snackbarmsg: "Netwrork is slow", snackbaropen: true });
        }
      });
      // this.setState({ title : '',description : '',next : true,color:'',date_timeshow : false,date:'',labelIdList:[]})

    } else {
      document.getElementById("NoteExpand").style.background = 'white';
      this.setState({ originalArray: [], title: '', description: '', next: true, color: '', date_timeshow: false, date: '', labelIdList: [], labelNotes: [] })

    }

  }
  timepicker = (event) => {
    this.setState({ timepicker: event.target.value })

  }

  handleClick = (event) => {
    // console.log("entered")
    this.setState({
      anchorEl: event.currentTarget,
      open: !this.state.open
    });
  };
  dateshow = () => {
    this.setState({ dateshow: !this.state.dateshow })
  }
  back = () => {
    console.log("back");
  }
  todaydate = () => {
    this.setState({ date: new Date().toDateString() + " " + this.state.timeTodayTommorow, date_timeshow: true });
  }
  tomorrowdate = () => {
    this.setState({ date: this.state.tomorrow.toDateString() + " " + this.state.timeTodayTommorow, date_timeshow: true });
  }
  datesave = () => {
    this.setState({ date: this.state.startdate + " " + this.state.timepicker, date_timeshow: true, dateshow: false });
  }

  handleDateChange = (date) => {
    this.setState({
      startdate: date.toDateString()
    });
  };
  collabshow = () => {
    this.setState({ collabshow: true })
  }

  onchangecollabator = (event) => {
    this.setState({
      collabatorName: event.target.value
    })
    let data = {
      searchWord: event.target.value
    }
    searchUserList(data).then(response => {
      // console.log(response.data.data.details[0]);
      if (response.status === 200) {
        this.setState({ details: response.data.data.details })
      } else {
      }
    });
  }

  collabsave = () => {
    this.setState({ collabshow: false, originalArray: this.state.collabatorArray })
  }
  time = () => {
    this.setState({ timeShow: true })
  }
  archivebutton = (event) => {
    this.setState({ archived: true })
    event.preventDefault();
    if (this.state.title != '') {
      const datetostring = this.state.date.toString();
      let data = {
        title: this.state.title,
        description: this.state.description,
        isPined: this.state.pined,
        color: this.state.color,
        isArchived: true,
        labelIdList: this.state.labelIdList,
        reminder: datetostring,
        collaberator: this.state.originalArray
      }
      console.log(this.state.date)
      console.log(data)

      setNotes(data).then(response => {
        console.log(response);
        if (response.status === 200) {
          this.props.sendNewData();
          this.setState({ title: '', description: '', next: true, color: '' })
        } else {
          this.setState({ snackbarmsg: "Netwrork is slow", snackbaropen: true });
        }
      });
    } else {
      this.setState({ title: '', description: '', next: true })
    }
  }


  getData = (val) => {
    console.log(val)
    this.setState({ color: val })
    document.getElementById("NoteExpand").style.background = val;
  }
  sendtimeDate = (date) => {
    this.setState({ date: date, date_timeshow: true, dateshow: false });
  }

  handleDelete = () => {
    this.setState({ date: '', date_timeshow: false })
  };

  listitem = () => {
    this.setState({ listitem: false, next: false })
  }
  sendlist = () => {
    this.setState({ next: true })
    this.props.sendNewData();
  }
  labelNotes = (value) => {
    console.log(value)
    this.setState({ labelNotes: value })
  }
  handleDeletelabel = (id, index) => {
    if (index > -1) {
      this.state.labelNotes.splice(index, 1)
    }
    this.setState({ labelNotes: this.state.labelNotes })
  }
  collaboratorsave = (value, capitialInitial) => {
    console.log(value)
    this.setState({ originalArray: value, collabshow: false, capitialInitial: capitialInitial })
  }
  render() {
    return (
      <div className="containerdash">
        {this.state.next ?

          <div className="paper" >
            <div className="paper">
              <Typography onClick={e => this.takeNote(e)} className="Typo">Take a Notes</Typography>
              <div style={{ padding: '5px', display: 'flex', justifyContent: 'center' }} onClick={this.listitem}>
                <img src={list_black} style={{ width: '40px', height: '40px' }} />
              </div>
            </div>
          </div>


          :
          this.state.collabshow ?
            <Collaborator collbasave={this.collaboratorsave} /> :
            this.state.listitem ?

              <div className="paper2">
                <div id="NoteExpand">

                  <div className='showicon' style={{ paddingTop: '10px' }}>
                    <TextField
                      value={this.state.title}
                      id="standard-multiline-flexible"
                      placeholder="Title"
                      multiline
                      rowsMax="4"
                      size="small"
                      style={{ width: '100%' }}
                      onChange={this.onChangeTitle}
                      InputProps={{ disableUnderline: true }}
                    />
                    <div style={{ padding: '5px' }}>
                      <img src={pin} id="imgdashnotes" />
                    </div>

                  </div>
                  <div style={{ paddingTop: '20px' }}>
                    <TextField
                      value={this.state.description}
                      id="standard-multiline-flexible"
                      placeholder="Take a Note"
                      multiline
                      rowsMax="4"
                      size="small"
                      style={{ width: '100%' }}
                      onChange={this.onchangeText}
                      InputProps={{ disableUnderline: true }}
                    />
                  </div>
                  {this.state.date_timeshow ?
                    <Chip
                      style={{ width: '300px' }}
                      icon={<img src={schedule} />}
                      label={this.state.date}
                      onDelete={this.handleDelete}
                      color="white"
                      value={this.state.date}
                    />
                    : null}
                  <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', width: '100%', padding: '5px' }}>

                    {this.state.originalArray.map((originalArray, index) => (
                      <div style={{ padding: '5px' }}>
                        <ListItem key={index}>
                          <ListItemAvatar>
                            <div style={{
                              width: '40px', height: '40px', backgroundColor: 'white', borderRadius: '50px',
                              justifyContent: 'center', alignItems: 'center', display: 'flex', border: '0.1px solid grey',
                              boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                            }}>
                              <div>{this.state.capitialInitial}</div>
                            </div>
                          </ListItemAvatar>
                          <ListItemText primary={originalArray.firstName} />

                        </ListItem>
                      </div>
                    ))}

                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', width: '100%', padding: '5px' }}>
                    {this.state.labelNotes.map((labelNotes, index) => (
                      <div style={{ padding: '5px' }}>
                        <Chip key={index}
                          style={{ width: 'auto' }}
                          label={labelNotes.label}
                          onDelete={() => this.handleDeletelabel(labelNotes.id, index)}
                          color="white"
                        // value={this.state.date}
                        />
                      </div>

                    ))}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', paddingTop: '10px', justifyContent: 'space-around' }}>
                    <DateTimePicker sendtimeDate={this.sendtimeDate} />
                    <div onClick={this.collabshow}>
                      <img src={personAdd} id="imgdashnotes" />
                    </div>
                    <div >

                      <Color sendColor={this.getData} />
                    </div>
                    <div>
                      <img src={galary} id="imgdashnotes" />
                    </div>
                    <div onClick={this.archivebutton}>
                      <img src={download} id="imgdashnotes" />
                    </div>
                    <LabelNotes labelNotes={this.labelNotes} />
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Button size="small" onClick={e => this.close(e)}>Close</Button>
                    </div>
                  </div>




                </div>
              </div>

              :
              <div>
                <ListItemchecklist sendlist={this.sendlist} />
              </div>
        }

      </div>
    )
  }
}

export default NewNote;