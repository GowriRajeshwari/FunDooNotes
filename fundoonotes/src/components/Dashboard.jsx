import React ,{Component}from 'react';
import clsx from 'clsx';
import axios, { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles, useTheme,withStyles } from '@material-ui/core/styles';
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
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import TakeaNotes from './TakeaNotes'
import Edit from './EditLabel'
import Trash from './Trash'
import Archived from './Archived'
import LabelIcon from '@material-ui/icons/Label';
import keepBulb from "../assets/keepBulb.png";
import list from "../assets/list.png";
import shopping_cart from "../assets/shopping_cart.png";
import Avatar from '@material-ui/core/Avatar';
import lightbulb_black from "../assets/lightbulb_black.png";
import reminder from '../assets/reminder.svg'
import delete_black from '../assets/delete_black.png'
import download from '../assets/download.png'
import label from '../assets/label.png'
import listview from '../assets/listview.png'
import Reminder from './Reminder'
import Collaborator from './Collaborator'
import Logout from './Logout'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Popover from '@material-ui/core/Popover';
import Cart from './Cart'
import AppsIcon from '@material-ui/icons/Apps';
import AddIcon from '@material-ui/icons/Add';
import { getNoteLabelList,addLabels,logout,fileUpload,getNotesListByLabel } from '../services/notesService'


const drawerWidth = 300;

const useStyles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    // position : 'fixed',
    height : '70px',
    backgroundColor:'white',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ['@media (max-width:780px)']:{
      transition :"0.5s"
    }
  },
  appBarShift: {
    // width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    
    ['@media (max-width:780px)']:{
      transition : "transform "
    }
    
  },
  menuButton: {
   
    // marginRight: theme.spacing(1),
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
    height : "90%"
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
             choice:"Notes",
             query:'',
             labelData :[],
             gridView : false,
             profile:false,
             anchorEl :false,
             open1:false,
             email : '',
             firstName : '',
             file : '',
             open12 : true,
             imageFromUrl : '',
             profileImage :'',
             profileImageFromRes : '',
             

        };
      }
      componentDidMount=()=>{
        const profileImage = localStorage.getItem("userProfile");
        const email =  localStorage.getItem("email");
        const firstName = localStorage.getItem("firstName");
        this.setState({email : email,firstName : firstName,profileImageFromRes : profileImage })
        getNoteLabelList().then(response => {
          // console.log(response.data.data.details);
         if (response.status === 200) {
            
            this.setState({labelData : response.data.data.details});
           
          
         } else {
             this.setState({  snackbarmsg: "Netwrork is slow", snackbaropen: true });
         }
      });
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
    else if(text == 'Trash'){
      this.setState({choice : 'Trash'})
    }
    else if(text == 'Reminder'){
      this.setState({choice : 'Reminder'})
    }
    else if(text == 'shopping_cart'){
      this.setState({ choice :'shopping_cart'})
    }
    else{
      this.setState({choice : text.label})
    }
  }
  labeldata=()=>{
    this.componentDidMount();
    this.setState({choice : ''})
  }
  getcomponents=()=>{
      console.log(this.state.choice)
      if(this.state.choice == 'Editlabels'){
        return <Edit dialogBoxOpen="true" labeldata={this.labeldata} />
        // this.props.dialogbox();

      }
      else if(this.state.choice == 'Notes'){
        return <TakeaNotes labelNoteShow="false" query={this.state.query} 
        gridView={this.state.gridView} gridfunction={this.gridview.bind(this)}/>
      }
      else if(this.state.choice == 'Archive'){
        return <Archived query={this.state.query}/>
      }
      else if(this.state.choice == 'Trash'){
        return <Trash query={this.state.query}/>
      }
      else if(this.state.choice == 'Reminder'){
        return <Reminder query={this.state.query}/>
      }
      else if(this.state.choice == 'shopping_cart'){
        return <Cart/>
      }
      else{
      return <TakeaNotes labelNoteShow="true" query={this.state.query} label={this.state.choice}
      gridView={this.state.gridView} gridfunction={this.gridview.bind(this)}/>

      }
  }
  queryfunction=async(event)=>{
    await this.setState({query : event.target.value});
   //  <Tableadmin query={this.state.query}/>
 }
 gridview=async()=>{
  await this.setState({gridView : !this.state.gridView})
  // console.log(this.state.gridView)
  // alert(this.state.gridView)
 }
 profile=()=>{
      this.setState({profile : !this.state.profile})
 }
 handleClick = (event) => {
  this.setState({
    anchorEl: event.currentTarget,
    open1: !this.state.open1
});
}
logout=()=>{
  let data={}
  logout(data).then(response => {
      // console.log(response.data.data.details[0]);
     if (response.status === 204) {
      localStorage.setItem("email","");
      localStorage.setItem("firstName","")
      this.props.history.push({
          pathname: "/",
      });
     } else {
     }
  });
}
profileImagePick=()=>{}

onFormSubmit=(e)=>{
  console.log("onformatsubmit")
  e.preventDefault() // Stop form submit
  let form_data = new FormData()
  form_data.append('file',this.state.file)
  fileUpload(form_data).then(response => {
    this.setState({profileImageFromRes:response.data.status.imageUrl,open12 : true,fileshow :false,profileImage:'',file:''})
    localStorage.setItem('userProfile',response.data.status.imageUrl)
  })

}
onChange=async(e)=> {
  console.log(e.target.files[0].name,this.state.open12)
  // await this.setState({open12:true})

  await this.setState({file:e.target.files[0],
    fileshow : true,profileImage : URL.createObjectURL(e.target.files[0]),open12:true})
}

