import BaseTemplate from "./BaseTemplate"
import React from "react"

class Arrow extends BaseTemplate {
    render() {
        return (
            <a href={this.props.href}
               className={["arrow", this.props.addClass].join(' ')}
            >
                <span className="sr-only">
                    {this.props.addClass.includes('-previous') ? "Vue précédente" : "Vue suivante"}
                </span>
            </a>
        )
    }
}

export default Arrow
