import React, { Component } from "react";
import { get, post } from "../../../utilities.js";

import Card from "../Game/Card.js"
import Slideshow from "./Slideshow.js"

import "./Details.css";

class Details extends Component {
  constructor(props) {
    super(props);

    this.state = {
        name: "",
    }
  }

  updateName = (event) => {
      event.persist();
      this.setState({
          name: event.target.value,
      })
  }

  saveBoard = () => {
      post("/api/newBoard").then((res) => {
          alert(res.message)
      })
  }

  render() {
    return (
        <div className="Details-container u-flex u-flex-justifyCenter u-flex-alignCenter">
            <div className="Details-body u-flexColumn u-flex-alignCenter">
                {/* <Card field="Custom Boards" value="Hi" /> */}
                {/*<div className="row-container u-flex">
                    <div className="icon u-flex u-flex-justifyCenter u-flex-alignCenter">
                        <Slideshow type={1} />
                    </div>
                    <div className="u-height">Left-click on a tile to cycle between mirrors</div>
                </div>
                <div className="row-container u-flex">
                    <div className="icon u-flex u-flex-justifyCenter u-flex-alignCenter">
                        <Slideshow type={-1} />
                    </div>
                    <div className="u-height">Right-click on a tile to cycle between walls</div>
                </div>*/}
                <div className="row-container u-flexColumn u-flex-alignCenter">
                    <label className="u-width u-textCenter u-inlineBlock">Board name:</label>
                    <input
                        className="Board-name-bar"
                        id="board-name"
                        type="text"
                        onChange={this.updateName}
                    ></input>
                </div>
                <div className="row-container u-flex u-flex-justifySpaceEvenly u-flex-alignCenter">
                    <div className="u-button u-link">Load</div>
                    <div className="u-button u-link" onClick={this.saveBoard}>Save</div>
                </div>
            </div>
        </div>
    );
  }
}

export default Details;
