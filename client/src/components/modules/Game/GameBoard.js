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
  containsObj = (mirrors, { x, y }) => {
    for (let i = 0; i < mirrors.length; i++) {
      if (mirrors[i].x === x && mirrors[i].y === y) {
        return true;
      }
    }
    return false;
  };

  createMirrors = () => {
    let possibleMirrors = [];
    for (let i = 0; i < this.props.board.length; i++) {
      for (let j = 0; j < this.props.board[i].length; j++) {
        if (!this.invalidLoc(i, j)) {
          possibleMirrors.push({ x: i + 1, y: j + 1 });
        }
      }
    }
    let mirrorsArr = [];
    while (true) {
      let mirrorNearby = false;
      if (mirrorsArr.length === this.props.mirrors) {
        break;
      }
      let randomLoc = possibleMirrors[Math.floor(Math.random() * possibleMirrors.length)];
      for (let i of [-1, 1, 0]) {
        for (let j of [-1, 1, 0]) {
          if (this.containsObj(mirrorsArr, { x: randomLoc.x + i, y: randomLoc.y + j })) {
            mirrorNearby = true;
            break;
          }
        }
        if (mirrorNearby) {
          break;
        }
      }
      if (mirrorNearby) {
        continue;
      }
      mirrorsArr.push(randomLoc);
    }
    console.log(mirrorsArr);
    return mirrorsArr;
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
