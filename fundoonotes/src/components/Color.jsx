import React from "react";
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import IconButton from "@material-ui/core/IconButton";
import ColorLensIcon from "@material-ui/icons/ColorLens";
import color from '../assets/color.png'


class Color extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null,
      open: false,
      changeColor: this.props.changeColor,
      index: this.props.index
    }
  }
  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
      open: !this.state.open
    });
  }
  changeColor = (color) => {
    this.setState({ changeColor: color }, () => this.colorprops)
  }
  colorprops = () => {
    this.props.sendColor(color, this.state.index)

  }
  render() {
    return (
      <div onClick={this.handleClick}>
        <img src={color} id="imgdashnotes" />
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
          <div style={{ width: '200px', height: '150px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', padding: '10px' }}>
            <div style={{ padding: '5px' }}>
              <div style={{ backgroundColor: 'white', border: 'solid 1px', width: '35px', height: '35px', borderRadius: '50px' }} color='#FFFFFF' color='#FFFFFF' onClick={this.state.changeColor}>
              </div>
            </div>
            <div style={{ padding: '5px' }}>
              <div style={{ backgroundColor: '#fa8072', width: '35px', height: '35px', borderRadius: '50px' }} color='#fa8072' onClick={() => this.changeColor('#fa8072')}>
              </div>
            </div>
            <div style={{ padding: '5px' }}>
              <div style={{ backgroundColor: '#FFD700', width: '35px', height: '35px', borderRadius: '50px' }} color='#FFD700' onClick={() => this.changeColor('#FFD700')}>
              </div>
            </div>
            <div style={{ padding: '5px' }}>
              <div style={{ backgroundColor: '#FFFF66', width: '35px', height: '35px', borderRadius: '50px' }} color='#FFFF66' onClick={() => this.changeColor('#FFFF66')}>
              </div>
            </div>
            <div style={{ padding: '5px' }}>
              <div style={{ backgroundColor: '#ADFF2F', width: '35px', height: '35px', borderRadius: '50px' }} color='#ADFF2F' onClick={() => this.changeColor('#ADFF2F')}>
              </div>
            </div>
            <div style={{ padding: '5px' }}>
              <div style={{ backgroundColor: '#5bb4b4', width: '35px', height: '35px', borderRadius: '50px' }} color='#5bb4b4' onClick={() => this.changeColor('#5bb4b4')}>
              </div>
            </div>
            <div style={{ padding: '5px' }}>
              <div style={{ backgroundColor: '#0606f8', width: '35px', height: '35px', borderRadius: '50px' }} color='#0606f8' onClick={() => this.changeColor('#0606f8')}>
              </div>
            </div>
            <div style={{ padding: '5px' }}>
              <div style={{ backgroundColor: '#00FFFF', width: '35px', height: '35px', borderRadius: '50px' }} color='#00FFFF' onClick={() => this.changeColor('#00FFFF')}>
              </div>
            </div>
            <div style={{ padding: '5px' }}>
              <div style={{ backgroundColor: '#9b2c9b', width: '35px', height: '35px', borderRadius: '50px' }} color='#9b2c9b' onClick={() => this.changeColor('#9b2c9b')}>
              </div>
            </div>
            <div style={{ padding: '5px' }}>
              <div style={{ backgroundColor: '#FFC0CB', width: '35px', height: '35px', borderRadius: '50px' }} color='#FFC0CB' onClick={() => this.changeColor('#FFC0CB')}>
              </div>
            </div>
            <div style={{ padding: '5px' }}>
              <div style={{ backgroundColor: '#d10303', width: '35px', height: '35px', borderRadius: '50px' }} color='#d10303' onClick={() => this.changeColor('#d10303')}>
              </div>
            </div>
            <div style={{ padding: '5px' }}>
              <div style={{ backgroundColor: '#808080', width: '35px', height: '35px', borderRadius: '50px' }} color='#808080' onClick={() => this.changeColor('#808080')}>
              </div>
            </div>

          </div>
        </Popover>
      </div>
    );
  }
}

export default Color;