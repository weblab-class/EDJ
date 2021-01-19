import React, { Component } from "react";

import "./Card.css";

class Card extends Component {
  constructor(props) {
    super(props);
  }

  isCurrentPlayer = () => {
    if (this.props.currentPlayer) {
      return "field-bold";
    } else {
      return "field";
    }
  };

  render() {
    return (
      <div className="Card-container">
        <div className={this.isCurrentPlayer()}>{this.props.field}</div>
        <hr />
        <div className="value">{this.props.value}</div>
      </div>
    );
  }
}

export default Card;
