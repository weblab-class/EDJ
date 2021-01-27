import React, { Component } from "react";

import Blank from "../modules/Custom/Blank.js";
import Details from "../modules/Custom/Details.js";

import { get } from "../../utilities.js";

import "./CustomBoard.css";
import alertify from "alertifyjs";
import errorTone from "../modules/Game/message.mp3";
import { navigate } from "@reach/router";

class CustomBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      board: [],
      name: "",
    };
  }

  componentDidMount() {
    let newBoard = Array(9)
      .fill()
      .map(() => Array(9).fill(0));
    this.setState({
      board: newBoard,
    });
    get("/api/user")
      .then((user) => {})
      .catch((err) => {
        alertify.alert("Error.", "You are not logged in.", () => {
          navigate("/");
        });
      });
  }

  cycle = (event, pos, val, editable) => {
    if (editable) {
      event.preventDefault();
      this.setState((prev) => {
        prev.board[pos.x][pos.y] = (prev.board[pos.x][pos.y] + val) % 3;
        return { board: prev.board };
      });
    }
    return false;
  };

  loadBoard = () => {
    const errorSound = new Audio(errorTone);
    if (this.state.name === "") {
      errorSound.play();
      alertify.alert("Error.", "Please input a board name.");
    } else {
      get("/api/getBoards")
        .then((boardsObj) => {
          const board = boardsObj.boards.filter((bd) => bd.name === this.state.name)[0];
          if (board) {
            console.log(board);
            const numBoard = board.board.map((row) => row.map((val) => Number(val)));
            this.setState({ board: numBoard });
          } else {
            alertify.alert("Error.", `There is no board named "${this.state.name}."`);
          }
        })
        .catch(console.log);
    }
  };

  updateName = (event) => {
    event.persist();
    this.setState({
      name: event.target.value,
    });
  };

  render() {
    return (
      <div className="blank-container u-flex u-flex-justifyCenter u-flex-alignCenter">
        <div className="holder u-flex u-flex-justifyCenter u-flex-alignCenter">
          <div className="blank">
            <Blank board={this.state.board} cycle={this.cycle} editable={true}/>
          </div>
          <div className="details">
            <Details
              board={this.state.board}
              userId={this.props.userId}
              loadBoard={this.loadBoard}
              updateName={this.updateName}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CustomBoard;
