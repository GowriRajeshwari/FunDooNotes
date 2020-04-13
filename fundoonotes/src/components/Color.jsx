import React from "react";
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import IconButton from "@material-ui/core/IconButton";
import ColorLensIcon from "@material-ui/icons/ColorLens";
import color from '../assets/color.png'


 class Color extends React.Component {
  constructor(props) {
    super(props)
    this.state={
        anchorEl:null,
        open:false,
        changeColor:this.props.changeColor
    }
  }
  handleClick = event => {
    this.setState({
        anchorEl: event.currentTarget,
        open: !this.state.open
    });
  }
  changeColor=async(color)=>{
   await this.setState({ changeColor : color })
    this.props.sendColor(this.state.changeColor)
  }
  render() {
    return (
      <div   >
            <button
            className='iconbtn'
            //  aria-describedby={id}
            //  variant="contained"
            //  color="grey"
             onClick={this.handleClick}>
                   <img src={color} id="imgdashnotes" />
            </button>
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
              <div style={{width : '180px',height : '150px',display:'flex',flexDirection : 'row',flexWrap : 'wrap'}}>
              <div style={{backgroundColor:'white',border:'solid 1px',width:'40px',height:'40px',borderRadius : '50px'}} color='#FFFFFF' color='#FFFFFF' onClick={this.state.changeColor}>
              </div>

              <div style={{backgroundColor:'#fa8072',width:'40px',height:'40px',borderRadius : '50px'}} color='#fa8072' onClick={()=>this.changeColor('#fa8072')}>
              </div>
              <div style={{backgroundColor:'#fd823b',width:'40px',height:'40px',borderRadius : '50px'}} color='#fd823b' onClick={()=>this.changeColor('#fd823b')}>
              </div>
              <div style={{backgroundColor:'#ffff64',width:'40px',height:'40px',borderRadius : '50px'}} color='#ffff64' onClick={()=>this.changeColor('#ffff64')}>
              </div>
              <div style={{backgroundColor:'#66ff66',width:'40px',height:'40px',borderRadius : '50px'}} color='#66ff66' onClick={()=>this.changeColor('#66ff66')}>
              </div>
              <div style={{backgroundColor:'#5bb4b4',width:'40px',height:'40px',borderRadius : '50px'}} color='#5bb4b4' onClick={()=>this.changeColor('#5bb4b4')}>
              </div>
              <div style={{backgroundColor:'#0606f8',width:'40px',height:'40px',borderRadius : '50px'}} color='#0606f8' onClick={()=>this.changeColor('#0606f8')}>
              </div>
              <div style={{backgroundColor:'#00FFFF',width:'40px',height:'40px',borderRadius : '50px'}} color='#00FFFF' onClick={()=>this.changeColor('#00FFFF')}>
              </div>
              <div style={{backgroundColor:'#9b2c9b',width:'40px',height:'40px',borderRadius : '50px'}} color='#9b2c9b' onClick={()=>this.changeColor('#9b2c9b')}>
              </div>
              <div style={{backgroundColor:'#FFC0CB',width:'40px',height:'40px',borderRadius : '50px'}} color='#FFC0CB' onClick={()=>this.changeColor('#FFC0CB')}>
              </div>
              <div style={{backgroundColor:'#d10303',width:'40px',height:'40px',borderRadius : '50px'}} color='#d10303' onClick={()=>this.changeColor('#d10303')}>
              </div>
              <div style={{backgroundColor:'#808080',width:'40px',height:'40px',borderRadius : '50px'}} color='#808080' onClick={()=>this.changeColor('#808080')}>
              </div>
              
          </div>
        </Popover>
      </div>
    );
  }
}

export default Color;