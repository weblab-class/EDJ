import React, { Component } from "react";

import "./Tile.css";

class Tile extends Component {
  constructor(props) {
    super(props);
  }

  checkClass = () => {
    let tileClass = "";
    const i = this.props.pos.x;
    const j = this.props.pos.y;
    if ((i === 5 && j === 1) || (i === 5 && j === 9)) {
      tileClass = "Hor-wall";
    } else if ((i === 1 && j === 5) || (i === 9 && j === 5)) {
      tileClass = "Vert-wall";
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
