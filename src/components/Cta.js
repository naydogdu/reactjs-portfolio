import BaseTemplate from "./BaseTemplate"
import React from "react"

class Cta extends BaseTemplate {

    render() {
        return (
            <a
                href={this.props.href}
                className={"btn upp"+ this.props.addClass}
                target={!this.props.href.includes('#') ? "_blank" : null }
                rel={!this.props.href.includes('#') ? "noreferrer" : null }
            >
                {this.props.label}
            </a>
        )
    }
}

export default Cta
