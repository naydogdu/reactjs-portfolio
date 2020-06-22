import React from "react";

class BaseTemplate extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      activeScreen: false
    }
    this.goToPrevScreen = this.goToPrevScreen.bind(this)
    this.goToNextScreen = this.goToNextScreen.bind(this)
    this.changeScreen = this.changeScreen.bind(this)
    this.handleLoad = this.handleLoad.bind(this)
    this.winH = parseInt( window.innerHeight )
  }

  componentDidMount() {
    window.addEventListener('load', this.handleLoad)
  }

  handleLoad() {
    let elems = document.getElementsByClassName('inner-screens')
    for( let i = 0; i < elems.length; i++ ) {
      let childs = elems[i].getElementsByClassName('screen')
      if( childs.length > 0 )
        childs[0].classList.add('slide-first', 'active')
    }
  }

  numRoundMultiple(x, y) {
    return Math.round(x / y) * y
  }

  goToPrevScreen() {
    let added_class = '';
    if( this.props.addClass )
      added_class = this.props.addClass;
    let elems = document.getElementsByClassName('screen active')
    let last_active = elems[ elems.length - 1]

    /* scrolling if a11y mode */
    let scrollVal = this.numRoundMultiple( parseInt( window.pageYOffset ) - this.winH, this.winH )
    window.scrollTo( 0, scrollVal )

    if( last_active.classList.contains('slide-first') )
      last_active.closest('.inner-screens').classList.remove('active')
    else {
      last_active.classList.remove('active');
      if( added_class.includes('force-x') )
        last_active.closest('.inner-screens').classList.remove('active');
    }
  }

  goToNextScreen() {

    let added_class = '';
    if( this.props.addClass )
      added_class = this.props.addClass;

    let elems = document.getElementsByClassName('screen')
    let scrollVal = this.numRoundMultiple( parseInt( window.pageYOffset ) + this.winH, this.winH )
    window.scrollTo( 0, scrollVal )

    for ( let i = 0; i < elems.length; i++ ) {
      if( ! elems[i].classList.contains('active') ) {
        /* check if vertical screen, ie .inner-screens */
        if( elems[i].classList.contains('inner-screens') ) {
          let childs = elems[i].getElementsByClassName('screen')
          if( childs.length > 0 )
            childs[0].classList.add('active')
        }
        if( added_class.includes('force-x') ) {
          if( ! elems[i].parentNode.classList.contains('slide') ) {
            elems[i].classList.add('active')
            break
          }
        } else {
          elems[i].classList.add('active');
          break /* because need to go next screen only, not removing other active classes for a better .nav-right move */
        }
      }
    }
  }

  changeScreen() {
    if( this.props.addClass.includes( '-previous' ) ) {
      /* if "-previous" found, go to previous screen */
      this.goToPrevScreen()
    } else {
      /* else, go to next screen */
      this.goToNextScreen()
    }
  }

}

export default BaseTemplate;
