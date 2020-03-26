import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import sidenavicon from '../assets/sidenavicon.png';
import search from '../assets/search.png';
import clear from '../assets/clear.png';
import refresh from '../assets/refresh.png';
import box from '../assets/box.png';





class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            helperText: "",
            error: false,
            username: "",
            userdata: [],
            show: false,
            login: "Sign in",
            next: false,
            password: '',
            helperTextpassowrd: "",
            showtakeNotes: false

        };
        this.Takeanote = this.Takeanote.bind(this);

    }
    //take noe
    Takeanote(event) {
        event.preventDefault();
        this.setState({ showtakeNotes: true })
    }
    //setState for password field
    onChangePassword(event) {
        if (event.target.value.length > 7) {
            this.setState({
                helperTextpassowrd: "",
                error: false,
                password: event.target.value
            });
        } else {
            this.setState({
                helperTextpassowrd: "Password should be 7 letters",
                error: true,
                password: event.target.value
            });
        }
    }

    render() {
        return (

            <div className="dashContainer">

                <Paper className="dashsearch">

                    <div>
                        <Button onClick={e => this.arrowButton(e)}>
                            <img src={sidenavicon} id="imgdash" />
                        </Button>
                    </div>
                    <div>
                        <div className="textremainderDash">Remainder</div>
                    </div>


                    <div className="searcheledash">

                        <Paper>
                            <img src={search} id="imgdash" />
                            <TextField
                                hintText="Password"
                                floatingLabelText="Password"
                                id="inputFielddash"
                                //    variant="outlined"
                                //    label="Search"
                                InputProps={{ disableUnderline: true }}
                                style={{ width: '380px', backgroundColor: '#ff00', border: 'none', disableUnderline: true }}
                            //    helperText={this.state.helperTextpassowrd}
                            //    onChange={this.onChangePassword.bind(this)}
                            />
                            <img src={clear} id="imgdash" />
                        </Paper>
                    </div>
                    <div className="icondash">
                        <div>
                            <img src={refresh} id="imgdash" />
                        </div>
                        <div className="columimg">
                            <img src={box} id="imgdash" />
                        </div>
                        <div>
                            <img src={search} id="imgdash" />
                        </div>

                    </div>
                    <div className="icondashlast">

                        <div>
                            <img src={search} id="imgdash" />
                        </div>
                        <div>
                            <img src={search} id="imgdash" />
                        </div>
                    </div>

                </Paper>

                <div className="dash2cont">
                    {this.state.showtakeNotes ?
                        <Paper >
                            <div className="papar2dash">
                                <TextField
                                    required id="standard-required"
                                    // label="Required" defaultValue="Hello World"
                                    // label="Take a note"
                                    InputProps={{ disableUnderline: true }}
                                    style={{ width: '380px', backgroundColor: '#ff00', border: 'none', }}
                                    //    helperText={this.state.helperTextpassowrd}
                                    onChange={this.onChangePassword.bind(this)}
                                />

                            </div>
                        </Paper>
                        :
                        <Paper >
                            <div className="papar2dash">
                                <Button onClick={e => this.Takeanote(e)}>
                                    <TextField
                                        required id="standard-required"
                                        // label="Required" defaultValue="Hello World"
                                        // label="Take a note"
                                        InputProps={{ disableUnderline: true }}
                                        style={{ width: '380px', backgroundColor: '#ff00', border: 'none', }}
                                        //    helperText={this.state.helperTextpassowrd}
                                        onChange={this.onChangePassword.bind(this)}
                                    />
                                </Button>
                                <div className="icondash">
                                    <div>
                                        <img src={refresh} id="imgdash" />
                                    </div>
                                    <div className="columimg">
                                        <img src={box} id="imgdash" />
                                    </div>
                                    <div>
                                        <img src={search} id="imgdash" />
                                    </div>

                                </div>
                            </div>
                        </Paper>
                    }
                </div>



            </div>


        );
    }
}
export default Dashboard;