import BaseTemplate from "./BaseTemplate";
import React from "react";

class Cta extends BaseTemplate {
  constructor(props) {
    super(props)
    this.checkTriggers = this.checkTriggers.bind(this)
  }
  checkTriggers(e) {
    if( this.props.addClass.includes('toggle-next') ) {
      e.preventDefault()
      this.changeScreen()
    }
  }
  render() {
    return (
      <a
        href={this.props.href}
        className={"btn upp"+ this.props.addClass}
        onClick={this.checkTriggers}
        target={this.props.href !== '#' ? "_blank" : "" }
        rel={this.props.href !== '#' ? "noopener noreferrer" : "" }>
        {this.props.label}
      </a>
    )
  }
}

export default Cta;
