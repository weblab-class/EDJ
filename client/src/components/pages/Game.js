import React, { Component } from "react";
import { get } from "../../utilities.js";
import { socket } from "../../client-socket.js";

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
      mirrors: 0,
      mirrorsArr: [],
    };
  }

  update = (data) => {
    this.setState({
      roomName: data.roomName,
      roomCode: data.roomCode,
      board: data.board,
      players: data.players,
      mirrors: data.mirrors,
      mirrorsArr: [],
    });
  };

  invalidLoc = (x, y) => {
    return (
      (x === 0 && y === 4) ||
      (x === 4 && y === 0) ||
      (x === 4 && y === 8) ||
      (x === 8 && y === 4) ||
      (x === 4 && y === 4) ||
      (x === 0 && y === 0) ||
      (x === 0 && y === 8) ||
      (x === 8 && y === 0) ||
      (x === 8 && y === 8)
    );
  };

  containsObj = (mirrors, { x, y }) => {
    for (let i = 0; i < mirrors.length; i++) {
      if (mirrors[i].x === x && mirrors[i].y === y) {
        return true;
      }
    }
    return false;
  };

  createMirrors = () => {
    let possibleMirrors = [];
    for (let i = 0; i < this.state.board.length; i++) {
      for (let j = 0; j < this.state.board[i].length; j++) {
        if (!this.invalidLoc(i, j)) {
          possibleMirrors.push({ x: i + 1, y: j + 1 });
        }
      }
    }
    let mirrorsArray = [];
    while (true) {
      let mirrorNearby = false;
      if (mirrorsArray.length === this.state.mirrors) {
        break;
      }
      let randomLoc = possibleMirrors[Math.floor(Math.random() * possibleMirrors.length)];
      for (let i of [-1, 1, 0]) {
        for (let j of [-1, 1, 0]) {
          if (this.containsObj(mirrorsArray, { x: randomLoc.x + i, y: randomLoc.y + j })) {
            mirrorNearby = true;
            break;
          }
        }
        if (mirrorNearby) {
          break;
        }
      }
      if (mirrorNearby) {
        continue;
      }
      mirrorsArray.push(randomLoc);
    }
    return mirrorsArray;
  };

  componentDidMount() {
    get("/api/checkGame", { _id: this.props.gameId })
      .then((data) => {
        if (data) {
          this.update(data);
          socket.on("updateBoard", (game) => {
            this.update(game);
          });
        }
        this.createMirrors();
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="Game-container u-flex u-flex-justifySpaceEvenly u-flex-alignCenter">
        <div className="info">
          <Info roomName={this.state.roomName} roomCode={this.state.roomCode} />
        </div>
        <div className="board">
          <GameBoard board={this.state.board} mirrors={this.createMirrors()} />
        </div>
        <div className="scores">
          <ScoreBoard players={this.state.players} />
        </div>
      </div>
    );
  }
}

export default Game;
