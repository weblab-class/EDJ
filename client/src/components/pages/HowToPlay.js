import React, { Component } from "react";
import Logo from "./playerIcon.png";

import "./HowToPlay.css";

class HowToPlay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orientation: "down",
      playerStyle: "pokemon",
    };
  }

  componentDidMount = () => {
    window.addEventListener("keydown", this.handleButton);
  };

  componentWillUnmount = () => {
    window.removeEventListener("keydown", this.handleButton);
  };

  isClicked = (playerStyle) => {
    if (this.state.playerStyle === playerStyle) {
      return "popsicle-containerClicked-play";
    } else {
      return "popsicle-container-play";
    }
  };

  handleButton = (event) => {
    if (event.key === "ArrowUp") {
      this.buttonClickUp(event);
    }
    if (event.key === "ArrowDown") {
      this.buttonClickDown(event);
    }
    if (event.key === "ArrowLeft") {
      this.buttonClickLeft(event);
    }
    if (event.key === "ArrowRight") {
      this.buttonClickRight(event);
    }
  };

  buttonClickUp = (event) => {
    this.setState({ orientation: "up" });
  };
  buttonClickDown = (event) => {
    this.setState({ orientation: "down" });
  };
  buttonClickRight = (event) => {
    this.setState({ orientation: "right" });
  };
  buttonClickLeft = (event) => {
    this.setState({ orientation: "left" });
  };

  isPopsicle = (event) => {
    event.persist();
    this.setState({ playerStyle: "popsicle" });
  };

  isPokemon = (event) => {
    event.persist();
    this.setState({ playerStyle: "pokemon" });
  };

  render() {
    return (
      <div>
        <div className="title1">How to Play</div>
        <div className="instruction-box-container u-flex u-flex-justifyCenter u-flex-alignCenter">
          <div className="instruction-box">
            Trickshot is a 2-4 player, turn-based game. You may either host a game or join a game
            using a code, but you must be logged in before doing either. By hosting a game, you can
            choose the name of your game room and the number of mirrors on your game board. Once the
            game starts, the ordering of the players is randomly generated.
            <ol>
              <li>
                Press the arrow keys to rotate your player. You may do this both during your turn
                and other players' turns.
              </li>
              <li>
                Press the arrow key of the direction you are facing to move in that direction. You
                may only do this during your turn.
              </li>
              <li>
                Press the spacebar to shoot a laser. You can shoot other players directly, or by
                reflecting off of mirror(s) at 90 degree angles.
              </li>
              <li>Get to the goal (center of the game board) without dying to win the game.</li>
            </ol>
          </div>
        </div>
    <div className = "bottom-half-box">
        <div className="title2">Controls</div>
        <div className="infoP u-flex u-flex-alignSpaceAround">
          <div className="control-box u-flexColumn">
            Test controls by clicking keys
            <div className="u-flex">
              <div className="u-flexColumn">
                <button className="key" onClick={this.buttonClickUp}>
                  {" "}
                  ᐃ{" "}
                </button>
                <button className="key" onClick={this.buttonClickDown}>
                  {" "}
                  ᐁ{" "}
                </button>
              </div>
              <div className="u-flexColumn">
                <p>up</p>
                <p>down</p>
              </div>
              <div className="u-flexColumn">
                <button className="key" onClick={this.buttonClickLeft}>
                  {" "}
                  ᐊ{" "}
                </button>
                <button className="key" onClick={this.buttonClickRight}>
                  {" "}
                  ᐅ{" "}
                </button>
              </div>
              <div className="u-flexColumn">
                <p>left</p>
                <p>right</p>
              </div>
            </div>
            <div className="u-flex">
              <button className="key" onKeyPress={this.buttonClick}>
                [ SPACE ]
              </button>
              <p>shoot</p>
            </div>
          </div>
               
        <div className = "u-flexColumn">
          <div className="player-container ">
            <div className={this.state.playerStyle + "_" + this.state.orientation + "0"}></div>
          </div>
          <div className="choose-container u-flex-justifySpaceEvenly">
            <label id="choose-player">Choose Player:</label>
            <div
              className={this.isClicked("popsicle") + " u-link "}
              onClick={this.isPopsicle}
            >
              <div className="popsicle_1"></div>
            </div>
            <div
              className={this.isClicked("pokemon") + " u-link "}
              onClick={this.isPokemon}
            >
              <div className="pokemon_1"></div>
            </div>
          </div>
          </div>
          </div>
          </div>
        
      </div>
    );
  }
}

export default HowToPlay;
