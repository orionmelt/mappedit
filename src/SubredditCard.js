import React from "react";
import he from "he";
import redditLogo from "./reddit-logo.png";

const cache = {};

class SubredditCard extends React.Component {
  constructor(props) {
    super(props);
    const {subreddit} = props;
    this.state = {
      subreddit: subreddit,
      subredditAbout: cache[subreddit.name] ?? null
    };
    this.addToCache(subreddit);
  }

  addToCache = (subreddit) => {
    if (cache[subreddit.name]) return;
    const aboutUri = `https://api.reddit.com/r/${subreddit.name}/about.json`;
    fetch(aboutUri)
      .then(response => response.json())
      .then(data => {
        cache[subreddit.name] = data;
        this.setState({
          subredditAbout: data
        });
      });
  }

  render() {
    const subreddit = this.state.subreddit;
    const about = this.state.subredditAbout;
    return (
      <div>
        <div>/r/{subreddit.name}</div>
        <div>{subreddit.subscribers}</div>
        {about && 
          <div>
            <img witdh={256} height={256} alt={subreddit.name} src={he.decode(about.data.icon_img || about.data.community_icon || about.data.banner_img || redditLogo)} />
          </div>
        }
      </div>
    );
  }
}

export default SubredditCard;