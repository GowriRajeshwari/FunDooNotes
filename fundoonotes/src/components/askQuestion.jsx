import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  getNotesDetail,
  questionAndAnswerNotes,
  like,
  reply,
  rate,
} from "../services/notesService";
import {
  Divider,
  List,
  Typography,
  TextField,
  Dialog,
} from "@material-ui/core";
import reply_black from "../assets/reply_black.png";
import thumb_up from "../assets/thumb_up.png";
import thumb_down from "../assets/thumb_down.png";
import StarRatingComponent from "react-star-rating-component";
import Rating from "./rating";

class AskQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: false,
      id: props.questionId,
      question: "",
      editorState: "",
      data: [],
      profileImage: "",
      email: "",
      firstName: "",
      showQust: null,
      message: "",
      questionAndAnswerNotes: [],
      like: "",
      count: 0,
      showReply: false,
      qustId: "",
      rating: 0,
      msg: "",
      countratevalue: 0,
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
    getNotesDetail(this.state.id).then((response) => {
      if (response.status === 200) {
        this.setState({
          data: response.data.data.data[0],
          questionAndAnswerNotes:
            response.data.data.data[0].questionAndAnswerNotes,
        });
        if (this.state.data.questionAndAnswerNotes.length > 0) {
          this.setState({
            showQust: false,
            msg: response.data.data.data[0].questionAndAnswerNotes[0].message.replace(
              /<[^>]*>/g,
              ""
            ),
          });
        } else {
          this.setState({ showQust: true });
        }
      } else {
        this.setState({ snackbarmsg: "Netwrork is slow", snackbaropen: true });
      }
    });
  };
  onStarClick(nextValue, id) {
    let data = {
      rate: nextValue,
    };
    rate(data, id).then((response) => {
      if (response.status === 200) {
        this.setState({
          showQust: false,
          message: response.data.data.details.message,
        });
        this.componentDidMount();
      } else {
        this.setState({ snackbarmsg: "Netwrork is slow", snackbaropen: true });
      }
    });
  }
  close = () => {
    this.props.close(true);
  };
  onchangeText = (event) => {
    this.setState({ question: event.target.value });
  };
  onEditorStateChange = (editorState) => {
    this.setState({ editorState });
  };
  AskQuestion = () => {
    let data = {
      message:
        "<p>" +
        this.state.editorState.getCurrentContent().getPlainText("\u0001") +
        "</p>",
      notesId: this.state.id,
    };
    questionAndAnswerNotes(data).then((response) => {
      if (response.status === 200) {
        this.setState({
          showQust: false,
          message: response.data.data.details.message,
          editorState: "",
        });
        this.componentDidMount();
      } else {
        this.setState({ snackbarmsg: "Netwrork is slow", snackbaropen: true });
      }
    });
  };
  likeButton = (id) => {
    this.setState({ like: true });
    let data = {
      like: true,
    };
    const form_data = new FormData();
    form_data.append("like", this.state.like);
    like(data, id).then((response) => {
      if (response.status === 200) {
        this.setState({ count: response.data.data.details.count });
        this.componentDidMount();
      } else {
        this.setState({ snackbarmsg: "Netwrork is slow", snackbaropen: true });
      }
    });
  };
  dislikeButton = (id) => {
    this.setState({ like: false });
    let data = {
      like: false,
    };
    like(data, id).then((response) => {
      if (response.status === 200) {
        this.setState({ count: response.data.data.details.count });
        this.componentDidMount();
      } else {
        this.setState({ snackbarmsg: "Netwrork is slow", snackbaropen: true });
      }
    });
  };
  replyButton = (id) => {
    this.setState({ showReply: true, qustId: id });
  };
  replyBack = () => {
    let data = {
      message:
        "<p>" +
        this.state.editorState.getCurrentContent().getPlainText("\u0001") +
        "</p>",
    };
    reply(data, this.state.qustId).then((response) => {
      if (response.status === 200) {
        this.setState({
          showReply: false,
          message: response.data.data.details.message,
          editorState: "",
        });
        this.componentDidMount();
      } else {
        this.setState({ snackbarmsg: "Netwrork is slow", snackbaropen: true });
      }
    });
  };
  message = (message) => {
    var content = message.replace(/<[^>]*>/g, "");
    return content;
  };
  render() {
    return (
      <div>
        <div className="containerQtn">
          <div className="widthQtn">
            <List>
              <Typography>{this.state.data.title}</Typography>
              <Typography>{this.state.data.description}</Typography>
            </List>
          </div>
        </div>
        {this.state.showQust ? null : (
          <div>
            <div className="qutnDiv">
              <div className="widthQtn">
                <Divider />
                <List>
                  <Typography>Question Asked</Typography>
                  <Typography>{this.state.msg}</Typography>
                </List>
                <Divider />
              </div>
            </div>
          </div>
        )}

        <div className="closeBtn" onClick={this.close}>
          Close
        </div>
        {this.state.showQust ? (
          <div>
            <div className="containerQtn">
              <div className="questionPart">
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
            <div className="askBtn" onClick={this.AskQuestion}>
              Ask
            </div>
          </div>
        ) : this.state.showReply ? (
          <div>
            <div className="containerQtn">
              <div className="questionPart">
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
            <div className="askBtn" onClick={this.replyBack}>
              Reply
            </div>
          </div>
        ) : (
          <div>
            {this.state.questionAndAnswerNotes.map((qustans, index) => {
              if (qustans.isApproved === true)
                return (
                  <div className="centerStyleQtn">
                    <div className="qustContainer">
                      <label for="file-input" className="containerQtn">
                        <img
                          src={
                            this.state.profileImageFromRes == ""
                              ? null
                              : "http://fundoonotes.incubation.bridgelabz.com/" +
                                this.state.profileImageFromRes
                          }
                          className="imgStyle1Qtn"
                        />
                      </label>
                      <input
                        type="file"
                        onChange={this.onChange}
                        id="file-input"
                        className="disaplyNone"
                      />

                      <div className="messageDiv">
                        <Typography>
                          {this.state.data.user.firstName}{" "}
                          {this.state.data.user.lastName}
                        </Typography>
                        <Typography>{this.message(qustans.message)}</Typography>

                        <Typography></Typography>
                      </div>
                      <div className="IconQtn">
                        <div className="containerQtn">
                          <img
                            src={reply_black}
                            onClick={() =>
                              this.replyButton(
                                this.state.questionAndAnswerNotes[index].id
                              )
                            }
                            className="ImgStyleQtn"
                          />
                        </div>

                        {qustans.like.length > 0 &&
                        qustans.like[0].like === true ? (
                          <div className="thumbDiv">
                            <div className="containerQtn">
                              <img
                                src={thumb_up}
                                onClick={() =>
                                  this.dislikeButton(
                                    this.state.questionAndAnswerNotes[index].id
                                  )
                                }
                                className="ImgStyleQtn"
                              />{" "}
                            </div>
                            <div className="likeDiv">
                              <div>1 Likes</div>
                            </div>
                          </div>
                        ) : (
                          <div className="thumbDiv">
                            <div className="containerQtn">
                              <img
                                src={thumb_down}
                                onClick={() =>
                                  this.likeButton(
                                    this.state.questionAndAnswerNotes[index].id
                                  )
                                }
                                className="ImgStyleQtn"
                              />{" "}
                            </div>
                            <div className="likeDiv">
                              <div>0 Likes</div>
                            </div>
                          </div>
                        )}

                        <div className="padding">
                          {qustans.rate.length > 0 &&
                          qustans.rate[0].rate > 0 ? (
                            <Rating
                              rating={qustans.rate[0].rate}
                              rate={(rating) =>
                                this.onStarClick(
                                  rating,
                                  this.state.questionAndAnswerNotes[index].id
                                )
                              }
                            />
                          ) : (
                            <Rating
                              rating={this.state.countratevalue}
                              rate={(rating) =>
                                this.onStarClick(
                                  rating,
                                  this.state.questionAndAnswerNotes[index].id
                                )
                              }
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default AskQuestion;
