import React, { Component } from "react";
import { Link } from "@reach/router";

import Card from "./Card.js";
import PlayerTurn from "./PlayerTurn.js";

import "./Info.css";
import { post } from "../../../utilities.js";

class Info extends Component {
  constructor(props) {
    super(props);
  }

  startGame = () => {
    post("/api/startGame", { id: this.props.gameId });
  };

  componentDidMount = () => {};

  displayLogic = () => {
    if (!this.props.gameData.isActive) {
      if (this.props.gameData.players.length > 1) {
        if (this.props.gameData.players[0].id == this.props.userId) {
          return (
            <div className="start u-link" onClick={this.startGame}>
              Start
            </div>
          );
        } else {
          return <div className="text">Waiting for host to start the game</div>;
        }
      } else {
        return <div className="text">Waiting for more players to join</div>;
      }
    } else {
      return (
        <PlayerTurn
          players={this.props.gameData.players}
          currentPlayer={this.props.gameData.players[this.props.gameData.currentTurn]}
          viewPlayerId={this.props.userId}
          playerStyle={this.props.playerStyle}
        ></PlayerTurn>
      );
    }
  };

  render() {
    return (
      <div className="Info-container">
        <div className="Room-info u-flex-justifySpaceEvenly">
          <Card field="Room Name" value={this.props.roomName} />
          <Card field="Room Code" value={this.props.roomCode} />
        </div>
        <div className="status-container u-flex-justifySpaceEvenly">{this.displayLogic()}</div>
      </div>
    );
  }
}

export default Info;
