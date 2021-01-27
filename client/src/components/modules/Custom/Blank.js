import React, { Component } from "react";

import BlankTile from "./BlankTile.js";
import "./Blank.css";

class Blank extends Component {
  constructor(props) {
    super(props);
  }

  createTiles = () => {
    let tiles = [];
    for (let i = 0; i < this.props.board.length; i++) {
      for (let j = 0; j < this.props.board[i].length; j++) {
        tiles.push(
          <BlankTile
            key={this.props.board[i].length * i + j}
            pos={{ x: i, y: j }}
            data={this.props.board[i][j]}
            cycle={this.props.cycle}
            editable={this.props.editable}
          />
        );
      }
    }
    return tiles;
  };

  render() {
    return <div className="board-container">{this.createTiles()}</div>;
  }
}

export default Blank;
