import React, { Component } from "react";
import { Link } from "@reach/router";
import user from "../../../../server/models/user.js";
import { post } from "../../utilities.js";
import { navigate } from "@reach/router";

import "./HostGame.css";
//import { post } from "../../../../server/api";

class HostGame extends Component {
  constructor(props) {
    super(props);
    const code = this.revealCode();
    // while code in db of current games, keep generating code
    // append code to array of codes after while loop
    this.state = {
      code: code,
      toDisplay: code,
      roomName: "",
      mirrors: 6,
      playerStyle: "",
    };
  }
  componentDidMount = () => {};

  handleEnter = (event) => {
    if (event.keyCode === 13) {
      this.hostgame();
    }
  };

  hostgame = () => {
    if (this.state.roomName === "") {
      alert("You must name the room!");
    } else if (this.state.playerStyle === "") {
      alert("You must choose a player style!");
    } else {
      const body = {
        roomName: this.state.roomName,
        roomCode: this.state.code,
        mirrors: this.state.mirrors,
        playerStyle: this.state.playerStyle,
      };
      post("/api/newGame", body).then((game) => {
        console.log(`Starting game room '${game.roomName}'...`);
        navigate("/game/" + String(game._id));
      });
    }
  };

  revealCode = () => {
    let code = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return code;
  };

  clickCode = () => {
    navigator.clipboard.writeText(this.state.code);
    this.setState({ toDisplay: "Code copied!" });
    setTimeout(() => {
      this.setState({ toDisplay: this.state.code });
    }, 2000);
  };

  updateName = (event) => {
    event.persist();
    this.setState((prevState) => {
      return {
        code: prevState.code,
        toDisplay: prevState.toDisplay,
        roomName: event.target.value,
      };
    });
  };

  updateMirrors = (event) => {
    event.persist();
    this.setState({ mirrors: Number(event.target.value) });
  };

  isPopsicle = (event) => {
    event.persist();
    this.setState({ playerStyle: "popsicle" });
  };

  isPokemon = (event) => {
    event.persist();
    this.setState({ playerStyle: "pokemon" });
  };

  isClicked = (playerStyle) => {
    if (this.state.playerStyle === playerStyle) {
      return "popsicle-containerClicked";
    } else {
      return "popsicle-container";
    }
  };

  render() {
    return (
      <div className="u-center-screen">
        <div className="u-title">HOST GAME</div>
        <div>
          <label className="u-inlineBlock">Group name:</label>
          <input
            id="group-name"
            type="text"
            className="u-inlineBlock"
            onChange={this.updateName}
            onKeyDown={this.handleEnter}
          ></input>
        </div>
        <div>
          <label className="u-inlineBlock">Number of mirrors:</label>
          <select id="mirrors" value={this.state.mirrors} onChange={this.updateMirrors}>
            {/* <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option> */}
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
            <option>13</option>
            <option>14</option>
          </select>
        </div>
        {/* <div> */}
        <label className="u-inlineBlock">Player style:</label>
        <div className="player-style-container">
          <div className={this.isClicked("popsicle") + " u-link"} onClick={this.isPopsicle}>
            <div className="popsicle_1"></div>
            <div className="popsicle_2"></div>
            <div className="popsicle_3"></div>
            <div className="popsicle_4"></div>
          </div>
          <div className={this.isClicked("pokemon") + " u-link"} onClick={this.isPokemon}>
            <div className="pokemon_1"></div>
            <div className="pokemon_2"></div>
            <div className="pokemon_3"></div>
            <div className="pokemon_4"></div>
          </div>
        </div>
        {/* </div> */}
        <p>Click the code below to copy to clipboard.</p>
        <div className="hostgame-link code-box" id="code" onClick={this.clickCode}>
          {this.state.toDisplay}
        </div>
        <div id="host-button" className="u-button u-link" onClick={this.hostgame}>
          Host!
        </div>
      </div>
    );
  }
}

export default HostGame;
