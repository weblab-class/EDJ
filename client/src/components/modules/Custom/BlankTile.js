import React, { Component } from "react";

import "./BlankTile.css";

class BlankTile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inValids: [
        { x: 0, y: 0 },
        { x: 0, y: 8 },
        { x: 8, y: 0 },
        { x: 8, y: 8 },
        { x: 4, y: 4 },
      ],
    };
  }

  isEditable = () => {
    return (
      this.state.inValids.filter((loc) => loc.x === this.props.pos.x && loc.y === this.props.pos.y)
        .length === 0
    );
  };

  getType = () => {
    switch (this.props.data) {
      case -2:
        return "Vert-wall";
      case -1:
        return "Hor-wall";
      case 0:
        return "";
      case 1:
        return "Left-mirror";
      case 2:
        return "Right-mirror";
    }
  };

  properTile = () => {
      if (this.props.editable) {
          return (<div
            className={(this.isEditable() ? (this.props.editable ? "allowed " : "") : "NA ") + "blankTile-body u-flex u-flex-justifyCenter u-flex-alignCenter"}
            onClick={(e) => this.props.cycle(e, this.props.pos, 1, this.isEditable())}
            onContextMenu={(e) => this.props.cycle(e, this.props.pos, -1, this.isEditable())}
          ><div className={this.getType()}></div></div>)
      }
      else {
          return (<div
            className={(this.isEditable() ? (this.props.editable ? "allowed " : "") : "NA ") + "blankTile-body u-flex u-flex-justifyCenter u-flex-alignCenter"}
          ><div className={this.getType()}></div></div>)
      }
  }

  render() {
    return (
      <div className="blankTile-container u-flex u-flex-justifyCenter u-flex-alignCenter">
        {this.properTile()}
      </div>
    );
  }
}

export default BlankTile;
