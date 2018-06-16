import React, { Component } from "react";
import logo from "./coffee.png";
import "./App.css";
import Container from "./Container";
// import Map from "./Map";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Coffee Findr</h1>
        </header>

        <Container />
      </div>
    );
  }
}

export default App;
