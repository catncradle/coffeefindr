import React, { Component } from "react";
import ReactDOM from "react-dom";
import service from "./nearbySearch";
const image = "https://png.icons8.com/color/2x/coffee-to-go.png";
let markers = [];

export class Map extends Component {
  constructor() {
    super();
    this.state = {
      locations: []
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
    const { google } = this.props;
    const maps = google.maps;
    markers.forEach(marker => {
      marker.setMap(null);
    });
    markers = [];
    this.state.locations.forEach(location => {
      // iterate through locations saved in state
      location = location.geometry.location;
      const marker = new google.maps.Marker({
        // creates a new Google maps Marker object.
        position: {
          lat: location.lat,
          lng: location.lng
        },
        animation: google.maps.Animation.DROP,
        icon: image,
        map: this.map // sets markers to appear on the map we just created on line 35
      });

      markers.push(marker);
    });
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
              locations: [...payload.results.slice(0, 5)]
            };

            this.setState(nextState);
          })
          .on("error", payload => {
            console.log(payload);
          });

        console.log(this.state);
      });
    }
  }

  recenterMap() {
    const map = this.map;
    const curr = this.state.currentLocation;

    const google = this.props.google;
    const maps = google.maps;
    const marker = new google.maps.Marker({
      position: curr,
      map: this.map
    });
    // markers.push(marker);
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
