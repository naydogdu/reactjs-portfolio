import BaseTemplate from "./BaseTemplate";
import React from "react";

class Arrow extends BaseTemplate {
  render() {
    return (
      <button className={"arrow "+ this.props.addClass} onClick={this.changeScreen.bind(this)}>
        <span className="sr-only">{this.props.addClass.includes('-previous') ? "Vue précédente" : "Vue suivante" }</span>
      </button>
    )
  }
}

export default Arrow;
