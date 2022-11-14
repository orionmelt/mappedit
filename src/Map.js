import React from "react";
import GoogleMapReact from "google-map-react";
import { GoogleMapsOverlay } from "@deck.gl/google-maps";
import { ScatterplotLayer, TextLayer } from "@deck.gl/layers";
import InfoPopup from "./InfoPopup";
import "./Map.css";

const DEFAULT_CENTER = [39.50024, -98.350891];
const DEFAULT_ZOOM = 4;
const SCATTERPLOT_MAP_OPTIONS = {
  mapTypeControl: false,
  fullscreenControl: false,
  styles: [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "poi.business",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#263c3f"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#6b9a76"
        }
      ]
    },
    {
      "featureType": "road",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#38414e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#212a37"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9ca5b3"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#1f2835"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#f3d19c"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#2f3948"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#515c6d"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    }
  ]
};

const TEXT_MAP_OPTIONS = {
  mapTypeControl: false,
  fullscreenControl: false,
  styles: [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "administrative.neighborhood",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#263c3f"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#6b9a76"
        }
      ]
    },
    {
      "featureType": "road",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#38414e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#212a37"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9ca5b3"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#1f2835"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#f3d19c"
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#2f3948"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#515c6d"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    }
  ]
}

class Map extends React.Component {
  constructor(props) {
    super(props);
    const {places, view} = props;
    this.state = {
      places: places,
      selectedPlace: null,
      mapCenter: DEFAULT_CENTER,
      view: view
    };
  }

  getRadius = (place) => {
    const totalSubscribers = place.subreddits.map(s => s.subscribers).reduce((a, b) => a+b, 0);
    return Math.sqrt(totalSubscribers)/64;
  }

  unselectPlace = () => {
    this.setState({selectedPlace: null});
  }

  onMarkerClick = (info, event) => {
    this.setState({selectedPlace: null});
    this.setState({
      selectedPlace: info.object,
      mapCenter: [info.object.lat, info.object.lng]
    });
  }

  onMapLoaded = (map, maps) => {
    const data = this.state.places;
    const scatterplotOverlay = new GoogleMapsOverlay({
      layers: [
        new ScatterplotLayer({
          id: "scatterplot-layer",
          data,
          pickable: true,
          opacity: 0.8,
          stroked: true,
          filled: true,
          radiusScale: 1,
          radiusUnits: "pixels",
          radiusMinPixels: 4,
          radiusMaxPixels: 32,
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
    const textOverlay = new GoogleMapsOverlay({
      layers: [
        new TextLayer({
          id: "text-layer",
          data,
          pickable: true,
          getPosition: d => [d.lng, d.lat, 0],
          getText: d => d.subreddits.length === 1 ? `r/${d.subreddits[0].name}` : (`r/${d.subreddits[0].name} + ${d.subreddits.length-1} more`),
          getSize: this.getRadius,
          fontFamily: 'Roboto Condensed',
          sizeScale: 2.2,
          sizeMinPixels: 10,
          sizeMaxPixels: 32,
          getColor: d => [255, 140, 0],
          getAngle: 0,
          getTextAnchor: 'middle',
          getAlignmentBaseline: 'center',
          onClick: this.onMarkerClick
        })
      ]
    });
    switch(this.state.view) {
      case "text":
        textOverlay.setMap(map);
        break;
      case "scatterplot":
      default:
        scatterplotOverlay.setMap(map);
        break;
    }
  }

  render() {
    const selectedPlace = this.state.selectedPlace;
    const mapCenter = this.state.mapCenter;
    const mapOptions = this.state.view === "text" ? TEXT_MAP_OPTIONS : SCATTERPLOT_MAP_OPTIONS;
    return (
      <div id="map-container">
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
          center={mapCenter}
          zoom={DEFAULT_ZOOM}
          yesIWantToUseGoogleMapApiInternals
          options={mapOptions}
          onGoogleApiLoaded={({map, maps}) => this.onMapLoaded(map, maps)}
        >
          {selectedPlace &&
            <InfoPopup
              key={selectedPlace.id}
              lat={selectedPlace.lat}
              lng={selectedPlace.lng}
              place={selectedPlace}
              onClose={this.unselectPlace}
            />
          }
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;