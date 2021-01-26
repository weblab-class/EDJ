import React, { Component } from "react";
import { get } from "../../utilities";
import { post } from "../../utilities";
import Info from "../modules/Game/Info.js";
import { PieChart } from "react-minimal-pie-chart";
import "./Profile.css";
import Blank from "../modules/Custom/Blank.js";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      loading: true,
      nickname: "",
      changeName: false,
      wins: undefined,
      losses: undefined,
      boards: [],
      board: undefined,
    };
  }

  componentDidMount() {
    get("/api/user", { userId: this.props.userId }).then((user) => {
      this.setState({ user: user, loading: false, wins: user.wins, losses: user.losses });
    });
    get("/api/getBoards").then((res) => {
      if (res.boards.length !== 0) {
        this.setState({
          boards: res.boards,
          board: res.boards[0].board.map((row) => row.map((str) => (str = Number(str)))),
        });
      } else {
        this.setState({
          boards: res.boards,
        });
      }
    });
    console.log(this.state.board);
  }

  handleEnter = (event) => {
    if (event.keyCode === 13) {
      this.submitName();
    }
  };

  getCustomBoards = () => {
    return this.state.boards.map((board) => {
      return (
        <option key={board.name} value={board.name}>
          {board.name}
        </option>
      );
    });
  };

  changeName = (event) => {
    event.persist();
    this.setState((prevState) => {
      return {
        nickname: event.target.value,
      };
    });
  };

  submitName = () => {
    if (this.state.nickname !== "") {
      post("/api/changeName", { newName: this.state.nickname }).then((newUser) => {
        this.setState({ user: newUser });
      });
    }
  };

  displayBoard = (event) => {
    const boardName = event.target.value;
    const board = this.state.boards
      .filter((board) => board.name === boardName)[0]
      .board.map((row) => row.map((str) => (str = Number(str))));
    this.setState({ board: board });
  };

  render() {
    let pieChart;
    if (!(this.state.wins === 0 && this.state.losses === 0)) {
      pieChart = (
        <PieChart
          radius={40}
          label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
          labelStyle={{
            fontSize: "8px",
            fontFamily: "Nunito",
            fill: "#ffffff",
            fontWeight: "300",
          }}
          labelPosition={65}
          data={[
            { title: "Wins", value: this.state.wins, color: "#45d8b8" },
            { title: "Losses", value: this.state.losses, color: "#756565" },
          ]}
          lengthAngle={360}
          animate
        />
      );
    } else if (this.state.wins === 0 && this.state.losses !== 0) {
      pieChart = (
        <PieChart
          radius={40}
          label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
          labelStyle={{
            fontSize: "8px",
            fontFamily: "Nunito",
            fill: "#ffffff",
            fontWeight: "300",
          }}
          labelPosition={0}
          data={[{ title: "Losses", value: this.state.losses, color: "#756565" }]}
          lengthAngle={360}
          animate
        />
      );
    } else if (this.state.wins !== 0 && this.state.losses === 0) {
      pieChart = (
        <PieChart
          radius={40}
          label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
          labelStyle={{
            fontSize: "8px",
            fontFamily: "Nunito",
            fill: "#ffffff",
            fontWeight: "300",
          }}
          labelPosition={0}
          data={[{ title: "Wins", value: this.state.wins, color: "#45d8b8" }]}
          lengthAngle={360}
          animate
        />
      );
    } else {
      pieChart = (
        <PieChart
          label={({ dataEntry }) => "No games played."}
          labelStyle={{
            fontSize: "8px",
            fontFamily: "Nunito",
            fill: "#ffffff",
            fontWeight: "300",
          }}
          labelPosition={0}
          radius={40}
          data={[{ title: "Wins", value: 100, color: "#756565" }]}
        ></PieChart>
      );
    }
    if (this.state.loading) {
      return <div>Loading...</div>;
    }
    const emptyBoard = Array(9)
      .fill()
      .map(() => Array(9).fill(0));

    return (
      <div className="u-center">
        <div className="title1">{this.state.user.name}</div>
        <div className="flexRow">
          <div className="flexColumn">
            <div className="title2">Username</div>
            <div className="flexRow">
              <label className="u-inlineBlock">Change Name:</label>
              <input
                className="u-inlineBlock"
                id="change-user"
                onChange={this.changeName}
                onKeyDown={this.handleEnter}
              ></input>
              <div className="button u-link" onClick={this.submitName}>
                Submit
              </div>
            </div>
            {/* <div className="flexRow"> */}
            <div className="statsBox flexRow">
              <div className="u-flexColumn">
                <div className="title2">Game History</div>
                <div className="gamesInfo">
                  <label>Won games: {this.state.wins}</label>
                  <label>Lost games: {this.state.losses}</label>
                  <label>Total games: {this.state.wins + this.state.losses}</label>
                </div>
                {/* <label>Ratio: {Math.round(this.state.wins / this.state.user.losses)}</label> */}
              </div>
              <div className="u-flexColumn u-flex-justifyCenter">
                {pieChart}
                <div className="flexRow keyBox">
                  <label>wins</label>
                  <div className="winKey"> word </div>
                  <label>losses</label>
                  <div className="loseKey"> word </div>
                </div>
              </div>
              {/* </div> */}
            </div>
          </div>
          <div className="flexColumn u-flex-justifyCenter">
            <div className="title2">Custom Boards</div>
            <select onChange={this.displayBoard}>{this.getCustomBoards()}</select>
            <div className="holder u-flex u-flex-justifyCenter u-flex-alignCenter">
              <div className="blankBoard">
                <Blank board={this.state.board ? this.state.board : emptyBoard} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Profile;
