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
      data: null,
      selectedItem: null,
      subredditData: null,
      center: [0,0]
    };
    fetch("data.json")
      .then((response) => response.json())
      .then((data) => this.init(data));
  }

  init = (data) => {
    const expandedData = data.map(d => {
      let places = [];
      d.subreddits.forEach(s => {
        places.push({
          name: d.name,
          type: d.type,
          lat: d.lat,
          lng: d.lng,
          subreddit: s.name,
          subscribers: s.subscribers
        });
      });
      return places;
    }).flat();
    this.setState({
      data: expandedData
    });
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

  onMapLoaded = (map, maps) => {
    const data = this.state.data;
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
          radiusScale: 32,
          radiusMinPixels: 1,
          radiusMaxPixels: 16,
          lineWidthMinPixels: 1,
          autoHighlight: true,
          getPosition: d => [d.lng, d.lat, 0],
          getRadius: d => Math.sqrt(d.subscribers),
          getFillColor: d => {
            return d===selectedItem ? [0,0,0] : [255, 140, 0];
          },
          getLineColor: d => [0, 0, 0],
          onClick: this.onMarkerClick,
        })
      ]
    });
    deckOverlay.setMap(map);
  }

  render() {
    const data = this.state.data;
    const subreddit = this.state.selectedItem;
    const subData = this.state.subredditData;
    const center = this.state.center;
    return (
      <div className="App">
        <div id="map-container">
          {data &&
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
