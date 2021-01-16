import React, { Component } from "react";
import { get } from "../../utilities.js";

import Info from "../modules/Game/Info.js";
import GameBoard from "../modules/Game/GameBoard.js";
import ScoreBoard from "../modules/Game/ScoreBoard.js";

import "./Game.css";
import { Socket } from "socket.io-client";

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roomName: "",
      roomCode: "",
      board: [],
      players: [],
    };
  }

    update = (data) => {
      this.setState({
          roomName: data.roomName,
          roomCode: data.roomCode,
          board: data.board,
          players: data.players,
      })
    }

    componentDidMount() {
        get("/api/checkGame", {_id: this.props.gameId}).then((data) => {
            if (data) {
                this.update(data)
                Socket.on("updateBoard", (game) => {
                  this.update(game)
                })
            }
        }).catch((err) => console.log(err));
    }

  render() {
    return (
      <div className="Game-container u-flex u-flex-justifySpaceEvenly u-flex-alignCenter">
        <div className="info">
          <Info roomName={this.state.roomName} roomCode={this.state.roomCode} />
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
