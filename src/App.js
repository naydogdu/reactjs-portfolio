import React from 'react';
import './App.css';
import { homeData } from './content/home';
import { worksData } from './content/works';
import { contactData } from './content/contact';
//import {screenTemplate} from './utils';

class Header extends React.Component {
  render() {
    return (
		<header>
			<div className="logo upp side-font">
				<b>Naz<span>Ayd</span></b>
			</div>
		</header>
	);
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
  goToPrevScreen() {
	var added_class = this.props.addClass;
	var elems = document.getElementsByClassName('screen active');
	var last_active = elems[ elems.length - 1];
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
	return (
		<div className={screenClass.join(' ') + this.props.id}>
			<div className="screen-body">
				<h1>{this.props.headline}</h1>
				<div className="content">
					<b>{this.props.keyword}</b>
					{this.props.txt}
				</div>
				<Cta label={this.props.ctaLabel} href={this.props.ctaLink} addClass={this.props.ctaLink === '#' ? " toggle-next" : "" } />
				<Arrow addClass="nav-previous" />
				<Arrow addClass="nav-next" />
			</div>	
		</div>	
	);
  }
};

class Arrow extends BaseTemplate {
	render() {
		return (
			<span className={"arrow "+ this.props.addClass} onClick={this.changeScreen.bind(this)}></span>
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
		<a href={this.props.href} className={"btn upp"+ this.props.addClass} onClick={this.checkTriggers} target={this.props.href !== '#' ? "_blank" : "" }>
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
		<div className="works screen inner-screens">
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
		<article className="tac">
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
		<Header />
		<Content />
	</div>
  );
}

export default App;
