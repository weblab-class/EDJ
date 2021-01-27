import React, { Component } from "react";

import './Slideshow.css'

class Slideshow extends Component {
  constructor(props) {
    super(props);

    this.state = {
        value: 0,
    }
  }

  update = (increment) => {
    this.setState((prev) => {
        return {value: (prev.value + increment) % 3}
    })
  }

  componentDidMount() {
    this.setState({value: this.props.type})
    setInterval(() => this.update(this.props.type), 3000);
  }

  getType = () => {
      switch (this.state.value) {
          case -2:
              return "Vert-wall";
          case -1:
              return "Hor-wall";
          case 0:
              return "";
          case 1:
              return "Left-mirror";
          case 2:
              return "Right-mirror";
      }
  }

  render() {
    return (
      <div className='slideshow-container u-flex u-flex-justifyCenter u-flex-alignCenter'>
        <div className={this.getType()}></div>
      </div>
    );
  }
}

export default Slideshow;
