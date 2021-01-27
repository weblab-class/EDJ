import React, { Component } from "react";
import { Link } from "@reach/router";
import { get, post } from "../../utilities.js";
import { navigate } from "@reach/router";

import errorTone from "../modules/Game/message.mp3";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

import "./HostGame.css";
//import { post } from "../../../../server/api";

class HostGame extends Component {
  constructor(props) {
    super(props);
    const code = this.revealCode();
    this.state = {
      code: code,
      toDisplay: code,
      roomName: "",
      boardType: "Random",
      boards: [],
      playerStyle: "",
      rounds: 1,
    };
  }

  componentDidMount = () => {
    get("/api/getBoards").then((res) => {
      this.setState({
        boards: res.boards,
      });
    });
    window.addEventListener("keydown", this.handleEnter);
  };

  componentWillUnmount = () => {
    window.removeEventListener("keydown", this.handleEnter);
  };

  handleEnter = (event) => {
    if (event.keyCode === 13) {
      this.hostgame();
    }
  };

  hostgame = () => {
    const errorSound = new Audio(errorTone);
    if (this.state.roomName === "") {
      errorSound.play();
      alertify.notify("You must name the room!", "custom", 3, function () {
        console.log("dismissed");
      });
    } else if (this.state.playerStyle === "") {
      errorSound.play();
      alertify.notify("You must choose a player style!", "custom", 3, function () {
        console.log("dismissed");
      });
    } else {
      const body = {
        roomName: this.state.roomName,
        roomCode: this.state.code,
        boardType: this.state.boardType,
        playerStyle: this.state.playerStyle,
        rounds: this.state.rounds,
      };
      post("/api/newGame", body)
        .then((game) => {
          console.log(`Starting game room '${game.roomName}'...`);
          navigate("/game/" + String(game._id));
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

  updateBoardType = (event) => {
    event.persist();
    this.setState({ boardType: String(event.target.value) });
  };

  updateRounds = (event) => {
    event.persist();
    this.setState({ rounds: Number(event.target.value) });
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

  getCustomBoards = () => {
    return this.state.boards.map((board) => {
      return (
        <option key={board.name} value={board.name}>
          {board.name}
        </option>
      );
    });
  };

  render() {
    return (
      <div className="u-center-screen">
        <Link to="/" id="back-button" className="u-back-button u-button u-link">
          back
        </Link>
        <div className="u-title">HOST GAME</div>
        <div>
          <label className="u-inlineBlock">Group name:</label>
          <input
            id="group-name"
            type="text"
            className="u-inlineBlock"
            onChange={this.updateName}
          ></input>
          <div id="host-button" className="u-button u-link u-inlineBlock" onClick={this.hostgame}>
            Host!
          </div>
        </div>
        <div>
          <div className="options-block u-width u-flex u-flex-justifyCenter u-flex-alignCenter">
            <label>Choose a board:</label>
            <select id="mirrors" value={this.state.boardType} onChange={this.updateBoardType}>
              <option>Random</option>
              {this.getCustomBoards()}
            </select>
            <div className="tooltip">
              <img
                id="tooltip-img"
                src="https://everythinggoesdance.com/wp-content/uploads/2014/07/Very-Basic-Info-icon.png"
              ></img>
              <span className="tooltiptext">
                You can preview your boards at the{" "}
                <a href={"/profile/" + this.props.userId}>Profile page</a> or make custom boards at
                the <a href="/custom/">Boards page</a>.
              </span>
            </div>
            <label>Number of rounds:</label>
            <select id="rounds" value={this.state.rounds} onChange={this.updateRounds}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
            </select>
          </div>
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
      </div>
    );
  }
}

export default HostGame;
