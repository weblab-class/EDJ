import React, { Component } from "react";
import { get } from "../../utilities.js";
import { post } from "../../utilities.js";
import { socket } from "../../client-socket.js";

import Info from "../modules/Game/Info.js";
import GameBoard from "../modules/Game/GameBoard.js";
import ScoreBoard from "../modules/Game/ScoreBoard.js";

import "./Game.css";
import { Socket } from "socket.io-client";
import user from "../../../../server/models/user.js";

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      board: [],
      currentTurn: 0,
      isActive: false,
      players: [],
      roomCode: "",
      roomName: "",
    };
  }

  update = (data) => {
    this.setState({
      board: data.board,
      currentTurn: data.currentTurn,
      isActive: data.isActive,
      players: data.players,
      roomCode: data.roomCode,
      roomName: data.roomName,
    });
  };

  componentDidMount() {
    document.addEventListener("keydown", this.movePlayer);
    get("/api/checkGame", { _id: this.props.gameId })
      .then((data) => {
        if (data) {
          this.update(data);
          socket.on("updateBoard", (game) => {
            this.update(game);
          });
        }
      })
      .catch((err) => console.log(err));
  }

  movePlayer = (event) => {
    const body = {
      roomCode: this.state.roomCode,
      keyCode: event.code,
    };
    post("/api/movePlayer", body)
      .then((data) => {
        if (!data) {
          alert("Not a valid move.");
        } else {
          this.update(data);
          console.log("current player state: " + this.state.board);
          socket.on("updateBoard", (game) => {
            console.log("other player state: " + this.state.board);
            this.update(game);
          });
        }
      })
      .catch(console.log);
  };

  render() {
    return (
      <div className="Game-container u-flex u-flex-justifySpaceEvenly u-flex-alignCenter">
        <div className="info">
          <Info
            userId={this.props.userId}
            roomName={this.state.roomName}
            roomCode={this.state.roomCode}
            gameData={this.state}
            gameId={this.props.gameId}
          />
        </div>
        <div className="board">
          <GameBoard board={this.state.board} />
        </div>
        <div className="scores">
          <ScoreBoard players={this.state.players} />
        </div>
      </div>
    );
  }
}

export default Game;
