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
    if (typeof this.props.playerNum === "number") {
      const playerClass = "down" + String(this.props.playerNum) + "small";
      return (
        <div className={this.isCurrentPlayer()}>
          <div className="Card-top-container">
            <div className="field-container u-flexColumn">
              <div className="player-name">{this.props.field}</div>
            </div>
            <div
              className={playerClass + " u-flexColumn u-flex-justifyCenter u-flex-alignCenter"}
            ></div>
          </div>
          <hr />
          <div className="Card-bottom-container u-flex-justifyCenter">
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
