import React, { Component } from "react";
import Logo from"./playerIcon.png";

import "./HowToPlay.css"


class HowToPlay extends Component {
    constructor(props) {
        super(props)
    }
buttonClick = (event) => {
    console.log(event.key);
    console.log(event.target);
      }
    
    render() {
        return (
          
         <div className="u-inlineBlock">
            <div className="title1">How to Play</div>
            <div className="instruction-box">
            instructions for game...more words...does this still work? I will keep
            writing words and hopefully the box will grow assdbaisjfdabsifjbasf
            asfsakjfbasjfbaskdasdkajsdkasjndalskdnalsdnaslkdnaslkdansd
            asjdkasbdkjasdkjandalsndlsandlsakdnalkdnaslkdnapsdasd
            </div>
            <div className="title2">Controls</div>

<div className="flexRow">
    <div className="flexColumn">
            <div className="control-box">
                Test controls by clicking keys
    <div className = "flexRow">
            <div className="flexColumn">
            
                <button className="key" onKeyPress={this.buttonClick}>  ᐃ </button>
                <button className="key" onKeyPress={this.buttonClick}>  ᐁ  </button>
                </div>
            <div className="flexColumn">
                <p>up</p>
                <p>down</p>
            </div>
            <div className="flexColumn">
                <button className="key" onKeyPress={this.buttonClick}>  ᐊ </button>
                <button className="key" onKeyPress={this.buttonClick}>  ᐅ </button>
            </div>
            <div className="flexColumn">
                <p>left</p>
                <p>right</p>
            </div>
        </div>

            <div className="flexRow">
                <button className="key"onKeyPress={this.buttonClick}>[   SPACE   ]</button>
                <p>shoot</p>
            </div>
        </div>

        </div>
    <div className="flexRow">
          <img src={Logo}/>
        </div>
     
      
        </div>
        </div>
        )
    }
}

export default HowToPlay;