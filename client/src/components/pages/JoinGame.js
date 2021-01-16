import React, { Component } from "react";
import { Link } from "@reach/router";
import { post } from "../../utilities.js";
import { navigate } from "@reach/router";

import "./JoinGame.css";

class JoinGame extends Component {
  constructor(props) {
    super(props);

    // this.handleChange = this.handleChange.bind(this);
    this.state = {
      code: "",
      // isValidCode: false,
      // TODO: need logic for checking the code in the DB
    };
  }

  handleChange = (event) => {
    event.persist();
    console.log("Received Input");
    this.setState((prev) => {
      return {
        code: event.target.value,
        // isValidCode: prev.isValidCode,
      };
    });
  };

  handleClick = (event) => {
    post("/api/joinGame", { code: this.state.code }).then((data) => {
      console.log(data);
      if (!(Object.keys(data).length === 0 && data.constructor === Object)) {
        navigate("/game/" + String(data._id));
      } else {
        alert("No valid games found.");
      }
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
