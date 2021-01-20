import React, { Component } from "react";

import Card from "./Card.js";

import "./ScoreBoard.css";

class ScoreBoard extends Component {
  constructor(props) {
    super(props);
  }

  playerCards = () => {
    let cards = [];
    for (let i = 0; i < this.props.players.length; i++) {
      if (this.props.currentPlayer.id === this.props.players[i].id) {
        cards.push(
          <Card
            field={this.props.players[i].name}
            value={this.props.players[i].score}
            currentPlayer={true}
            playerNum={this.props.players.indexOf(this.props.players[i])}
            playerStyle={this.props.playerStyle}
          />
        );
      } else {
        cards.push(
          <Card
            field={this.props.players[i].name}
            value={this.props.players[i].score}
            playerNum={this.props.players.indexOf(this.props.players[i])}
            playerStyle={this.props.playerStyle}
          />
        );
      }
    }
    return cards;
  };

  render() {
    return (
      <div className="ScoreBoard-container">
        <div className="outer u-flexColumn u-flex-justifySpaceEvenly">{this.playerCards()}</div>
      </div>
    );
  }
}

export default ScoreBoard;
