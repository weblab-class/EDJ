import React, { Component } from "react";

import "./Tile.css";
import art from "./Untitled_Artwork-1.png";

class Tile extends Component {
  constructor(props) {
    super(props);
  }

  playerDirection = () => {
    if (!this.props.direction) {
      return this.props.data;
    }
    if (this.props.direction.x === 0 && this.props.direction.y === 1) {
      return "up" + String(this.props.playerN);
    }
    if (this.props.direction.x === 0 && this.props.direction.y === -1) {
      return "down" + String(this.props.playerN);
    }
    if (this.props.direction.x === 1 && this.props.direction.y === 0) {
      return "right" + String(this.props.playerN);
    }
    if (this.props.direction.x === -1 && this.props.direction.y === 0) {
      return "left" + String(this.props.playerN);
    }
  };

  doLight = () => {
    if (this.props.isLit) {
      return "lit "
    }
    else {
      return "full "
    }
  }

  render() {
    return (
      <div className="Tile-container u-flex u-flex-justifyCenter u-flex-alignCenter">
        <div className="Tile-body u-flex u-flex-justifyCenter u-flex-alignCenter">
          <div className={this.doLight() + "u-flex u-flex-justifyCenter u-flex-alignCenter"}>
            <div className={this.playerDirection()}></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Tile;
