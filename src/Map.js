import React from "react";
import GoogleMapReact from "google-map-react";
import { GoogleMapsOverlay } from "@deck.gl/google-maps";
import { ScatterplotLayer } from "@deck.gl/layers";

const DEFAULT_CENTER = [39.50024, -98.350891];
const DEFAULT_ZOOM = 4;

class Map extends React.Component {
  constructor(props) {
    super(props);
    const {places} = props;
    this.state = {
      places: places,
      selectedPlace: null,
      mapCenter: DEFAULT_CENTER
    };
  }

  getRadius = (place) => {
    const totalSubscribers = place.subreddits.map(s => s.subscribers).reduce((a, b) => a+b, 0);
    return Math.sqrt(totalSubscribers);
  }

  unselectPlace = () => {
    this.setState({selectedPlace: null});
  }

  onMarkerClick = (info, event) => {
    this.setState({
      selectedPlace: info.object,
      mapCenter: [info.object.lat, info.object.lng]
    });
  }

  onMapLoaded = (map, maps) => {
    const data = this.state.places;
    const deckOverlay = new GoogleMapsOverlay({
      layers: [
        new ScatterplotLayer({
          id: "scatterplot-layer",
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
          onClick: this.onMarkerClick
        })
      ]
    });
    deckOverlay.setMap(map);  
  }

  render() {
    const selectedPlace = this.state.selectedPlace;
    const mapCenter = this.state.mapCenter;
    return (
      <div id="map-container">
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
          center={mapCenter}
          zoom={DEFAULT_ZOOM}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({map, maps}) => this.onMapLoaded(map, maps)}
        >
          {selectedPlace &&
            <div
              key={selectedPlace.id}
              lat={selectedPlace.lat}
              lng={selectedPlace.lng}
            >
              TBD
            </div>
          }
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;