handleClick12=(event)=>{
  this.setState({
    // anchorEl: event.currentTarget,
    open12: !this.state.open12,file:''
});
// this.setState({fileshow :false,profileImage:'',file:''})

}
shopping_cart=()=>{

}
render(){
    const {classes} = this.props;
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        // position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: this.state.open,
        })}
      >
        <Toolbar>
        <div className="ToolbarContainer1">
          <div className="ToolbarContainer2">
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
          <div className={classes.bulbImg} className="bulbicon"  >
             <img src={keepBulb} style={{ height : '45px',width : '45px'}} />
          </div>

          <Typography variant="h6" noWrap className="funnDooName" >
           FunDoo
          </Typography>

          </div>
          <div className="searchDiv">
                              {/* <Paper> */}
                                  <div className="searchdiv1">
                                  <img src={search_black} style={{ width : '25px',height : '25px',marginRight : '6px'}} />
                                <input
                                   placeholder="Search"
                                    InputProps={{ disableUnderline: true }}
                                    className="inputsearch"
                                    style={{disableUnderline : true,outline:'none',border: 'none'}}
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
                          onClick={(event)=>this.choice(event,"shopping_cart")}
                          edge="start"
                          className="bulbicon"
                        >
                             <ShoppingCartIcon  style={{color:"black",fontSize:"30px"}}/>
                         </IconButton>
                         <IconButton
                          size="medium"
                          color="black"
                          aria-label="open drawer"
                          onClick={this.gridview}
                          edge="start"
                          className="bulbicon"
                        >
                             {this.state.gridView ? <img src={list} id="imgdash" /> :  <AppsIcon style={{color:"black",fontSize:"30px"}}/>}
                         </IconButton>

                       
                         <IconButton
                          size="medium"
                          color="black"
                          aria-label="open drawer"
                          onClick={this.handleClick}
                          edge="start"
                          className="bulbicon"
                        >
                          <Avatar>
               <img src={this.state.profileImageFromRes  == '' ? null : "http://fundoonotes.incubation.bridgelabz.com/"+this.state.profileImageFromRes } style={{width : '50px',height : '50px',backgroundColor : 'grey',borderRadius : '50px'}}/>
                          
                            </Avatar>
                        </IconButton>
        <Popover 
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        open={this.state.open1}
        anchorEl={this.state.anchorEl}
        onClose={this.handleClick}
        style={{ cursor: 'pointer'}}>
           
           <div style={{width : '300px',height:'120px'}}>
               <form style={{display : 'flex',flexDirection : 'row',padding : '10px'}} >
               <label for="file-input">
               <img 
               src={this.state.profileImageFromRes  == '' ? null : "http://fundoonotes.incubation.bridgelabz.com/"+this.state.profileImageFromRes } style={{width : '50px',height : '50px',backgroundColor : 'grey',borderRadius : '50px'}}/>
               </label>
              <input type="file" onChange={this.onChange} id="file-input" style={{ display: 'none'}}/>
                       
                        <div style={{display : 'flex',flexDirection : 'column',justifyContent : 'center',marginLeft : '5px'}}>
                        <Typography>{this.state.email}</Typography>
                        <Typography>{this.state.firstName}</Typography>

                        </div>
                        {this.state.fileshow ? 
                        <div style={{width : '250px',height : '250px',display:'none'}}>
                       <Dialog
                       open={this.state.open12}
                       onClose={this.handleClick12}
                       >
                        <div style={{width : '250px',height : '200px',display:'flex',flexDirection :'column',justifyContent:'center',alignItems:'center'}}>

                      <img src={this.state.profileImage} style={{width : '150px',height : '150px',borderRadius : '50px',justifyContent:'center'}}/>
                        <div style={{paddingTop : '10px'}}>
                        <button type="submit"  onClick={this.onFormSubmit}>Upload</button>
                        </div></div></Dialog></div> : null }
                        
                        </form>   

                        <Divider/>
                        <div onClick={this.logout}
                        style={{display : 'flex',justifyContent : 'flex-end',padding : '10px',border : '1px'}}>
                            LOGOUT
                        </div>
                        
           </div>
    
        </Popover>

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
          {['Notes', 'Reminder'].map((text, index) => (
            <ListItem button key={text} onClick={e => this.choice(e,text)} >
              <ListItemIcon>{index % 2 === 0 ? <div><img src={lightbulb_black} id="imgdash1"/></div> :
              <div>
               <img src={reminder} id="imgdash1"/> </div>}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <div style={{ padding :'15px'}}>LABELS</div>
        <List>
          {this.state.labelData.map((text, index) => (
            <ListItem button key={text} onClick={e => this.choice(e,text)}>
              <ListItemIcon>{<LabelIcon style={{fontSize:"medium"}}/>}</ListItemIcon>
              <ListItemText primary={text.label} />
            </ListItem>
          ))}
        </List>
        <List>
          {['Edit labels'].map((text, index) => (
            <ListItem button key={text} onClick={e => this.choice(e,text)}>
              <ListItemIcon>{index % 2 === 0 ? <AddIcon style={{color:"black"}}/> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider/>
        
        <List >
          {['Archive','Trash'].map((text, index) => (
            <ListItem button key={text} onClick={e => this.choice(e,text)}>
              <ListItemIcon>{index % 2 === 0 ? <img src={download} id="imgdash1"/> :
              <img src={delete_black} id="imgdash1"/>}</ListItemIcon>
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
       
        
      </main>
    </div>
  );
}
  }

  export default withStyles(useStyles)(Dashboard);