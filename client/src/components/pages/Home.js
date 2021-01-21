import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { Link } from "@reach/router";
import { navigate } from "@reach/router";

import "./Home.css";

const GOOGLE_CLIENT_ID = "473769754928-7ahknn038led2u1qif6aj95lka4k528i.apps.googleusercontent.com";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  validateHost = () => {
    if (this.props.userId) {
      navigate("/host");
    } else {
      alert(
        "You must be logged in to host or join a game. Click on the menu icon in the upper left corner to log in."
      );
    }
  };

  validateJoin = () => {
    if (this.props.userId) {
      navigate("/join");
    } else {
      alert(
        "You must be logged in to host or join a game. Click on the menu icon in the upper left corner to log in."
      );
    }
  };

  render() {
    return (
      <div className="u-center-screen">
        <div className="u-title">Trickshot</div>
        <div className="u-button-container">
          <div className="u-button u-link" onClick={this.validateHost}>
            Host game
          </div>
          <div className="u-button u-link" onClick={this.validateJoin}>
            Join game
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
