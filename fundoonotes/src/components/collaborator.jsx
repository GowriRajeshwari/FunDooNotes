import React, { Component } from "react";
import {
  Paper,
  TextField,
  Typography,
  Divider,
  Popover,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import { searchUserList } from "../services/notesService";
import PersonIcon from "@material-ui/icons/Person";

class Collaborator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      collabatorName: "",
      collabatorArray: [],
      details: [],
      anchorEl: false,
      open: false,
      profileImage: "",
      email: "",
      firstName: "",
      capitalInitial: "",
      fullDetails: [],
    };
  }
  componentDidMount = () => {
    const profileImage = localStorage.getItem("userProfile");
    const email = localStorage.getItem("email");
    const firstName = localStorage.getItem("firstName");
    this.setState({
      email: email,
      firstName: firstName,
      profileImageFromRes: profileImage,
    });
  };
  onchangecollabator = (event) => {
    this.setState({
      collabatorName: event.target.value,
    });
    let data = {
      searchWord: event.target.value,
    };
    searchUserList(data).then((response) => {
      if (response.status === 200) {
        this.setState({ details: response.data.data.details });
        this.setState({
          anchorEl: event.currentTarget,
          open: true,
        });
      } else {
      }
    });
  };
  collabatorClick = (dat, fullDetails) => {
    const res = dat.charAt(0).toUpperCase();
    this.setState({
      open: false,
      collabatorValue: dat,
      capitalInitial: res,
    });
    this.state.collabatorArray.push(dat);
    this.state.fullDetails.push(fullDetails);
  };
  showingCollabator = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
      open: true,
    });
  };
  handleClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
      open: !this.state.open,
    });
  };
  collabsave = () => {
    this.setState({
      collabshow: false,
      originalArray: this.state.collabatorArray,
    });
    this.props.collbasave(this.state.fullDetails, this.state.capitalInitial);
  };
  deleteCollabator = (data) => {
    const index = this.state.fullDetails.findIndex(
      (fullDetails) => fullDetails.firstName === data
    );
    if (index > -1) {
      this.state.fullDetails.splice(index, 1);
    }
    this.setState({ fullDetails: this.state.fullDetails });
  };
  render() {
    return (
      <div>
        <Paper className="paper2">
          <div className="padding2">Collaborators</div>
          <Divider />
          <div className="padding">
            <form className="formStyle">
              <img
                src={
                  this.state.profileImageFromRes == ""
                    ? null
                    : "http://fundoonotes.incubation.bridgelabz.com/" +
                      this.state.profileImageFromRes
                }
                className="imgStyle"
              />

              <div className="formInside">
                <Typography>{this.state.email}</Typography>
                <Typography>{this.state.firstName}</Typography>
              </div>
            </form>
          </div>
          <div>
            <List>
              {this.state.fullDetails.map((fullDetails, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <div className="collaboratorStyle">
                      <div>{this.state.capitalInitial}</div>
                    </div>
                  </ListItemAvatar>
                  <ListItemText primary={fullDetails.firstName} />
                  <div
                    onClick={() => this.deleteCollabator(fullDetails.firstName)}
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
              <div className="collabtext2">
                <TextField
                  id="standard-multiline-flexible"
                  placeholder="Emails"
                  multiline
                  rowsMax="4"
                  size="small"
                  value={this.state.collabatorName}
                  onChange={this.onchangecollabator}
                  InputProps={{ disableUnderline: true }}
                />
              </div>
            </div>
            <div onClick={this.collabsave} className="padding2">
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
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          onClose={this.handleClick}
        >
          {this.state.details.map((details, index) => (
            <List key={index}>
              <ListItem
                button
                onClick={() => this.collabatorClick(details.firstName, details)}
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
    );
  }
}

export default Collaborator;
