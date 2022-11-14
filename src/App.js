import React from "react";
import Map from "./Map";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      places: null,
      view: "scatterplot"
    };
    fetch("data.json")
      .then((response) => response.json())
      .then((data) => this.setState({places: data}));
  }

  toggleView = (event, view) => {
    this.setState({view: view});
  }

  render() {
    const places = this.state.places;
    const view = this.state.view;
    return (
      <div className="App">
        <div className="header">
          <div className="header-row">
            <div className="logo">
              mappedit
            </div>
            <div className="blurb">
              Location-based subreddits on a map. 
              Data from <a href="https://www.reddit.com/r/LocationReddits/wiki/index/" target="_blank" rel="nopener noreferrer">/r/LocationReddits</a>.
            </div>
            <div className="blurb">
              Bigger {view === "scatterplot" ? "circles mean": "text means"} more subscribers. Color ranges from <span className="most-active">most recently</span> to <span className="least-active">least recently</span> active.
            </div>
            <div className="toolbar">
              <div className="toolbar-item">
                <ToggleButtonGroup
                  size="small"
                  value={view}
                  exclusive
                  onChange={this.toggleView}
                  aria-label="Map plot mode"
                >
                  <ToggleButton value="scatterplot" aria-label="scatterplot">Scatterplot</ToggleButton>
                  <ToggleButton value="text" aria-label="text">Text</ToggleButton>
                </ToggleButtonGroup>
              </div>
            </div>
          </div>
        </div>
        {places ? <Map key={view} places={places} view={view} /> : <div>Loading...</div> }
      </div>
    );
  }
}

export default App;
