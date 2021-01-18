import React, { Component } from "react";
import { Link } from "@reach/router";
import { navigate } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

const GOOGLE_CLIENT_ID = "473769754928-7ahknn038led2u1qif6aj95lka4k528i.apps.googleusercontent.com";

import "./Sidebar.css";

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  home = () => {navigate("/")}
  rules = () => {navigate("/howto")}

  render() {
    return (
      <div className="Sidebar-container u-flexColumn">
        <div className='title'>Trickshot</div>
        <div className="nav u-link" onClick={this.home}>Play</div>
        <div className="nav u-link" onClick={this.rules}>Rules</div>
        <div className="login u-flex u-flex-justifyCenter u-flex-alignCenter">
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
        </div>
      </div>
    );
  }
}

export default Sidebar;