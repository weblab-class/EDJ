import React, { Component } from "react";
import { Link } from "@reach/router";
import { post } from "../../utilities.js";
import { navigate } from "@reach/router";

import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

import errorTone from "../modules/Game/message.mp3";

import "./JoinGame.css";

class JoinGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: "",
    };
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleEnter);
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleEnter);
  }

  handleEnter = (event) => {
    if (event.keyCode === 13) {
      this.handleClick();
    }
  };

  handleChange = (event) => {
    event.persist();
    console.log("Received Input");
    this.setState((prev) => {
      return {
        code: event.target.value,
      };
    });
  };

  handleClick = () => {
    const errorSound = new Audio(errorTone);
    post("/api/joinGame", { code: this.state.code })
      .then((data) => {
        console.log(data);
        if (!(Object.keys(data).length === 0 && data.constructor === Object)) {
          navigate("/game/" + String(data._id));
        } else {
          errorSound.play();
          alertify.notify("No valid games found.", "custom", 3, function () {
            console.log("dismissed");
          });
        }
      })
      .catch((err) => {
        errorSound.play();
        alertify.notify(
          "You must be logged in to host or join a game. Click on the menu icon in the upper left corner to log in.",
          "custom",
          5,
          function () {
            console.log("dismissed");
          }
        );
      });
  };

  render() {
    return (
      <div className="u-center-screen">
        <Link to="/" id="back-button" className="u-back-button u-button u-link">
          back{" "}
        </Link>
        <div className="u-title">JOIN GAME</div>
        <input
          type="text"
          id="game-code"
          placeholder="Enter code here..."
          onChange={this.handleChange}
        ></input>
        <div className="u-button u-link" onClick={this.handleClick}>
          Join!
        </div>
      </div>
    );
  }
}

export default JoinGame;
