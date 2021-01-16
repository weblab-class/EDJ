import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { Link } from "@reach/router";
import { navigate } from "@reach/router";

import "./Home.css";

const GOOGLE_CLIENT_ID = "473769754928-7ahknn038led2u1qif6aj95lka4k528i.apps.googleusercontent.com";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  validateHost = () => {
    if (this.props.userId) {navigate("/host")}
    else {alert("You must be logged in to host or join a game")}
  }

  validateJoin = () => {
    if (this.props.userId) {navigate("/join")}
    else {alert("You must be logged in to host or join a game")}
  }

  render() {
    return (
      <div className="u-center-screen">
        {this.props.userId ? (
          <GoogleLogout
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={this.props.handleLogout}
            onFailure={(err) => console.log(err)}
          />
        ) : (
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={this.props.handleLogin}
            onFailure={(err) => console.log(err)}
          />
        )}
        <div className="u-title">GAME NAME</div>
        <div className="u-button-container">
          <div className="u-button u-link" onClick={this.validateHost}>
            Host game
          </div>
          <div className="u-button u-link" onClick={this.validateJoin}>
            Join game
          </div>
          {/*<Link to="/host" className="u-button u-link">
            Host game
          </Link>
          <Link to="/join" className="u-button u-link">
            Join game
        </Link>*/}
        </div>
      </div>
    );
  }
}

export default Home;
