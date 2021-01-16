import React, { Component } from "react";
import { Link } from "@reach/router";

import Card from "./Card.js";

import "./Info.css";

class Info extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="Info-container">
                <div className="Room-info u-flexColumn u-flex-justifySpaceEvenly">
                    <Card field="Room Name" value={this.props.roomName} />
                    <Card field="Room Code" value={this.props.roomCode} />
                </div>
                <div className="status-container u-flexColumn u-flex-justifySpaceEvenly">
                    <Link to="/" className="start u-link">Start</Link>
                </div>
            </div>
        )
    }
}

export default Info;