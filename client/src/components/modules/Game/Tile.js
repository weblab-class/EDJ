import React, { Component } from "react";

import "./Tile.css";

class Tile extends Component {
  constructor(props) {
    super(props);
  }

  playerDirection = () => {
    const playerNum = this.props.data.charAt(this.props.data.length - 1);
    let tileClass;
    // not a player tile
    if (!this.props.direction) {
      if (this.props.data === "goal" && this.props.playerStyle === "pokemon") {
        return "pokeball";
      } else if (this.props.data === "goal" && this.props.playerStyle === "popsicle") {
        return "flag";
      } else {
        return this.props.data;
      }
    }
    if (this.props.direction.x === 0 && this.props.direction.y === 1) {
      tileClass = this.props.playerStyle + "_up" + playerNum;
    }
    if (this.props.direction.x === 0 && this.props.direction.y === -1) {
      tileClass = this.props.playerStyle + "_down" + playerNum;
    }
    if (this.props.direction.x === 1 && this.props.direction.y === 0) {
      tileClass = this.props.playerStyle + "_right" + playerNum;
    }
    if (this.props.direction.x === -1 && this.props.direction.y === 0) {
      tileClass = this.props.playerStyle + "_left" + playerNum;
    }
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
