import React from "react"
import navData from "../content/nav.json"

const iconList = navData.map((obj, index) => (
    <a
        key={index}
        className={["social", obj.name.toLowerCase()].join(' ')}
        aria-label={obj.name}
        href={obj.url}
        rel="noreferrer noopener"
        target="_blank"
    >
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d={obj.svgPath} />
        </svg>
        <span className="sr-only">
            {obj.name}
        </span>
    </a>
))

const Header = () => (
    <header role="banner" id="masthead">
        <div className="logo upp side-font">
            <a href="/" className="col-white bold">Naz<span>Ayd</span></a>
        </div>
        <div className="icons">
            {iconList}
        </div>
    </header>
)

export default Header
