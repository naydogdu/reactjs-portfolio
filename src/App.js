import React from 'react';
import './App.css';
import { homeData } from './content/home';
import { worksData } from './content/works';
import { contactData } from './content/contact';

const Skiplinks = () => {
  const onFocus = () => document.body.classList.add('a11y')
  return <ul id="skip" aria-label="Accès rapide">
    <li><a href="#works" onFocus={onFocus} className="skip-link">Aller aux réalisations</a></li>
    <li><a href="#contact" className="skip-link">Aller à l'écran Contact</a></li>
  </ul>
}

class Header extends React.Component {
  render() {
    
    const icons = [
      { 
        name: 'Twitter', 
        url: 'https://twitter.com/aydogduN',
        svgPath: '<path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>'
      },
      { 
        name: 'GitHub', 
        url: 'https://github.com/naydogdu',
        svgPath: '<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>'
      }
    ]
    
    const iconList = icons.map( (obj, index) => {
      return (
        <a key={index} className={"social "+obj.name.toLowerCase()} aria-label={obj.name} href={obj.url} rel="noopener noreferrer" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: obj.svgPath }}></svg>
          <span className="sr-only">{obj.name}</span>
        </a>
      ) 
    })
    
    return (
      <header role="banner" id="masthead">
        <div className="logo upp side-font">
          <a href="/" className="col-white bold">Naz<span>Ayd</span></a>
        </div>
        <div className="icons">
          {iconList}
        </div>
      </header>
    )
  }
} 

class BaseTemplate extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {activeScreen: false}
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
    
    let added_class = this.props.addClass
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
    let added_class = this.props.addClass
    let elems = document.getElementsByClassName('screen')
    
    /* scrolling if a11y mode */
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

class ScreenTemplate extends BaseTemplate {
  constructor(props) {
    super(props)
    this.state = { activeScreen: false }
  }
  render() {
    let ctas = []
    let divid = this.props.id.split(" ")[0]
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
      <div id={divid} aria-label={this.props.headline} className={screenClass.join(' ') + this.props.id}>
        <div className="screen-body">
          <h1 id={"title-"+divid}>{this.props.headline}</h1>
          <div className="content">
            <b>{this.props.keyword}</b>
            {this.props.txt}
          </div>
          <div className="ctas">{ctas}</div>
          <Arrow addClass="nav-previous" />
          <Arrow addClass="nav-next" />
        </div>  
      </div>  
    )
  }
}

class Arrow extends BaseTemplate {
  render() {
    return (
      <button className={"arrow "+ this.props.addClass} onClick={this.changeScreen.bind(this)}>
        <span className="sr-only">{this.props.addClass.includes('-previous') ? "Vue précédente" : "Vue suivante" }</span>
      </button>
    )
  }
}

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
      <article aria-label="Contenu principal" className="tac">
        <div className="wrap screens-wrapper clear col-white">
          <Home />
          <Works />
          <Contact />
        </div>
      </article>
    )
  }
}

function App() {
  return (
    <div className="main">
      <Skiplinks />
      <Header />
      <Content />
    </div>
  )
}

export default App;
