import React from "react"

class BaseTemplate extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            activeScreen: false
        }

        this.handleLoad = this.handleLoad.bind(this)
        this.fixVhHeight = this.fixVhHeight.bind(this)
        this.winH = parseInt( window.innerHeight )
    }

    componentDidMount() {
        window.addEventListener('load', this.handleLoad)
        window.addEventListener('resize', this.fixVhHeight)
    }

    fixVhHeight() {
        const doc = document.documentElement
        doc.style.setProperty('--app-height', `${window.innerHeight}px`)
        this.winH = parseInt( window.innerHeight )
    }

    handleLoad() {
        let elems = document.getElementsByClassName('inner-screens')
        for( let i = 0; i < elems.length; i++ ) {
            let childs = elems[i].getElementsByClassName('screen')
            if( childs.length > 0 )
                childs[0].classList.add('slide-first', 'active')
        }
        this.fixVhHeight()
    }
}

export default BaseTemplate
