import React from "react";
import SubredditCard from "./SubredditCard";
import "./InfoPopup.css";

class InfoPopup extends React.Component {
  constructor(props) {
    super(props);
    const {subreddits, onClose} = props;
    this.state = {
      subreddits: subreddits,
      onClose: onClose
    };
  }
  
  render() {
    const carousel = (
      <div id="carousel">
        {this.state.subreddits.map((s, i) => <SubredditCard key={i} subreddit={s} />)}
      </div>
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