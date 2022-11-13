import React from "react";
import he from "he";
import ReactTimeAgo from "react-time-ago";
import redditLogo from "./reddit-logo.png";
import "./SubredditCard.css";

const cache = {};

class SubredditCard extends React.Component {
  constructor(props) {
    super(props);
    const {subreddit} = props;
    this.state = {
      subreddit: subreddit,
      subredditAbout: cache[subreddit.name] ?? null,
      latestPostCreateTimestamp: null
    };
    this.addToCache(subreddit);
    this.getNewPosts(subreddit);
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

  getNewPosts = (subreddit) => {
    const newPostsUri = `https://api.reddit.com/r/${subreddit.name}/new.json`;
    fetch(newPostsUri)
      .then(response => response.json())
      .then(data => {
        const posts = data.data.children;
        const unpinnedPosts = posts.filter(p => p.data.pinned === false && p.data.stickied === false);
        if (unpinnedPosts.length < 1) return;
        const postTimestamp = unpinnedPosts[0].data.created_utc;
        this.setState({
          latestPostCreateTimestamp: postTimestamp
        });
      });
  }

  render() {
    const subreddit = this.state.subreddit;
    const about = this.state.subredditAbout;
    const latestPostCreateTimestamp = this.state.latestPostCreateTimestamp;
    const hasPosts = (latestPostCreateTimestamp || subreddit.last_post_utc) !== null;
    const redditLink = `https://www.reddit.com/r/${subreddit.name}`;
    return (
      <div className="subreddit-card">
        <div className="title"><a href={redditLink} target="_blank" rel="noopener noreferrer">/r/{subreddit.name}</a></div>
        {about &&
          <>
          <div className="subtitle">{about.data.title}</div>
          <div className="info">{subreddit.subscribers.toLocaleString()} subscribers, {about.data.accounts_active} online now</div>
          <div className="info">Created <ReactTimeAgo date={new Date(+subreddit.created_utc*1000)} /></div>
          {hasPosts && <div className="info">Most recent post <ReactTimeAgo date={new Date((latestPostCreateTimestamp ||+subreddit.last_post_utc)*1000)} /></div>}
          <img className="subreddit-icon" width={256} height={256} alt={subreddit.name} src={he.decode(about.data.icon_img || about.data.community_icon || about.data.banner_img || redditLogo)} />
          </>
        }
      </div>
    );
  }
}

export default SubredditCard;