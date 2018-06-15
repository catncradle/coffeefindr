import React, { Component } from "react";
import { GoogleApiWrapper } from "google-maps-react";
import Map from "./Map";

export class Container extends Component {
  render() {
    if (!this.props.loaded) {
      return <div>Loading........</div>;
    }
    return (
      <div>
        <Map google={this.props.google} />;
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAoPZ8zbXXj5bH-Gmu6_GzFs1CpA2sbokU",
  libraries: ["visualization"]
})(Container);

//__GAPI_KEY__
