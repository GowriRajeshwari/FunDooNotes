import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
 
export default class RatingStart extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
    //   rating: 0,
      rating:this.props.rating
    };
  }
 
  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
    this.props.rate(nextValue)
  }
 
  render() {
    const { rating } = this.state;
    
    return (                
      <div style={{display : "flex",flexDirection : "row",alignItems:"center"}}>
        
        <StarRatingComponent 
          name="rate1" 
          starCount={5}
          value={this.state.rating}
          onStarClick={this.onStarClick.bind(this)}
        />
        <h5> {this.state.rating}</h5>
      </div>
    );
  }
}