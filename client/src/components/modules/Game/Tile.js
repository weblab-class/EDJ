import React, { Component } from "react";

import "./Tile.css";

class Tile extends Component {
  constructor(props) {
    super(props);
  }

  containsObj = ({ x, y }) => {
    for (let i = 0; i < this.props.mirrors.length; i++) {
      if (this.props.mirrors[i].location.x === x && this.props.mirrors[i].location.y === y) {
        return this.props.mirrors[i];
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
    let inMirror = this.containsObj({ x: i, y: j });
    if (inMirror) {
      const leftMirror = inMirror.leftMirror;
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
        <div className="Tile-body u-flex u-flex-justifyCenter u-flex-alignCenter">
          <div className={this.checkClass()}></div>
        </div>
      </div>
    );
  }
}

export default Tile;
