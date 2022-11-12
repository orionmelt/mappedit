import React from "react";
import "./App.css";
import GoogleMapReact from "google-map-react";
import { GoogleMapsOverlay } from "@deck.gl/google-maps";
import { ScatterplotLayer } from "@deck.gl/layers";
import SubredditInfoWindow from "./SubredditInfoWindow";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      places: null,
      selectedItem: null,
      subredditData: null,
      center: [0,0]
    };
    fetch("data.json")
      .then((response) => response.json())
      .then((data) => this.setState({places: data}));
  }

  onMarkerClick = (info, event) => {
    this.setState({
      selectedItem: info.object,
      center: [info.object.lat, info.object.lng],
      subredditData: null
    });
    let url = "https://api.reddit.com/r/" + info.object.subreddit + "/about.json";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          subredditData: data
        });
      });
    return true;
  }

  closeInfoWindow = () => {
    this.setState({
      selectedItem: null
    });
  }
  getRadius = (d) => {
    const totalSubscribers = d.subreddits.map(s => s.subscribers).reduce((a, b) => a+b, 0);
    return Math.sqrt(totalSubscribers);
  }

  onMapLoaded = (map, maps) => {
    const data = this.state.places;
    const selectedItem = this.state.selectedItem;
    const deckOverlay = new GoogleMapsOverlay({
      layers: [
        new ScatterplotLayer({
          id: 'scatterplot-layer',
          data,
          pickable: true,
          opacity: 0.8,
          stroked: true,
          filled: true,
          radiusScale: 100,
          radiusMinPixels: 1,
          radiusMaxPixels: 16,
          lineWidthMinPixels: 1,
          autoHighlight: true,
          getPosition: d => [d.lng, d.lat, 0],
          getRadius: this.getRadius,
          getFillColor: d => [255, 140, 0],
          getLineColor: d => [0, 0, 0],
          onClick: this.onMarkerClick,
        })
      ]
    });
    deckOverlay.setMap(map);
  }

  render() {
    const places = this.state.places;
    const subreddit = this.state.selectedItem;
    const subData = this.state.subredditData;
    const center = this.state.center;
    return (
      <div className="App">
        <div id="map-container">
          {places &&
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
            center={center}
            zoom={4}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({map, maps}) => this.onMapLoaded(map, maps)}
          >
            {subreddit &&
              <SubredditInfoWindow
                className="markerInfo"
                onClose={this.closeInfoWindow}
                subreddit={subreddit}
                data={subData}
                key={subreddit.subreddit}
                lat={subreddit.lat}
                lng={subreddit.lng}
              />
            }
          </GoogleMapReact>}
        </div>
      </div>
    );
  }
}

export default App;
