import React from "react";
import SubredditCard from "./SubredditCard";
import Carousel from "nuka-carousel";
import "./InfoPopup.css";

class InfoPopup extends React.Component {
  constructor(props) {
    super(props);
    const {place, onClose} = props;
    this.state = {
      subreddits: place.subreddits,
      onClose: onClose
    };
  }

  stopPropagation = (event) => {
    event.stopPropagation();
  }
  
  render() {
    const carousel = (
      <Carousel defaultControlsConfig={{prevButtonOnClick: this.stopPropagation, nextButtonOnClick: this.stopPropagation}}>
        {this.state.subreddits.map((s, i) => <SubredditCard key={i} subreddit={s} />)}
      </Carousel>
    );
    return (
      <div className="infoPopup">
        <div className="close-button">
          <button onClick={this.state.onClose}>✖</button>
        </div>
        {carousel}
      </div>
    );
  }
}

export default InfoPopup;