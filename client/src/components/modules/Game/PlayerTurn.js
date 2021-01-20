import React, { Component } from "react";

import "./PlayerTurn.css";

class PlayerTurn extends Component {
  constructor(props) {
    super(props);
  }

  isCurrPlayer = () => {
    if (this.props.viewPlayerId === this.props.currentPlayer.id) {
      return "Your turn";
    } else {
      return this.props.currentPlayer.name + `'s turn`;
    }
  };

  playerImg = () => {
    const playerNum = this.props.players.indexOf(this.props.currentPlayer);
    return this.props.playerStyle + "_down_" + String(playerNum);
  };

  render() {
    return (
      <div className="turn-container">
        <div className="turn-outer u-flexColumn u-flex-justifySpaceEvenly">
          <div className="img-container">
            <div className={this.playerImg()}></div>
          </div>
          <hr></hr>
          <div className="text-container">
            <div className="text-style">{this.isCurrPlayer()}</div>
          </div>
        </div>
      </div>
    );
  }
}
export default PlayerTurn;
