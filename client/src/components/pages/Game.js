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
      mirrors: 0,
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
    console.log(this.state.players);
  };

  componentDidMount() {
    window.addEventListener("keydown", this.movePlayer);
    get("/api/checkGame", { _id: this.props.gameId })
      .then((data) => {
        if (data) {
          this.update(data);
          socket.on("updateBoard", (game) => {
            this.update(game);
            console.log(game);
          });
        }
      })
      .catch((err) => console.log(err));
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.movePlayer);
  }

  updateDirection = (board, { i, j }, { x, y }) => {
    board[i][j].inputDirection = { x, y };
    return board;
  };

  movePlayer = (event) => {
    const player = this.state.players.filter((player) => this.props.userId === player.id)[0];
    if (event.key === " " && player.id === this.state.players[this.state.currentTurn].id) {
      post("/api/laser", {
        id: this.props.gameId,
        dir: this.state.board[player.location.x][player.location.y].inputDirection,
      })
        .then((res) => console.log("Pew"))
        .catch(console.log);
      return null;
    }
    const x = player.location.x;
    const y = player.location.y;
    const direction_x = this.state.board[x][y].inputDirection.x;
    const direction_y = this.state.board[x][y].inputDirection.y;
    const up = { x: 0, y: 1 };
    const down = { x: 0, y: -1 };
    const right = { x: 1, y: 0 };
    const left = { x: -1, y: 0 };
    let direction = { x: 0, y: 0 };
    if (event.key === "ArrowUp") {
      direction = up;
    } else if (event.key === "ArrowDown") {
      direction = down;
    } else if (event.key === "ArrowRight") {
      direction = right;
    } else if (event.key === "ArrowLeft") {
      direction = left;
    }
    if (!(direction.x === 0 && direction.y === 0)) {
      if (direction_x === direction.x && direction_y === direction.y && this.state.isActive) {
        post("/api/movePlayer", { roomCode: this.state.roomCode, direction: direction })
          .then((game) => {
            if (typeof game.message === "string") {
              if (game.message === "Game over.") {
                if (this.props.userId === player.id) {
                  alert("You won!");
                }
              } else {
                alert(game.message);
              }
            }
          })
          .catch(console.log);
      } else {
        this.setState({
          board: this.updateDirection(this.state.board, { i: x, j: y }, direction),
        });
      }
    }
  };

  getPlayerN = () => {
    for (let i = 0; i < this.state.players.length; i++) {
      if (this.state.players[i].id === this.props.userId) {
        return i;
      }
    }
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
          <GameBoard board={this.state.board} playerN={this.getPlayerN()} />
        </div>
        <div className="scores">
          <ScoreBoard
            players={this.state.players}
            currentPlayer={this.state.players[this.state.currentTurn]}
          />
        </div>
      </div>
    );
  }
}

export default Game;
