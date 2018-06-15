import React, { Component } from "react";
import ReactDOM from "react-dom";
import service from "./nearbySearch";

export class Map extends Component {
  constructor() {
    super();
    this.state = {
      locations: [
        {
          name: "New York County Supreme Court",
          location: { lat: 40.7092575, lng: -74.0070346 }
        },
        {
          name: "Queens County Supreme Court",
          location: {
            lat: 40.709438,
            lng: -74.010086
          }
        },
        {
          name: "Kings County Supreme Court",
          location: { lat: 40.710078, lng: -74.007679 }
        },
        {
          name: "Richmond County Supreme Court",
          location: { lat: 40.711619, lng: -74.00673 }
        }
      ]
    };
  }

  componentDidMount() {
    if (this.props.centerAroundCurrentLocation) {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          const coords = pos.coords;
          this.setState({
            currentLocation: {
              lat: coords.latitude,
              lng: coords.longitude
            }
          });
        });
      }
    }

    this.loadMap();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
  }

  loadMap() {
    if (this.props && this.props.google) {
      // google is available
      const { google } = this.props;
      const maps = google.maps;
      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      let zoom = 16;
      let lat = 40.705076;
      let lng = -74.00916;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign(
        {},
        {
          center: center,
          zoom: zoom,
          mapTypeId: "terrain"
        }
      );

      this.map = new maps.Map(node, mapConfig);

      //click handler on map
      maps.event.addListener(this.map, "click", event => {
        // const marker = new google.maps.Marker({
        //   position: event.latLng,
        //   map: this.map
        // });
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        let nextState = { currentLocation: { lat, lng } };
        // var location = new google.maps.LatLng(lat, lng);
        let request = {
          coordinate: `${lat}, ${lng}`,
          apiKey: "AIzaSyCsrkC5mOTfE3h2L8_lqs0nxLQUywJWZAo",
          radius: "500",
          type: ["cafe"]
        };

        service
          .call("GooglePlaces", "getNearbyPlacesByType", request)
          .on("success", payload => {
            nextState = {
              ...nextState,
              locations: [...payload.results.slice(0, 4)]
            };
            console.log(nextState);
          })
          .on("error", payload => {
            console.log(payload);
          });

        this.setState(nextState);
      });
      this.state.locations.forEach(location => {
        // iterate through locations saved in state
        const marker = new google.maps.Marker({
          // creates a new Google maps Marker object.
          position: { lat: location.location.lat, lng: location.location.lng }, // sets position of marker to specified location
          map: this.map, // sets markers to appear on the map we just created on line 35
          title: location.name // the title of the marker is set to the name of the location
        });
      });
    }
  }

  recenterMap() {
    const map = this.map;
    const curr = this.state.currentLocation;

    const google = this.props.google;
    const maps = google.maps;

    if (map) {
      let center = new maps.LatLng(curr.lat, curr.lng);
      map.panTo(center);
    }
  }

  render() {
    const style = {
      width: "100vw",
      height: "80vh"
    };
    return (
      <div style={style} ref="map">
        Loading...
      </div>
    );
  }
}

Map.propTypes = {
  google: React.PropTypes.object,
  zoom: React.PropTypes.number,
  initialCenter: React.PropTypes.object,
  centerAroundCurrentLocation: React.PropTypes.bool
};

Map.defaultProps = {
  zoom: 14,
  initialCenter: {
    lat: 40.705076,
    lng: -74.00916
  },
  centerAroundCurrentLocation: true
};

export default Map;
