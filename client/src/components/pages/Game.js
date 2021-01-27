import React, { Component } from "react";
import { get } from "../../utilities.js";
import { post } from "../../utilities.js";
import { socket } from "../../client-socket.js";

import laser from "../modules/Game/laser.mp3";
import bounce from "../modules/Game/jump.mp3";
import won from "../modules/Game/game_won.mp3";
import alertTone from "../modules/Game/alert.mp3";
import errorTone from "../modules/Game/message.mp3";

import Info from "../modules/Game/Info.js";
import GameBoard from "../modules/Game/GameBoard.js";
import ScoreBoard from "../modules/Game/ScoreBoard.js";

import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

import "./Game.css";
import { Socket } from "socket.io-client";
import { navigate } from "@reach/router";

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
      playerStyle: "",
      rounds: 1,
      currRound: 1,
      gameOver: false,
    };
  }

  update = (data) => {
    if (data.currRound === data.rounds + 1) {
      this.setState({ board: data.board, players: data.players, isActive: data.isActive, gameOver: true});
      const maxScore = Math.max.apply(
        Math,
        data.players.map((player) => player.score)
      );
      const winners = data.players.filter((player) => player.score === maxScore);
      console.log(winners);
      post("/api/addWin", { winnersArr: winners })
        .then((user) => {
          let winnersStr = winners[0].name;
          for (const winner of winners.slice(1)) {
            winnersStr += " and " + winner.name;
          }
          alertify.alert("Game over.", winnersStr + " won the game!", () => {
            navigate("/");
          });
        })
        .catch(console.log);
    } else {
      this.setState({
        board: data.board,
        currentTurn: data.currentTurn,
        isActive: data.isActive,
        players: data.players,
        roomCode: data.roomCode,
        roomName: data.roomName,
        playerStyle: data.playerStyle,
        rounds: data.rounds,
        currRound: data.currRound,
        gameOver : false,
      });
    }
    console.log(data);
  };

  componentDidMount() {
    const errorSound = new Audio(errorTone);
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
      .catch((err) => {
        console.log(err);
        errorSound.play();
        alertify.alert("Error.", "Redirecting you to the Home Page.", () => {
          navigate("/");
        });
      });
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.movePlayer);
  }

  updateDirection = (board, location, direction) => {
    const i = location.i;
    const j = location.j;
    const x = direction.x;
    const y = direction.y;
    board[i][j].inputDirection = { x, y };
    return board;
  };

  movePlayer = (event) => {
    const moveSound = new Audio(bounce);
    const laserSound = new Audio(laser);
    const wonGame = new Audio(won);
    const alertSound = new Audio(alertTone);
    moveSound.volume = 0.15;
    laserSound.volume = 0.5;
    wonGame.volume = 0.2;
    alertSound.volume = 0.3;
    const player = this.state.players.filter((player) => this.props.userId === player.id)[0];
    if (event.key === " " && player.id === this.state.players[this.state.currentTurn].id) {
      this.setState({ isMoving: true });
      post("/api/laser", {
        id: this.props.gameId,
        dir: this.state.board[player.location.x][player.location.y].inputDirection,
      })
        .then((res) => {
          console.log("Pew");
          laserSound.play();
        })
        .catch(console.log);
      return null;
    } else if (event.key === " " && player.id !== this.state.players[this.state.currentTurn].id) {
      alertSound.play();
      alertify.notify("Not your turn!", "custom", 3, function () {
        console.log("dismissed");
      });
    } else {
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
                if (game.message === "Round won.") {
                  wonGame.play();
                  alertify.notify("You won the round!", "custom", 3, function () {
                    console.log("dismissed");
                  });
                } else {
                  alertSound.play();
                  alertify.notify(game.message, "custom", 3, function () {
                    console.log("dismissed");
                  });
                }
              } else {
                moveSound.play();
              }
            })
            .catch(console.log);
        } else {
          this.setState({
            board: this.updateDirection(this.state.board, { i: x, j: y }, direction),
          });
        }
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
            playerStyle={this.state.playerStyle}
            currRound={this.state.currRound}
            rounds={this.state.rounds}
          />
        </div>
        <div className="board">
          <GameBoard
            board={this.state.board}
            playerN={this.getPlayerN()}
            playerStyle={this.state.playerStyle}
          />
        </div>
        <div className="scores">
          <ScoreBoard
            players={this.state.players}
            currentPlayer={this.state.players[this.state.currentTurn]}
            playerStyle={this.state.playerStyle}
          />
        </div>
        <Confetti
        run = {this.state.gameOver}
      width={1200}
      height={500}
      colors = {['#f8b4b4','#f79494','#ffe9e9','#ffe9a1','#ffd752','#f8c82a',"#ffffff"]}
    />
      </div>
    );
  }
}

export default Game;
