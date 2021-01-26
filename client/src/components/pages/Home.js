import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { Link } from "@reach/router";
import { navigate } from "@reach/router";
import logo from '../modules/Game/Gifs/green_r.gif'; 
import logo2 from '../modules/Game/Gifs/pink_r.gif'; 
import logo3 from '../modules/Game/Gifs/purple_r.gif'; 
import logo4 from '../modules/Game/Gifs/yellow_r.gif'; 


import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import alertTone from "../modules/Game/message.mp3";

import "./Home.css";

const GOOGLE_CLIENT_ID = "473769754928-7ahknn038led2u1qif6aj95lka4k528i.apps.googleusercontent.com";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  validateHost = () => {
    const alertSound = new Audio(alertTone);
    if (this.props.userId) {
      navigate("/host");
    } else {
      alertSound.play();
      alertify.notify(
        "You must be logged in to host or join a game. Click on the menu icon in the upper left corner to log in.",
        "custom",
        5,
        function () {
          console.log("dismissed");
        }
      );
    }
  };

  validateJoin = () => {
    const alertSound = new Audio(alertTone);
    if (this.props.userId) {
      navigate("/join");
    } else {
      alertSound.play();
      alertify.notify(
        "You must be logged in to host or join a game. Click on the menu icon in the upper left corner to log in.",
        "custom",
        5,
        function () {
          console.log("dismissed");
        }
      );
    }
  };

  render() {
    return (
     
      <div className="u-center-screen">
        <div className="u-title">Trickshots</div>
        <div className="u-button-container">
          <div className="u-button u-link" onClick={this.validateHost}>
            Host game
          </div>
          <div className="u-button u-link" onClick={this.validateJoin}>
            Join game
          </div>
        </div>
        <div className="u-flex animationClass2">
        <img className="animationClass" src={logo}/>
        <img className="animationClass" src={logo2}/>
        <img className="animationClass" src={logo4}/>
        <img className="animationClass" src={logo3}/>
        </div>
      </div>
        
    );
  }
}

export default Home;
