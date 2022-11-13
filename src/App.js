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
        <ToggleButtonGroup
          size="small"
          color="primary"
          value={view}
          exclusive
          onChange={this.toggleView}
          aria-label="Map plot mode"
        >
          <ToggleButton value="scatterplot" aria-label="scatterplot">Scatterplot</ToggleButton>
          <ToggleButton value="text" aria-label="text">Text</ToggleButton>
        </ToggleButtonGroup>
        {places ? <Map key={view} places={places} view={view} /> : <div>Loading...</div> }
      </div>
    );
  }
}

export default App;
