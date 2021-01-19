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
        tiles.push(
          <Tile
            key={this.props.board[i].length * i + j}
            pos={{ x: i, y: j }}
            data={this.props.board[i][j].tileType}
            direction={this.props.board[i][j].inputDirection}
            playerN={this.props.playerN}
            isLit = {this.props.board[i][j].isLit}
          />
        );
      }
    }
    return tiles;
  };

  render() {
    return <div className="GameBoard-container">{this.createTiles()}</div>;
  }
}

export default GameBoard;
