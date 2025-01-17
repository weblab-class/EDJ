import React, { Component } from "react";
import { Link } from "@reach/router";
import { navigate } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { stack as Menu } from "react-burger-menu";
const GOOGLE_CLIENT_ID = "787919045075-1l8kq4dvm5i4s525fjvrdnctpcrl70hm.apps.googleusercontent.com";

import "./Sidebar.css";
import { get, post } from "../../utilities";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      loggedIn: false,
    };
  }

  closeMenu() {
    this.setState({ menuOpen: false });
  }

  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen });
  }

  home = () => {
    this.closeMenu();
    navigate("/");
  };
  rules = () => {
    this.closeMenu();
    navigate("/howto");
  };
  profile = () => {
    this.closeMenu();
    navigate("/profile/" + this.props.userId);
  };
  boards = () => {
    this.closeMenu();
    navigate("/custom/");
  };

  isLogged = () => {
    if (this.props.userId) {
      return (
        <div className="parent">
          <div className="nav u-link" onClick={this.profile}>
            Profile
          </div>
          <div className="nav u-link" onClick={this.boards}>
            Boards
          </div>
        </div>
      );
    }
  };
  showSettings(event) {
    event.preventDefault();
  }
  render() {
    return (
      <Menu
        isOpen={this.state.menuOpen}
        onStateChange={(state) => this.handleStateChange(state)}
        disableAutoFocus
      >
        <div className="title">Trickshots</div>
        <div className="nav u-link" onClick={this.home}>
          Play
        </div>
        <div className="nav u-link" onClick={this.rules}>
          Rules
        </div>
        {this.isLogged()}
        <div className="login-container">
          <div className="login">
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
      </Menu>
    );
  }
}

export default Sidebar;
