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
    };
  }

  componentDidMount() {
    get("/api/user", { userId: this.props.userId }).then((user) => {
      this.setState({ user: user, loading: false });
      console.log(user);
    });
  }

  handleEnter = (event) => {
    if (event.keyCode === 13) {
      this.submitName();
    }
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
    if (this.state.loading) {
      return <div>Loading...</div>;
    }
    // if (this.state.nickname === "") {
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
            <div className="title2">Game History</div>
            <label>wins: {this.state.user.wins}</label>
            <label>losses: {this.state.user.wins}</label>
            <label>ratio:</label>
            {/* <PieChart
              data={[
                { title: "One", value: 10, color: "#E38627" },
                { title: "Two", value: 15, color: "#C13C37" },
                { title: "Three", value: 20, color: "#6A2135" },
              ]}
            /> */}
            {/* ; */}
          </div>
          <div className="flexColumn">
            <div className="title2">Custom Boards</div>
            <select>
              <option>board1</option>
              <option>board2</option>
              <option>board3</option>
            </select>
          </div>
        </div>
      </div>
    );
    // );
    //   } else {
    //     return (
    //       <div className="u-center">
    //         <div className="title1"> {this.state.nickname} </div>
    //         <div className="flexRow">
    //           <div className="flexColumn">
    //             <div className="title2">Username</div>
    //             <div className="flexRow">
    //               <label className="u-inlineBlock">Change Name:</label>
    //               <input onChange={this.changeName}></input>
    //               <button onClick={this.submitName}></button>
    //             </div>
    //             <div className="title2">Game History</div>
    //             <label>wins:</label>
    //             <label>losses:</label>
    //             <label>ratio:</label>
    //           </div>
    //           <div className="flexColumn">
    //             <div className="title2">Custom Boards</div>
    //             <select>
    //               <option>board1</option>
    //               <option>board2</option>
    //               <option>board3</option>
    //             </select>
    //           </div>
    //         </div>
    //       </div>
    //     );
    // }
  }
}
export default Profile;
