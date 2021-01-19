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
    window.addEventListener("keydown", this.movePlayer);
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

  isValid = (space) => {
    let bounds = (space.x >= 0 && space.x <= 8 && space.y >= 0 && space.y <= 8);
    if (!bounds) {return false}
    let wall = (this.state.board[space.x][space.y].tileType !== "Vert-wall" && this.state.board[space.x][space.y].tileType !== "Hor-wall");
    let player = this.state.board[space.x][space.y].tileType !== "Player";
    return bounds && wall && player;
  }

  fire = (pos, dir) => {
    let sum = (p, d) => {return {x: p.x - d.y, y: p.y + d.x}};
    let leftMirror = (v) => {return {x: v.y, y: v.x}}
    let rightMirror = (v) => {return {x: -v.y, y: -v.x}}
    let path = [pos];
    let newSpace = sum(path[0], dir)
    while (this.isValid(newSpace)) {
      console.log(path);
      if (this.state.board[newSpace.x][newSpace.y].tileType === "Right-mirror") {
        dir = rightMirror(dir);
      }
      else if (this.state.board[newSpace.x][newSpace.y].tileType === "Left-mirror") {
        dir = leftMirror(dir)
      }
      path.push(newSpace);
      newSpace = sum(newSpace, dir);
    }
    console.log(path);
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
    if (event.key === " ") {
      this.fire(player.location, this.state.board[player.location.x][player.location.y].inputDirection);
      //return null;
    }
    const x = player.location.x;
    const y = player.location.y;
    console.log(this.state);
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
            console.log(game.board);
            if (typeof game.message === "string") {
              alert(game.message);
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
    for (let i = 0; i < this.state.players.length;i++) {
      if (this.state.players[i].id === this.props.userId) {
        return i
      }
    }
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
          <GameBoard board={this.state.board} playerN={this.getPlayerN()}/>
        </div>
        <div className="scores">
          <ScoreBoard players={this.state.players} />
        </div>
      </div>
    );
  }
}

export default Game;
