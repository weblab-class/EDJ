import React, { Component } from "react";
import { Router } from "@reach/router";

import Home from "./pages/Home.js";
import Game from "./pages/Game.js";
import HowToPlay from "./pages/HowToPlay.js";
import HostGame from "./pages/HostGame.js";
import JoinGame from "./pages/JoinGame.js";
import Login from "./pages/Login.js";
import Skeleton from "./pages/Skeleton.js";
import NotFound from "./pages/NotFound.js";

import Sidebar from "./modules/Sidebar.js";

import "../utilities.css";
import './App.css';

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ userId: user._id });
      }
    });
  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ userId: user._id });
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  handleLogout = () => {
    this.setState({ userId: undefined });
    post("/api/logout");
  };

  render() {
    return (
      <>
        <Sidebar
          userId={this.state.userId}
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
        />
        <div className='App-container u-flex u-flex-justifyCenter'>
          <Router>
            {/*<Skeleton
              path="/skeleton/"
              handleLogin={this.handleLogin}
              handleLogout={this.handleLogout}
              userId={this.state.userId}
            />*/}
            <Home path='/'userId={this.state.userId} />
            <Game path='/game/:gameId' userId={this.state.userId} />
            <HowToPlay path='/howto/' />
            <HostGame path='/host/' />
            <JoinGame path='/join/' />
            <Login path='/login/' />
            <NotFound default />
          </Router>
        </div>
      </>
    );
  }
}

export default App;
