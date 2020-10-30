import React from "react";
import BaseTemplate from "./BaseTemplate";
import Cta from "./Cta";
import Arrow from "./Arrow";
import _ from 'lodash';

class ScreenTemplate extends BaseTemplate {

  constructor(props) {
    super(props)
    this.state = {
      activeScreen: false,
      touchStartY: 0,
      touchEndY: 0
    }
    this.debouncedOnWheel = _.debounce(this.debouncedOnWheel.bind(this), 500)
  }

  handleTouchStart(ev) {
    this.state.touchStartY = ev.changedTouches[0].screenY
  }

  handleTouchEnd(ev) {
    this.state.touchEndY = ev.changedTouches[0].screenY
    if ( this.state.touchEndY < this.state.touchStartY )
      this.goToNextScreen()
    if ( this.state.touchEndY > this.state.touchStartY )
      this.goToPrevScreen()
  }

  handleWheel(ev) {
    this.debouncedOnWheel(Math.sign(ev.deltaY));
  }

  debouncedOnWheel(value) {
    if( value === 1 )
      this.goToNextScreen()
    else
      this.goToPrevScreen()
  }

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
           onWheel={this.handleWheel.bind(this)}
           onTouchStart={this.handleTouchStart.bind(this)}
           onTouchEnd={this.handleTouchEnd.bind(this)}
           className={screenClass.join(' ') + this.props.id}>
        <div className="screen-body">
          <h1 id={"title-"+id}>{this.props.headline}</h1>
          <div className="content">
            <b>{this.props.keyword}</b> {this.props.txt}
          </div>
          <div className="ctas">{ctas}</div>
          <Arrow addClass="nav-previous" />
          <Arrow addClass="nav-next" />
        </div>
      </div>
    )

  }
}

export default ScreenTemplate;
