import React, { Component } from "react";
import Logo from"./playerIcon.png";

import "./HowToPlay.css"


class HowToPlay extends Component {
    constructor(props) {
        super(props)

        this.state = {
            orientation: "down",
        }
    }

    buttonClickUp = (event)  => {this.setState({orientation: "up"})}
    buttonClickDown = (event)  => {this.setState({orientation: "down"})}
    buttonClickRight = (event)  => {this.setState({orientation: "right"})}
    buttonClickLeft = (event)  => {this.setState({orientation: "left"})}
    
    render() {
        return (
            <div>
                <div className="title1">How to Play</div>
                <div className="instruction-box-container u-flex u-flex-justifyCenter u-flex-alignCenter">
                    <div className="instruction-box">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam egestas luctus lectus quis tempus. Quisque ullamcorper blandit enim in vulputate. Donec non justo fringilla, facilisis nisi vitae, aliquam odio.
                    </div>
                </div>
                <div className="title2">Controls</div>
                <div className="info u-flex u-flex-justifySpaceEvenly">
                    <div className="control-box">
                        Test controls by clicking keys
                        <div className = "u-flex">
                            <div className="u-flexColumn">    
                                <button className="key" onClick={this.buttonClickUp}>  ᐃ </button>
                                <button className="key" onClick={this.buttonClickDown}>  ᐁ  </button>
                            </div>
                            <div className="u-flexColumn">
                                <p>up</p>
                                <p>down</p>
                            </div>
                            <div className="u-flexColumn">
                                <button className="key" onClick={this.buttonClickLeft}>  ᐊ </button>
                                <button className="key" onClick={this.buttonClickRight}>  ᐅ </button>
                            </div>
                            <div className="u-flexColumn">
                                <p>left</p>
                                <p>right</p>
                            </div>
                        </div>
                        <div className="u-flex">
                            <button className="key"onKeyPress={this.buttonClick}>[   SPACE   ]</button>
                            <p>shoot</p>
                        </div>
                    </div>
                    <div className="player-container">
                        <div className={this.state.orientation}></div>
                    </div>
                    {/* <img className="player" src="https://www.pokencyclopedia.info/sprites/overworlds/o_hgss/o_hs_149_1.png" /> */}
                </div>
            </div>
        )
    }
}

export default HowToPlay;