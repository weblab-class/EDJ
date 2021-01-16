import React, { Component } from "react";
import { Link } from "@reach/router";

import "./Sidebar.css";

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="Sidebar-container">

      <h1> 
         GameTitle
       </h1>
       <h2>
        <Link to="/"className="SideBar-link">
          PLAY
        </Link>
        </h2>
        <h3>
        <Link to="/howto/"className="SideBar-link">
          Rules
          </Link>
        </h3>
       
        <h3>
          <Link to="/login/"className="SideBar-link">
          Login
          </Link>
          </h3>
      
         
      </nav>
    );
  }
}

export default Sidebar;