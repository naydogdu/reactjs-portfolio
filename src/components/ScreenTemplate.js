import React from "react"
import BaseTemplate from "./BaseTemplate"
import Cta from "./Cta"
import Arrow from "./Arrow"

class ScreenTemplate extends BaseTemplate {

    render() {
        let ctas = []
        let id = this.props.id.split(" ")[0]
        let screenClass = ["screen "]

        if(this.state.activeScreen)
            screenClass.push('active')

        for (let i = 0; i < this.props.cta.length; i++)
            ctas.push(
                <Cta
                    key={i}
                    label={this.props.cta[i].label}
                    href={this.props.cta[i].link}
                    addClass={this.props.cta[i].link === '#' ? " toggle-next mgr1 mgl1" : " mgr1 mgl1" }
                />
            )

        return (
            <div id={id}
                 className={screenClass.join(' ') + this.props.id}
            >
                <div className="screen-body">
                    <h1 id={"title-"+id}>{this.props.headline}</h1>
                    <div className="content">
                        <b>{this.props.keyword}</b> {this.props.txt}
                    </div>
                    <div className="ctas">{ctas}</div>
                    {this.props.previous && <Arrow href={this.props.previous} addClass="nav-previous" />}
                    {this.props.next && <Arrow href={this.props.next} addClass="nav-next"/>}
                </div>
            </div>
        )
    }
}

export default ScreenTemplate
