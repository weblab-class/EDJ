import React, { Component } from "react";
import { get } from "../../utilities.js";
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
      mirrors: [],
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
      mirrors: data.mirrors,
      players: data.players,
      roomCode: data.roomCode,
      roomName: data.roomName,
    });
  };

  componentDidMount() {
    get("/api/checkGame", { _id: this.props.gameId })
      .then((data) => {
        console.log();
        if (data) {
          this.update(data);
          socket.on("updateBoard", (game) => {
            this.update(game);
          });
        }
      })
      .catch((err) => console.log(err));
  }

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
