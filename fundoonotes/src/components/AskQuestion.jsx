import React, { Component } from "react";
import { Editor } from 'react-draft-wysiwyg';
import {editorState} from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';




class AskQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
        anchorEl :false,

    };
  }
 
 render(){
     return(
        <div>
            <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={this.onEditorStateChange}
                />
        
       </div> 
     )}}

     export default AskQuestion;