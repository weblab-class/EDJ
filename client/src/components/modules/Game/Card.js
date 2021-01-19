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
    return (
      <div className={this.isCurrentPlayer()}>
        <div className="field">{this.props.field}</div>
        <hr />
        <div className="value">{this.props.value}</div>
      </div>
    );
  }
}

export default Card;
