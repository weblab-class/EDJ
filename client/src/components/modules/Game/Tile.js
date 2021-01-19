import React, { Component } from "react";

import "./Tile.css";
import art from "./Untitled_Artwork-1.png";

class Tile extends Component {
  constructor(props) {
    super(props);
  }

  playerDirection = () => {
    const playerNum = this.props.data.charAt(this.props.data.length - 1);
    console.log(playerNum);
    let tileClass;
    if (!this.props.direction) {
      return this.props.data;
    }
    if (this.props.direction.x === 0 && this.props.direction.y === 1) {
      tileClass = "up" + playerNum;
    }
    if (this.props.direction.x === 0 && this.props.direction.y === -1) {
      tileClass = "down" + playerNum;
    }
    if (this.props.direction.x === 1 && this.props.direction.y === 0) {
      tileClass = "right" + playerNum;
    }
    if (this.props.direction.x === -1 && this.props.direction.y === 0) {
      tileClass = "left" + playerNum;
    }
    console.log(tileClass);
    return tileClass;
  };

  doLight = () => {
    if (this.props.isLit) {
      return "lit ";
    } else {
      return "full ";
    }
  };

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
