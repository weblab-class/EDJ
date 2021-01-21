import React, { Component } from "react";
import { Link } from "@reach/router";
import user from "../../../../server/models/user.js";
import { post } from "../../utilities.js";
import { navigate } from "@reach/router";

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
    post("/api/joinGame", { code: this.state.code })
      .then((data) => {
        console.log(data);
        if (!(Object.keys(data).length === 0 && data.constructor === Object)) {
          navigate("/game/" + String(data._id));
        } else {
          alert("No valid games found.");
        }
      })
      .catch((err) => {
        alert("You are not logged in. Click on the menu icon in the upper left corner to log in.");
      });
  };

  render() {
    return (
      <div className="u-center-screen">
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
