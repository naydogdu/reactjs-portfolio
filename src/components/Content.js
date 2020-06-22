import React from "react";
import ScreenTemplate from "./ScreenTemplate";
import Arrow from "./Arrow";
import {homeData} from "../content/home";
import {worksData} from "../content/works";
import {contactData} from "../content/contact";

class Home extends React.Component {
  render() {
    return (
      <ScreenTemplate {...homeData} />
    )
  }
}

class Works extends React.Component {

  generateWorks = () => {
    let works = []
    for (let i = 0; i < worksData.length; i++)
      works.push(<div className="slide" key={i}><ScreenTemplate {...worksData[i]} /></div>)
    return works
  }

  render() {
    return (
      <div id="works" aria-label="Mes réalisations" className="works screen inner-screens">
        <div className="screen-body">
          {this.generateWorks()}
          <Arrow addClass="nav-previous force-x" />
          <Arrow addClass="nav-next force-x" />
        </div>
      </div>
    )
  }
}

class Contact extends React.Component {
  render() {
    return (
      <ScreenTemplate {...contactData} />
    )
  }
}

class Content extends React.Component {
  render() {
    return (
      <article className="tac">
        <div className="wrap screens-wrapper clear col-white">
          <Home />
          <Works />
          <Contact />
        </div>
      </article>
    )
  }
}

export default Content;
