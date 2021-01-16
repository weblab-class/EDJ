import React, { Component } from "react";

import "./Tile.css";

class Tile extends Component {
  constructor(props) {
    super(props);
  }

  checkClass = () => {
    let tileClass = "";
    if (this.props.isHorWall) {
      tileClass = "Hor-wall";
    }
    if (this.props.isVertWall) {
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
