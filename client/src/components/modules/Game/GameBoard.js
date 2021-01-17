import React, { Component } from "react";

import Tile from "./Tile.js";
import "./GameBoard.css";

class GameBoard extends Component {
  constructor(props) {
    super(props);
  }

  // character starting location, wall location, or goal location
  invalidLoc = (x, y) => {
    return (
      (x === 0 && y === 4) ||
      (x === 4 && y === 0) ||
      (x === 4 && y === 8) ||
      (x === 8 && y === 4) ||
      (x === 4 && y === 4) ||
      (x === 0 && y === 0) ||
      (x === 0 && y === 8) ||
      (x === 8 && y === 0) ||
      (x === 8 && y === 8)
    );
  };

  createMirrors = () => {
    let possibleMirrors = [];
    for (let i = 0; i < this.props.board.length; i++) {
      for (let j = 0; j < this.props.board[i].length; j++) {
        if (!this.invalidLoc(i, j)) {
          possibleMirrors.push({ x: i + 1, y: j + 1 });
        }
      }
      console.log(possibleMirrors);
    }
    let mirrors = [];
    let numMirrors = 0;
    while (true) {
      if (numMirrors === this.props.mirrors) {
        break;
      }
      let randomLoc = 0;
      while (!mirrors.includes(randomLoc)) {
        randomLoc = possibleMirrors[Math.floor(Math.random() * possibleMirrors.length)];
        mirrors.push(randomLoc);
        numMirrors += 1;
      }
    }
    return mirrors;
  };

  createTiles = () => {
    let tiles = [];
    let mirrors = this.createMirrors();
    for (let i = 0; i < this.props.board.length; i++) {
      for (let j = 0; j < this.props.board[i].length; j++) {
        tiles.push(
          <Tile pos={{ x: i + 1, y: j + 1 }} data={this.props.board[i][j]} mirrors={mirrors} />
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
