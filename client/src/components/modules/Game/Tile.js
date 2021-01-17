import React, { Component } from "react";

import "./Tile.css";

class Tile extends Component {
  constructor(props) {
    super(props);
  }

  containsObj = ({ x, y }) => {
    for (let i = 0; i < this.props.mirrors.length; i++) {
      if (this.props.mirrors[i].x === x && this.props.mirrors[i].y === y) {
        return true;
      }
    }
    return false;
  };

  checkClass = () => {
    let mirrors = this.props.mirrors;
    let tileClass = "";
    const i = this.props.pos.x;
    const j = this.props.pos.y;
    if ((i === 5 && j === 1) || (i === 5 && j === 9)) {
      tileClass = "Hor-wall";
    } else if ((i === 1 && j === 5) || (i === 9 && j === 5)) {
      tileClass = "Vert-wall";
    }
    if (this.containsObj({ x: i, y: j })) {
      // randomly chooses if mirror is left or right-facing
      const leftMirror = Math.floor(Math.random() * 2) === 0;
      if (leftMirror) {
        tileClass = "Left-mirror";
      } else {
        tileClass = "Right-mirror";
      }
    }
    return tileClass;
  };

  render() {
    return (
      <div className="Tile-container u-flex u-flex-justifyCenter u-flex-alignCenter">
        <div className="Tile-body">
          <div className={this.checkClass()}></div>
        </div>
      </div>
    );
  }
}

export default Tile;
