import React from "react"
import ScreenTemplate from "./ScreenTemplate"
import Arrow from "./Arrow"
import homeData from "../content/home.json"
import worksData from "../content/works.json"
import contactData from "../content/contact.json"

const Home = () => (
    <ScreenTemplate {...homeData} />
)

const Works = () => (
    <div id="works" aria-label="Mes réalisations" className="works screen inner-screens">
        <div className="screen-body">
            {worksData.map((el,i) => (
                <div className="slide" key={i}>
                    <ScreenTemplate {...el} />
                </div>
            ))}
            <Arrow href="#home" addClass="nav-previous force-x" />
            <Arrow href="#contact" addClass="nav-next force-x" />
        </div>
    </div>
)

const Contact = () => (
    <ScreenTemplate {...contactData} />
)

const Content = () => (
    <article className="tac">
        <div className="wrap screens-wrapper clear col-white">
            <Home />
            <Works />
            <Contact />
        </div>
    </article>
)

export default Content
