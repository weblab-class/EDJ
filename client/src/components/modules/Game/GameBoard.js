import React, { Component } from "react";

import Tile from "./Tile.js";
import "./GameBoard.css";

class GameBoard extends Component {
  constructor(props) {
    super(props);
  }

  createTiles = () => {
    let tiles = [];
    for (let i = 0; i < this.props.board.length; i++) {
      for (let j = 0; j < this.props.board[i].length; j++) {
        tiles.push(<Tile pos={{ x: i + 1, y: j + 1 }} data={this.props.board[i][j]} />);
      }
    }
    return tiles;
  };

  render() {
    return <div className="GameBoard-container">{this.createTiles()}</div>;
  }
}

export default GameBoard;
