import React, { Component } from "react";
import { Link } from "@reach/router";
import { post } from "../../utilities.js";
import { navigate } from "@reach/router";

import errorTone from "../modules/Game/message.mp3";

import "./JoinGame.css";

class JoinGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: "",
      message: "",
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

  viewError = () => {
    if (this.state.message !== "") {
      return "error-message";
    }
    return "";
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
          this.setState({ message: "No valid games found." });
          setTimeout(() => {
            this.setState({ message: "" });
          }, 2000);
        }
      })
      .catch((err) => {
        errorSound.play();
        this.setState({
          message:
            "You are not logged in. Click on the menu icon in the upper left corner to log in.",
        });
        setTimeout(() => {
          this.setState({ message: "" });
        }, 3000);
      });
  };

  render() {
    return (
      <div className="u-center-screen">
        <Link to="/" id="u-back-button" className="back-button u-button u-link">
          back{" "}
        </Link>
        <div className="u-title">JOIN GAME</div>
        <input
          type="text"
          id="game-code"
          placeholder="Enter code here..."
          onChange={this.handleChange}
        ></input>
        <div className={this.viewError()}>{this.state.message}</div>
        <div className="u-button u-link" onClick={this.handleClick}>
          Join!
        </div>
      </div>
    );
  }
}

export default JoinGame;
