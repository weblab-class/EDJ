import React, { Component } from "react";

import Blank from "../modules/Custom/Blank.js"
import Details from "../modules/Custom/Details.js"

import "./CustomBoard.css"

class CustomBoard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            board: [],
        }
    }

    componentDidMount() {
        let newBoard = Array(9).fill().map(() => Array(9).fill(0));
        this.setState({
            board: newBoard,
        })
    }

    cycle = (event, pos, val, editable) => {
        if (editable) {
            event.preventDefault();
            this.setState((prev) => {
                prev.board[pos.x][pos.y] = (prev.board[pos.x][pos.y] + val) % 3
                return {board: prev.board}
            })
            return false;
        }
    }

    render() {
        return (
          <div className="blank-container u-flex u-flex-justifyCenter u-flex-alignCenter">
            <div className="holder u-flex u-flex-justifyCenter u-flex-alignCenter">
                <div className="blank">
                    <Blank board={this.state.board} cycle={this.cycle} />
                </div>
                <div className="details">
                    <Details userId={this.props.userId} />
                </div>
            </div>
          </div>
        );
    }
}

export default CustomBoard;