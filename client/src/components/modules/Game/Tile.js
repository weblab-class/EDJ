import React, { Component } from "react";

import "./Tile.css";
import cave from "./tileImg.png";

class Tile extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='Tile-container u-flex u-flex-justifyCenter u-flex-alignCenter'>
                <div className='Tile-body'></div>
                {/* <img className='Tile-body' src={cave} alt="No"/> */}
            </div>
        )
    }
}

export default Tile;