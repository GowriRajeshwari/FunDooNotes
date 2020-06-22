import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import Divider from '@material-ui/core/Divider';
import Popover from '@material-ui/core/Popover';
import { searchUserList } from '../services/notesService'
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';


class Collaborator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      collabatorName: '',
      collabatorArray: [],
      details: [],
      anchorEl: false,
      open: false,
      profileImage: '',
      email: '',
      firstName: '',
      capitalInitial: '',
      fullDetails: []

    };
  }
  componentDidMount = () => {
    const profileImage = localStorage.getItem("userProfile");
    const email = localStorage.getItem("email");
    const firstName = localStorage.getItem("firstName");
    this.setState({ email: email, firstName: firstName, profileImageFromRes: profileImage })

  }
  onchangecollabator = (event) => {
    this.setState({
      collabatorName: event.target.value
    })
    let data = {
      searchWord: event.target.value
    }
    searchUserList(data).then(response => {
      console.log(response.data.data.details);
      if (response.status === 200) {
        this.setState({ details: response.data.data.details })
        this.setState({
          anchorEl: event.currentTarget,
          open: true
        });

      } else {
      }
    });
  }
  collabatorClick = (dat, fullDetails) => {
    const res = dat.charAt(0).toUpperCase();
    this.setState({
      open: false, collabatorValue: dat, capitalInitial: res
    })
    this.state.collabatorArray.push(dat)
    this.state.fullDetails.push(fullDetails)
  }
  showingCollabator = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
      open: true
    });
  }
  handleClick = (event) => {
    // console.log("entered")
    this.setState({
      anchorEl: event.currentTarget,
      open: !this.state.open
    });
  }
  collabsave = () => {
    this.setState({ collabshow: false, originalArray: this.state.collabatorArray })
    this.props.collbasave(this.state.fullDetails, this.state.capitalInitial)
  }
  deleteCollabator = (data) => {
    const index = this.state.fullDetails.findIndex(fullDetails => fullDetails.firstName === data);
    console.log(index)
    if (index > -1) {
      this.state.fullDetails.splice(index, 1)
    }
    this.setState({ fullDetails: this.state.fullDetails })
  }
  render() {
    return (


      <div>
        <Paper className="paper2">
          <div style={{ padding: '10px' }}>Collaborators</div>
          <Divider />
          <div style={{ padding: '5px' }}>
            <form style={{ display: 'flex', flexDirection: 'row', padding: '10px' }} >

              <img
                src={this.state.profileImageFromRes == '' ? null : "http://fundoonotes.incubation.bridgelabz.com/" + this.state.profileImageFromRes}
                style={{ width: '40px', height: '40px', backgroundColor: 'white', borderRadius: '50px' }} />

              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: '15px' }}>
                <Typography>{this.state.email}</Typography>
                <Typography>{this.state.firstName}</Typography>

              </div>
            </form>
          </div>
          <div >
            <List>
              {this.state.fullDetails.map((fullDetails, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <div style={{
                      width: '40px', height: '40px', backgroundColor: 'white', borderRadius: '50px',
                      justifyContent: 'center', alignItems: 'center', display: 'flex', border: '0.1px solid grey',
                      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                    }}>
                      <div>{this.state.capitalInitial}</div>
                    </div>

                  </ListItemAvatar>
                  <ListItemText primary={fullDetails.firstName} />
                  <div onClick={() => this.deleteCollabator(fullDetails.firstName)}>X</div>
                </ListItem>
              ))}
            </List>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: '15px' }}>
              <Avatar >
                <PersonIcon />
              </Avatar>
              <TextField
                id="standard-multiline-flexible"
                placeholder="Emails"
                multiline
                rowsMax="4"
                size="small"
                style={{ width: '100%', paddingLeft: '15px' }}
                value={this.state.collabatorName}
                onChange={this.onchangecollabator}
                // onClick={e => this.showingCollabator(e)}
                InputProps={{ disableUnderline: true }}
              />
            </div>
            <div onClick={this.collabsave} style={{ padding: '10px' }}>save</div>
          </div>



        </Paper>
        <Popover
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          onClose={this.handleClick}>

          {this.state.details.map((details, index) => (
            <List key={index}>
              <ListItem button onClick={() => this.collabatorClick(details.firstName, details)} >
                <ListItemAvatar>
                  <Avatar >
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

    )
  }
}

export default Collaborator;