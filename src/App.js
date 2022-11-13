import React from "react";
import Map from "./Map";
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

  toggleView = () => {
    this.setState((state, props) => ({
      view: (state.view === "scatterplot" ? "text" : "scatterplot")
    }));
  }

  render() {
    const places = this.state.places;
    const view = this.state.view;
    return (
      <div className="App">
        <div><button onClick={this.toggleView}>Toggle</button></div>
        {places ? <Map key={view} places={places} view={view} /> : <div>Loading...</div> }
      </div>
    );
  }
}

export default App;
