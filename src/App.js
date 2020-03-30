import React from 'react';
import './App.css';
import { homeData } from './content/home';
import { worksData } from './content/works';
import { contactData } from './content/contact';

const Skiplinks = () => {
  const onFocus = () => document.body.classList.add('a11y');
  return <ul id="skip" aria-label="Accès rapide">
    <li><a href="#works" onFocus={onFocus} className="skip-link">Aller aux réalisations</a></li>
    <li><a href="#contact" className="skip-link">Aller à l'écran Contact</a></li>
  </ul>
}

class Header extends React.Component {
  render() {
    return (
      <header role="banner" aria-label="Zone d'en-tête" id="masthead">
        <div className="logo upp side-font">
          <a href="/" className="col-white bold">Naz<span>Ayd</span></a>
        </div>
        <div className="icons">
          <a className="twitter" aria-label="Twitter" href="https://twitter.com/aydogduN" rel="noopener noreferrer" target="_blank">
            <span className="dis-no">Twitter</span>
          </a>
          <a className="git" aria-label="GitHub" href="https://github.com/naydogdu" rel="noopener noreferrer" target="_blank">
            <span className="dis-no">GitHub</span>
          </a>
        </div>
      </header>
    )
  }
} 

class BaseTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {activeScreen: false};
		this.goToPrevScreen = this.goToPrevScreen.bind(this);
		this.goToNextScreen = this.goToNextScreen.bind(this);
		this.changeScreen = this.changeScreen.bind(this);
		this.handleLoad = this.handleLoad.bind(this);
		this.winH = parseInt( window.innerHeight );
  }
  componentDidMount() {
    window.addEventListener('load', this.handleLoad);
  }
  handleLoad() {
		var elems = document.getElementsByClassName('inner-screens');
		for (let i = 0; i < elems.length; i++) {
      var childs = elems[i].getElementsByClassName('screen');
      if( childs.length > 0 )
        childs[0].classList.add('slide-first', 'active');
		}
  }
	numRoundMultiple(x, y) {
		return Math.round(x / y) * y;
	}
  goToPrevScreen() {
		var added_class = this.props.addClass;
		var elems = document.getElementsByClassName('screen active');
		var last_active = elems[ elems.length - 1];
		
		/* scrolling if a11y mode */
		var scrollVal = this.numRoundMultiple( parseInt( window.pageYOffset ) - this.winH, this.winH );
		window.scrollTo( 0, scrollVal );
		
		if( last_active.classList.contains('slide-first') ) 
			last_active.closest('.inner-screens').classList.remove('active');	
		else {
			last_active.classList.remove('active');	
			if( added_class.includes('force-x') )
				last_active.closest('.inner-screens').classList.remove('active');	
		}		
  }
  goToNextScreen() {
		var added_class = this.props.addClass;
		var elems = document.getElementsByClassName('screen');
		
		/* scrolling if a11y mode */
		var scrollVal = this.numRoundMultiple( parseInt( window.pageYOffset ) + this.winH, this.winH );
		window.scrollTo( 0, scrollVal );
		
		for (let i = 0; i < elems.length; i++) {		
			if( !elems[i].classList.contains('active') ) {
				/* check if vertical screen, ie .inner-screens */
				if( elems[i].classList.contains('inner-screens') ) {				
					var childs = elems[i].getElementsByClassName('screen');
					if( childs.length > 0 )
						childs[0].classList.add('active');
				}	
				if( added_class.includes('force-x') ) {
					if( !elems[i].parentNode.classList.contains('slide') ) {
						elems[i].classList.add('active');						
						break;
					}					
				} else {
					elems[i].classList.add('active');					
					break; /* because need to go next screen only, not removing other active classes for a better .nav-right move */	
				}							
			}
		}
  }
  changeScreen() {
		if(this.props.addClass.includes('-previous')) {
			/* if "-previous" found, go to previous screen */
			this.goToPrevScreen();
		} else {
			/* else, go to next screen */
			this.goToNextScreen();
		}	
  }
}

class ScreenTemplate extends BaseTemplate {
  constructor(props) {
    super(props);
    this.state = {activeScreen: false}
  }
  render() {
    let screenClass = ["screen "];
    if(this.state.activeScreen) {
      screenClass.push(' active');
    }
		let ctas = []
		for (let i = 0; i < this.props.cta.length; i++) {		
			ctas.push(
				<Cta 
					key={i}
					label={this.props.cta[i].label} 
					href={this.props.cta[i].link} 
					addClass={this.props.cta[i].link === '#' ? " toggle-next mgr1 mgl1" : " mgr1 mgl1" }
				/>
			)
		}
    let ids = this.props.id.split(" ");
    let divid = ids[0];
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
		);
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
    super(props);
    this.checkTriggers = this.checkTriggers.bind(this);
  }
  checkTriggers(e) {	
		if(this.props.addClass.includes('toggle-next')) {
			e.preventDefault();
			this.changeScreen();
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
		);
  }
}

class Home extends React.Component {
  render() {
    return (
      <ScreenTemplate {...homeData} />
		);
  }
}

class Works extends React.Component {
  generateWorks = () => {
    let works = []
    // Outer loop to create parent
    for (let i = 0; i < worksData.length; i++) {		
      works.push(<div className="slide" key={i}><ScreenTemplate {...worksData[i]} /></div>)
    }
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
		);
  }
}

class Contact extends React.Component {
  render() {
    return (
      <ScreenTemplate {...contactData} />
		);
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
		);
  }
}

function App() {
  return (
		<div className="main">
			<Skiplinks />
			<Header />
			<Content />
		</div>
  );
}

export default App;
