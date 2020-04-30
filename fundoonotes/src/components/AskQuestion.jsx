import React, { Component } from "react";
import { Editor } from 'react-draft-wysiwyg';
import {editorState} from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {getNotesDetail,questionAndAnswerNotes,like,reply,rate} from '../services/notesService'
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import List from '@material-ui/core/List';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import reply_black from '../assets/reply_black.png';
import thumb_up from '../assets/thumb_up.png';
import StarRatingComponent from 'react-star-rating-component';


class AskQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
        anchorEl :false,
        id: props.questionId,
        question :'',
        editorState : '',
        data : [],
        profileImage:'',
        email:"",
        firstName :"",
        showQust : null,
        message : '',
        questionAndAnswerNotes :[],
        like:'',
        count : 0,
        showReply : false,
        qustId:'',
        rating: 0

    };
  }
  componentDidMount=()=>{
        const profileImage = localStorage.getItem("userProfile");
        const email =  localStorage.getItem("email");
        const firstName = localStorage.getItem("firstName");
        this.setState({email : email,firstName : firstName,profileImageFromRes : profileImage })
    getNotesDetail(this.state.id).then(response => {
      console.log("qust&ans",response.data.data.data[0].questionAndAnswerNotes);
     if (response.status === 200) {
        //  this.props.sendtrash(true);
        this.setState({ data : response.data.data.data[0],
          questionAndAnswerNotes : response.data.data.data[0].questionAndAnswerNotes})
        if(this.state.data.questionAndAnswerNotes.length > 0){
          this.setState({ showQust : false})
        }
        else{
          this.setState({ showQust : true})
        }
      //   if(response.data.data.data[0].questionAndAnswerNotes[0].like.length > 0){
      //   if(response.data.data.data[0].questionAndAnswerNotes[0].like[0].like === true){
      //     this.setState({ count : 1 , likeArray : true})
      //   }
      //   else{
      //     this.setState({ count : 0 , likeArray : false })
      //   }
      // }

     } else {
         this.setState({  snackbarmsg: "Netwrork is slow", snackbaropen: true });
     }
  });
  }
  onStarClick=async(id,nextValue, prevValue, name)=> {
   await this.setState({rating: nextValue});
    console.log(id)
    let data={
      rate : this.state.rating
    }
    rate(data,id).then(response => {
      console.log(response);
     if (response.status === 200) {
        this.componentDidMount();
        //  this.props.sendtrash(true);
     } else {
         this.setState({  snackbarmsg: "Netwrork is slow", snackbaropen: true });
     }
  });
    
  }
  close=()=>{
    this.props.close(true);
  }
  onchangeText=(event)=>{
    this.setState({ question : event.target.value})
  }
  onEditorStateChange = (editorState) => {
    this.setState({editorState})
  }
  AskQuestion=()=>{
    let data={
      message : "<p>"+this.state.editorState.getCurrentContent().getPlainText('\u0001')+"<p>",
      notesId : this.state.id
    }
    console.log(data)
    questionAndAnswerNotes(data).then(response => {
      console.log(response.data.data.details.message);
     if (response.status === 200) {
       this.setState({ showQust : false,message : response.data.data.details.message })
        this.componentDidMount();
        //  this.props.sendtrash(true);
     } else {
         this.setState({  snackbarmsg: "Netwrork is slow", snackbaropen: true });
     }
  });

  }
  likeButton=async(id)=>{
   await this.setState({like : true})
   let data ={
     like:this.state.like
   }
   console.log(id,data)

    const form_data = new FormData();
      form_data.append("like",this.state.like );
    like(data,id).then(response => {
      console.log(response);
     if (response.status === 200) {
       this.setState({ count : response.data.data.details.count})
        this.componentDidMount();
        //  this.props.sendtrash(true);
     } else {
         this.setState({  snackbarmsg: "Netwrork is slow", snackbaropen: true });
     }
  });
  }
  dislikeButton=async(id)=>{
    await this.setState({like : false})
    let data ={
      like:this.state.like
    }
    console.log(id,data)
     like(data,id).then(response => {
       console.log(response);
      if (response.status === 200) {
        this.setState({ count : response.data.data.details.count})
         this.componentDidMount();
         //  this.props.sendtrash(true);
      } else {
          this.setState({  snackbarmsg: "Netwrork is slow", snackbaropen: true });
      }
   });
  }
  replyButton=(id)=>{
    this.setState({ showReply : true,qustId : id})
   
  }
  replyBack=()=>{
    let data={
      message : "<p>"+this.state.editorState.getCurrentContent().getPlainText('\u0001')+"<p>"

    }
    console.log(data)
    reply(data,this.state.qustId).then(response => {
      console.log(response);
     if (response.status === 200) {
       this.setState({ showReply : false,message : response.data.data.details.message })
        this.componentDidMount();
        //  this.props.sendtrash(true);
     } else {
         this.setState({  snackbarmsg: "Netwrork is slow", snackbaropen: true });
     }
  });
  }
 render(){
     return(
       <div>
         <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
          <div style={{width : "80%"}}>
           <List>
                <Typography>{this.state.data.title}</Typography>
                <Typography>{this.state.data.description}</Typography>
          </List>
         </div> 
         </div>
         {this.state.showQust ? null : 
         <div>
         
         <div style={{display:"flex",justifyContent:"center",alignItems:"center",paddingTop : "10px"}}>
           <div style={{width : "80%"}}>
           <Divider/>
           <List>
                <Typography>Question Asked</Typography>
                <Typography>{this.state.message}</Typography>
          </List>
          <Divider/>
           </div>
           </div>
           
           </div>
         }

         <div style={{display:'flex',justifyContent : 'flex-end',cursor :'pointer'}} onClick={this.close}>
           Close
         </div>
         {this.state.showQust ?
         <div>
                 <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>

                 <div style={{width : "80%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                     <Editor
                         placeholder="Enter the Question"
                         editorState={this.state.editorState}
                         toolbarClassName="toolbarClassName"
                         wrapperClassName="wrapperClassName"
                         editorClassName="editorClassName"
                         onEditorStateChange={this.onEditorStateChange}
                         />
                       
                 
                </div> 
             
                </div>
                <div style={{width:"90%",display:'flex',justifyContent : 'flex-end',cursor :'pointer'}} onClick={this.AskQuestion}>
                    Ask
                  </div>
                  </div>
                  :
                  this.state.showReply ?
                  <div>
                 <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>

                 <div style={{width : "80%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                     <Editor
                         placeholder="Enter the Reply"
                         editorState={this.state.editorState}
                         toolbarClassName="toolbarClassName"
                         wrapperClassName="wrapperClassName"
                         editorClassName="editorClassName"
                         onEditorStateChange={this.onEditorStateChange}
                         />
                       
                 
                </div> 
             
                </div>
                <div style={{width:"90%",display:'flex',justifyContent : 'flex-end',cursor :'pointer'}}
                 onClick={this.replyBack}>
                    Reply
                  </div>
                  </div>:
            <div>
         
           {this.state.questionAndAnswerNotes.map((qustans,index)=>(
            <div style={{display:"flex",justifyContent:"center"}}>
              <div style={{display : 'flex',flexDirection : 'row',padding : '10px',width:"80%"}} >
              <label for="file-input">
              <img 
              src={this.state.profileImageFromRes  == '' ? null : "http://fundoonotes.incubation.bridgelabz.com/"+this.state.profileImageFromRes } style={{width : '50px',height : '50px',backgroundColor : 'grey',borderRadius : '50px'}}/>
              </label>
             <input type="file" onChange={this.onChange} id="file-input" style={{ display: 'none'}}/>
                      
                       <div style={{display : 'flex',flexDirection : 'column',justifyContent : 'center',marginLeft : '5px'}}>
                       <Typography>{this.state.data.user.firstName} {this.state.data.user.lastName}</Typography>
                       <Typography>{qustans.message}</Typography>

                       <Typography></Typography>

                       </div>
                       <div style={{display : 'flex',flexDirection : 'row',justifyContent : 'center',marginLeft : '5px'}}>
                       <div><img src={reply_black} onClick={()=>this.replyButton(this.state.questionAndAnswerNotes[index].id)}
                 style={{width : '20px',height : '20px'}}/></div>
                 { qustans.like.length > 0 && qustans.like[0].like === true ? 
                 <div>
                 <div><img src={thumb_up} onClick={()=>this.dislikeButton(this.state.questionAndAnswerNotes[index].id)}
                 style={{width : '20px',height : '20px',backgroundColor : "blue"}}/> <Typography>1 Likes</Typography></div>
                 
                 </div>
                  :
                  <div>
                 <div><img src={thumb_up} onClick={()=>this.likeButton(this.state.questionAndAnswerNotes[index].id)}
                 style={{width : '20px',height : '20px'}}/> <Typography>0 Likes</Typography></div>
                </div>}
                {qustans.rate.length > 0 && qustans.rate[0].rate > 0 ? 
                <div className='ratingMain'>
                <h5>Rating : </h5>
                <StarRatingComponent 
                  name="rate1" 
                  starCount={5}
                  value={qustans.rate[0].rate}
                  onStarClick={()=>this.onStarClick(this.state.questionAndAnswerNotes[index].id)}
                />
                <h5> {this.state.rating}</h5>
              </div>
               : 
               <div className='ratingMain'>
                    <h5>Rating : </h5>
                    <StarRatingComponent 
                      name="rate1" 
                      starCount={5}
                      value={this.state.rating}
                      onStarClick={()=>this.onStarClick(this.state.questionAndAnswerNotes[index].id)}
                    />
                    <h5> {this.state.rating}</h5>
                  </div> }
                

                       </div>
                       </div>
                       </div>   
           ))}
       </div>
        
                      
            
 }
       </div>

     )}}

     export default AskQuestion;