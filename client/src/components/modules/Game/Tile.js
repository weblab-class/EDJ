import React, { Component } from "react";

import "./Tile.css";

class Tile extends Component {
  constructor(props) {
    super(props);
  }

  playerDirection = () => {
    if (!this.props.inputDirection) {
      return this.props.data;
    }
    console.log({ x: this.props.inputDirection.x, y: this.props.inputDirection.y });
    if (this.props.inputDirection.x === 0 && this.props.inputDirection.y === 1) {
      return "up";
    }
    if (this.props.inputDirection.x === 0 && this.props.inputDirection.y === -1) {
      return "down";
    }
    if (this.props.inputDirection.x === 1 && this.props.inputDirection.y === 0) {
      return "right";
    }
    if (this.props.inputDirection.x === -1 && this.props.inputDirection.y === 0) {
      return "left";
    }
  };

  render() {
    return (
      <div className="Tile-container u-flex u-flex-justifyCenter u-flex-alignCenter">
        <div className="Tile-body u-flex u-flex-justifyCenter u-flex-alignCenter">
          <div className={this.playerDirection()}></div>
        </div>
      </div>
    );
  }
}

export default Tile;
