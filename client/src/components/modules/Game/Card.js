import React, { Component } from "react";

import "./Card.css";

class Card extends Component {
  constructor(props) {
    super(props);
  }

  isCurrentPlayer = () => {
    if (this.props.currentPlayer) {
      return "Card-container-currPlayer";
    } else {
      return "Card-container";
    }
  };

  render() {
    if (this.props.playerNum) {
      const playerClass = "down" + String(this.props.playerNum) + "down";
      return (
        <div className={this.isCurrentPlayer()}>
          <div className="Card-top-container">
            <div className="field-container">{this.props.field}</div>
            <div className="player-container"></div>
          </div>
          <hr />
          <div className="Card-bottom-container">
            <div className="value">{this.props.value}</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={this.isCurrentPlayer()}>
          <div className="field">{this.props.field}</div>
          <hr />
          <div className="value">{this.props.value}</div>
        </div>
      );
    }
  }
}

export default Card;
