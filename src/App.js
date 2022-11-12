import React from "react";
import Map from "./Map";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      places: null
    };
    fetch("data.json")
      .then((response) => response.json())
      .then((data) => this.setState({places: data}));
  }

  render() {
    const places = this.state.places;
    return (
      <div className="App">
        {places ? <Map places={places} /> : <div>Loading...</div> }
      </div>
    );
  }
}

export default App;
