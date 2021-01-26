import React, { Component } from "react";
import { get } from "../../utilities";
import { post } from "../../utilities";
import Info from "../modules/Game/Info.js";
import { PieChart } from "react-minimal-pie-chart";
import "./Profile.css";

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
    };
  }

  componentDidMount() {
    get("/api/user", { userId: this.props.userId }).then((user) => {
      this.setState({ user: user, loading: false, wins: user.wins, losses: user.losses });
    });
    get("/api/getBoards").then((res) => {
      this.setState({
        boards: res.boards,
      });
    });
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
        console.log("profile user: ");
        console.log(newUser);
        this.setState({ user: newUser });
      });
    }
  };

  render() {
    let pieChart;
    if (this.state.wins !== 0 && this.state.losses !== 0) {
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
    } else {
      pieChart = (
        <PieChart radius={40} data={[{ title: "Wins", value: 100, color: "#45d8b8" }]}></PieChart>
      );
    }
    if (this.state.loading) {
      return <div>Loading...</div>;
    }
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
                  <label>Wins: {this.state.wins}</label>
                  <label>Losses: {this.state.losses}</label>
                  <label>Total games: {this.state.wins + this.state.losses}</label>
                </div>
                {/* <label>Ratio: {Math.round(this.state.wins / this.state.user.losses)}</label> */}
              </div>
              <div className="u-flexColumn">
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
          <div className="flexColumn">
            <div className="title2">Custom Boards</div>
            <select>{this.getCustomBoards()}</select>
          </div>
        </div>
      </div>
    );
  }
}
export default Profile;
