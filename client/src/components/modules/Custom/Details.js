import React, { Component } from "react";
import { get, post } from "../../../utilities";

import Card from "../Game/Card.js";
import Slideshow from "./Slideshow.js";

import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import errorTone from "../Game/message.mp3";
import won from "../Game/game_won.mp3";

import "./Details.css";

class Details extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
    };
  }

  updateNameDetails = (event) => {
    this.props.updateName(event);
    event.persist();
    this.setState({
      name: event.target.value,
    });
  };

  saveBoard = () => {
    const errorSound = new Audio(errorTone);
    const wonSound = new Audio(won);
    wonSound.volume = 0.2;
    const body = { name: this.state.name, board: this.props.board };
    post("/api/newBoard", body).then((res) => {
      if (res.message) {
        errorSound.play();
        alertify.alert("Error.", res.message);
      } else {
        wonSound.play();
        alertify.notify("Saved!", "custom", 3, function () {
          console.log("dismissed");
        });
      }
    });
  };

  render() {
    return (
      <div className="Details-container u-flex u-flex-justifyCenter u-flex-alignCenter">
        <div className="Details-body u-flexColumn u-flex-alignCenter">
          <Card field="Custom Boards" value="Instructions" />
          <div className="row-container u-flex">
            <div className="icon u-flex u-flex-justifyCenter u-flex-alignCenter">
              <Slideshow type={1} />
            </div>
            <div className="instructions-text u-flex u-flex-alignCenter u-flex-justifyCenter">
              Left-click on a tile to cycle between mirrors
            </div>
          </div>
          <div className="row-container u-flex">
            <div className="icon u-flex u-flex-justifyCenter u-flex-alignCenter">
              <Slideshow type={-1} />
            </div>
            <div className="instructions-text u-flex u-flex-alignCenter u-flex-justifyCenter">
              Right-click on a tile to cycle between walls
            </div>
          </div>
          <hr />
          <div className="row-container u-flexColumn u-flex-alignCenter">
            <label className="u-width u-textCenter u-inlineBlock">Board name:</label>
            <input
              className="Board-name-bar"
              id="board-name"
              type="text"
              onChange={this.updateNameDetails}
            ></input>
          </div>
          <div className="row-container u-flex u-flex-justifySpaceEvenly u-flex-alignCenter">
            <div className="u-button u-link" onClick={this.props.loadBoard}>
              Load
            </div>
            <div className="u-button u-link" onClick={this.saveBoard}>
              Save
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Details;
