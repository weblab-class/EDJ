import React, { Component } from "react";

import "./Card.css";

class Card extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="Card-container">
                <div className="field">{this.props.field}</div>
                <hr/>
                <div className="value">{this.props.value}</div>
            </div>
        )
    }
}

export default Card;