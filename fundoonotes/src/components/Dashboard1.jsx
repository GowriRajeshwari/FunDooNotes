// import React, { Component } from "react";
// import Paper from "@material-ui/core/Paper";
// import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";
// import sidenavicon from '../assets/sidenavicon.png';
// import search from '../assets/search.png';
// import clear from '../assets/clear.png';
// import refresh from '../assets/refresh.png';
// import box from '../assets/box.png';

// class Dashboard extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             helperText: "",
//             error: false,
//             username: "",
//             userdata: [],
//             show: false,
//             login: "Sign in",
//             next: false,
//             password: '',
//             helperTextpassowrd: "",
//             showtakeNotes: false,
//             snackbaropen: false,
//             snackbarmsg: '',

//         };
//         this.Takeanote = this.Takeanote.bind(this);
//         // this.handleClose = this.handleClose.bind(this);


//     }
//     //take noe
//     Takeanote(event) {
//         event.preventDefault();
//         this.setState({ showtakeNotes: true })
//     }
//     //setState for password field
//     onChangePassword(event) {
//         if (event.target.value.length > 7) {
//             this.setState({
//                 helperTextpassowrd: "",
//                 error: false,
//                 password: event.target.value
//             });
//         } else {
//             this.setState({
//                 helperTextpassowrd: "Password should be 7 letters",
//                 error: true,
//                 password: event.target.value
//             });
//         }
//     }

//     render() {
//         return (

//             <div className="dashContainer">

//                 <Paper className="dashsearch">

//                     <div>
//                         <Button onClick={e => this.arrowButton(e)}>
//                             <img src={sidenavicon} id="imgdash" />
//                         </Button>
//                     </div>
//                     <div>
//                         <div className="textremainderDash">Remainder</div>
//                     </div>


//                     <div className="searcheledash">

//                         <Paper>
//                             <img src={search} id="imgdash" />
//                             <TextField
//                                 hintText="Password"
//                                 floatingLabelText="Password"
//                                 id="inputFielddash"
//                                 //    variant="outlined"
//                                 //    label="Search"
//                                 InputProps={{ disableUnderline: true }}
//                                 style={{ width: '380px', backgroundColor: '#ff00', border: 'none', disableUnderline: true }}
//                             //    helperText={this.state.helperTextpassowrd}
//                             //    onChange={this.onChangePassword.bind(this)}
//                             />
//                             <img src={clear} id="imgdash" />
//                         </Paper>
//                     </div>
//                     <div className="icondash">
//                         <div>
//                             <img src={refresh} id="imgdash" />
//                         </div>
//                         <div className="columimg">
//                             <img src={box} id="imgdash" />
//                         </div>
//                         <div>
//                             <img src={search} id="imgdash" />
//                         </div>

//                     </div>
//                     <div className="icondashlast">

//                         <div>
//                             <img src={search} id="imgdash" />
//                         </div>
//                         <div>
//                             <img src={search} id="imgdash" />
//                         </div>
//                     </div>

//                 </Paper>

//                 <div className="dash2cont">
//                     {this.state.showtakeNotes ?
//                         <Paper >
//                             <div className="papar2dash">
//                                 <TextField
//                                     required id="standard-required"
//                                     // label="Required" defaultValue="Hello World"
//                                     // label="Take a note"
//                                     InputProps={{ disableUnderline: true }}
//                                     style={{ width: '380px', backgroundColor: '#ff00', border: 'none', }}
//                                     //    helperText={this.state.helperTextpassowrd}
//                                     onChange={this.onChangePassword.bind(this)}
//                                 />

//                             </div>
//                         </Paper>
//                         :
//                         <Paper >
//                             <div className="papar2dash">
//                                 <Button onClick={e => this.Takeanote(e)}>
//                                     <TextField
//                                         required id="standard-required"
//                                         // label="Required" defaultValue="Hello World"
//                                         // label="Take a note"
//                                         InputProps={{ disableUnderline: true }}
//                                         style={{ width: '380px', backgroundColor: '#ff00', border: 'none', }}
//                                         //    helperText={this.state.helperTextpassowrd}
//                                         onChange={this.onChangePassword.bind(this)}
//                                     />
//                                 </Button>
//                                 <div className="icondash">
//                                     <div>
//                                         <img src={refresh} id="imgdash" />
//                                     </div>
//                                     <div className="columimg">
//                                         <img src={box} id="imgdash" />
//                                     </div>
//                                     <div>
//                                         <img src={search} id="imgdash" />
//                                     </div>

//                                 </div>
//                             </div>
//                         </Paper>
//                     }
//                 </div>



//             </div>


//         );
//     }
// }
// export default Dashboard;


import React ,{Component}from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme,withStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import search from '../assets/search.png';
import clear from '../assets/clear.png';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import TakeaNotes from './TakeaNotes'
import Edit from './EditLabel'




const drawerWidth = 240;

const useStyles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  drawerHeader1: {
    display: 'flex',
    marginTop : '10px',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

 class Dashboard extends Component {
     
    constructor(props) {
        super(props);
        this.state = {
            open : false,
             setOpen : false,
             choice:""
         
        };
      }
      handleDrawerOpen = () => {
        this.setState({setOpen : true,open : true});
      };
    
      handleDrawerClose = () => {
        this.setState({setOpen : false,open:false});
      };

  

  Editlabel=(event,text)=>{
    event.preventDefault();
    if(text == 'Edit labels'){
        // <Edit/>
        this.setState({choice : 'Editlabels'})
    }
  }

  getcomponents=()=>{

      if(this.state.choice == 'Editlabels'){
          return <Edit/>
      }
      else if(this.state.choice == 'Notes'){
        return <TakeaNotes/>
      }
  }
render(){
    const {classes} = this.props;
  return (
      <div>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
       
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={this.handleDrawerOpen}
            edge="start"
            // className={clsx(classes.menuButton, this.state.open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
           FunDoo
          </Typography>
          <div style={
                               { height: '60px',
                                width: '700px',
                                marginLeft: '200px',
                                backgroundColor:'#ffffff',
                                flexDirection: 'row',
                                display: 'flex',
                                alignItems: 'center',
                                borderRadius: '3px',
                                justifyContent: 'center'
                            }
 
                                }>
                              <Paper>
                                  <div style={{ display : 'flex',justifyContent : 'center',height : '60px',width : '700px',alignItems:'center'}}>
                                  <img src={search} />
                                <TextField
                                    // label="Search"
                                    hintText="Password"
                                    // floatingLabelText="Password"
                                    id="inputFielddash"
                                    InputProps={{ disableUnderline: true }}
                                    style={{ backgroundColor: '#ff00',
                                     border: 'none', disableUnderline: true,width:'600px' }}
                                     onChange={this.queryfunction}
                                />
                                <img src={clear} id="imgdash" />
                                  </div>
                                
                             </Paper>
                    </div>
        </Toolbar>
      </AppBar>
  
      </div>
      <div>
          <TakeaNotes/>
      </div>
    </div>
  );
}
  }

  export default withStyles(useStyles)(Dashboard);