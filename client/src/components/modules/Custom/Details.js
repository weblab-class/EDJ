import React, { Component } from "react";

import "./Details.css";

class Details extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Details-container u-flex u-flex-justifyCenter u-flex-alignCenter">
          <div className="Details-body u-flexColumn u-flex-alignCenter">
              Hello
          </div>
      </div>
    );
  }
}

export default Details;
