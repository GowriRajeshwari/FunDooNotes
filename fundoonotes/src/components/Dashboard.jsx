import React ,{Component}from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme,withStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import search from '../assets/search.png';
import search_black from '../assets/search_black.png';
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
import Archived from './Archived'
import refresh from '../assets/refresh.png';
import box from '../assets/box.png';
import keepBulb from "../assets/keepBulb.png";
import list from "../assets/list.png";
import shopping_cart from "../assets/shopping_cart.png";
import PersonIcon from '@material-ui/icons/Person';
import Avatar from '@material-ui/core/Avatar';
import lightbulb_black from "../assets/lightbulb_black.png";
import reminder from '../assets/reminder.svg'
import delete_black from '../assets/delete_black.png'
import download from '../assets/download.png'

const drawerWidth = 300;

const useStyles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    height : '70px',
    backgroundColor:'white',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    // width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    
  },
  menuButton: {
   
    marginRight: theme.spacing(1),
  },
  hide: {
    display: 'none',
  },
  drawer: {
   
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    border: 'none',
    marginTop:'70px',
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
  funnDooName:{
    color : 'black',
    marginRight : theme.spacing(19)
  },
  bulbImg:{
    display : 'flex',
    justifyContent : 'center',
    marginRight : theme.spacing(1)
  },
  searchDiv:{
      height: '50px',
     width: '800px',
     maxWidth :'720px',
     // marginLeft: '200px',
     backgroundColor:'#ffffff',
     flexDirection: 'row',
     display: 'flex',
     alignItems: 'center',
     borderRadius: '3px',
     justifyContent: 'center',
     backgroundColor :'#f1f3f4',
     borderRadius : '8px',
     position: 'relative'
  }
});

 class Dashboard extends Component {
     
    constructor(props) {
        super(props);
        this.state = {
            open : false,
             setOpen : false,
             choice:"Notes"
         
        };
      }
      handleDrawerOpen = () => {
        if(this.state.open == false){
        this.setState({setOpen : true,open : true});
        }
        else{
          this.setState({setOpen : false,open : false});
        }
      };
    
      handleDrawerClose = () => {
        this.setState({setOpen : false,open:false});
      };

  

    choice=(event,text)=>{
    event.preventDefault();
    console.log(text)
    if(text == 'Edit labels'){
        this.setState({choice : 'Editlabels'})
    }
    else if(text == 'Notes'){
      this.setState({choice : 'Notes'})
    }
    else if(text == 'Archive'){
      this.setState({choice : 'Archive'})
    }
  }

  getcomponents=()=>{

      if(this.state.choice == 'Editlabels'){
          return <Edit/>
      }
      else if(this.state.choice == 'Notes'){
        return <TakeaNotes/>
      }
      else if(this.state.choice == 'Archive'){
        return <Archived/>
      }
  }
render(){
    const {classes} = this.props;
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: this.state.open,
        })}
      >
        <Toolbar>
        <div style={{ display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',justifyContent:'space-around',width :'100%'}}>
          <div style={{ display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
          <IconButton
            size="medium"
            color="black"
            aria-label="open drawer"
            onClick={this.handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, this.state.open)}
          >
            <MenuIcon style={{ width:  '30px',
              height : '30px',}} />
          </IconButton>
          <div className={classes.bulbImg}  >
             <img src={keepBulb} style={{ height : '45px',width : '45px'}} />
          </div>

          <Typography variant="h6" noWrap className={classes.funnDooName} >
           FunDoo
          </Typography>

          </div>
          <div className={classes.searchDiv}>
                              {/* <Paper> */}
                                  <div style={{ padding : '5px',display : 'flex',justifyContent : 'center',height : '46px',maxWidth : '720px',alignItems:'center'}}>
                                  <img src={search_black} style={{ width : '25px',height : '25px',marginRight : '6px'}} />
                                <input
                                   placeholder="Search"
                                    InputProps={{ disableUnderline: true }}
                                    style={{ backgroundColor: '#ff00',height : '46px',outline:'none',fontSize:'18px',
                                     border: 'none', disableUnderline: true,width:'600px' }}
                                     onChange={this.queryfunction}
                                />
                                <img src={clear} id="imgdash" />
                                  </div>
                                
                             {/* </Paper> */}
                    </div>
                    <div className="icondash">
                    <IconButton
                          size="medium"
                          color="black"
                          aria-label="open drawer"
                          onClick={this.handleDrawerOpen}
                          edge="start"
                          className={clsx(classes.menuButton, this.state.open)}
                        >
                             <img src={shopping_cart} id="imgdash" />
                         </IconButton>
                         <IconButton
                          size="medium"
                          color="black"
                          aria-label="open drawer"
                          onClick={this.handleDrawerOpen}
                          edge="start"
                          className={clsx(classes.menuButton, this.state.open)}
                        >
                             <img src={list} id="imgdash" />
                         </IconButton>
                         <IconButton
                          size="medium"
                          color="black"
                          aria-label="open drawer"
                          onClick={this.handleDrawerOpen}
                          edge="start"
                          className={clsx(classes.menuButton, this.state.open)}
                        >
                          <Avatar>
                          
                            </Avatar>
                        </IconButton>

                     </div>
                    
                     </div>   
        </Toolbar>

      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={this.state.open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Divider />
        <List>
          {['Notes', 'Remainder'].map((text, index) => (
            <ListItem button key={text} onClick={e => this.choice(e,text)} >
              <ListItemIcon>{index % 2 === 0 ? <img src={lightbulb_black} id="imgdash"/> :
               <img src={reminder} id="imgdash"/>}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <div style={{ padding :'15px'}}>LABELS</div>
        <List>
          {['Edit labels'].map((text, index) => (
            <ListItem button key={text} onClick={e => this.choice(e,text)}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider/>
        
        <List >
          {['Archive','Bin'].map((text, index) => (
            <ListItem button key={text} onClick={e => this.choice(e,text)}>
              <ListItemIcon>{index % 2 === 0 ?<img src={download} id="imgdash"/> :<img src={delete_black} id="imgdash"/>}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: this.state.open,
        })}
      >
        <div className={classes.drawerHeader} />
       
        {this.getcomponents()}
        {/* {this.state.choice == 'Notes' ? <TakeaNotes/> : 
        this.state.choice == 'Editlabels' ? <Edit query='true'/> : null}
      */}
        
      </main>
    </div>
  );
}
  }

  export default withStyles(useStyles)(Dashboard);