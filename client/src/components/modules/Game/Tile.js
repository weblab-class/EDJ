import React, { Component } from "react";

import "./Tile.css";

class Tile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Tile-container u-flex u-flex-justifyCenter u-flex-alignCenter">
        <div className="Tile-body"></div>
      </div>
    );
  }
}

export default Tile;
