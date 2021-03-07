import React from "react";
import {
  Switch,
  Route,
  Link,
} from "react-router-dom";
import { Document, Page, pdfjs } from 'react-pdf';
import ReactModal from 'react-modal';
import './App.css';
import Footer from './footer';
import accoladeContent from './content/accolade-content';
import cvContent from './content/cv-content';
import haikuAutobiographyContent from './content/haiku-autobiography';
import TutorialServices from './content/tutorial-services';
import RhetoricalOrigins from './content/rhetorical-origins';
import RhetoricAndPoetics from './content/rhetoric-and-poetics';
import Switchbacks from './content/switchbacks';
import NeurologyOfMemoir from './content/neurology-of-memoir';
import EcocriticalCreativity from './content/ecocritical-creativity';
import EssayTopography from './content/essay-topography';
import WritingAndReality from './content/writing-and-reality';
import ThinkingViaObjects from './content/thinking-via-objects';
import LanguageGames from './content/language-games';
import TheRightToDie from './content/the-right-to-die';
import PerfectingLanguage from './content/perfecting-language';
import LivingUnderOath from './content/living-under-oath';
import RealityUnderOath from './content/reality-under-oath';

import drK from './content/images/dr-k.jpg';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function Content(props) {
  let content;
  switch(props.name) {
    case 'Dr. K':
      content = <DrKContent content={cvContent} />;
      break;
    case 'Accolades':
      content = <Accolades content={accoladeContent} />
      break;
    case 'Haiku Autobiography':
      content = <HaikuAutobiography content={haikuAutobiographyContent} />;
      break;
    case 'Tutorial Services':
      content = <TutorialServices />;
      break;
    case 'Rhetorical Origins':
      content = <RhetoricalOrigins />;
      break;
    case 'Rhetoric and Poetics':
      content = <RhetoricAndPoetics />;
      break;
    case 'Switchbacks':
      content = <Switchbacks />;
      break;
    case 'Neurology of Memoir':
      content = <NeurologyOfMemoir />;
      break;
    case 'Ecocritical Creativity':
      content = <EcocriticalCreativity />;
      break;
    case 'Essay Topography':
      content = <EssayTopography />;
      break;
    case 'Writing and Reality':
      content = <WritingAndReality />;
      break;
    case 'Thinking Via Objects':
      content = <ThinkingViaObjects />;
      break;
    case 'Language Games':
      content = <LanguageGames />;
      break;
    case 'The Right To Die':
      content = <TheRightToDie />;
      break;
    case 'Perfecting Language':
      content = <PerfectingLanguage />;
      break;
    case 'Living Under Oath':
      content = <LivingUnderOath />;
      break;
    case 'Reality Under Oath':
      content = <RealityUnderOath />;
      break;
    }

  return (
    <div className='App'>
      <NavBox links={props.links} selected={props.name}/>
      <p className='content-title'>{props.name}</p>
      <hr/>
      <div className='content'>
        {content}
      </div>
      <Footer />
    </div>
  )
}

function NavBox(props) {
  return (
    <div className='nav-box'>
      <Link to='/' className='nav-link'>Home</Link>
      {props.links.map(({label, path}) => <Link
                                            to={path}
                                            className={label === props.selected ? 'nav-link-selected' : 'nav-link'}
                                            key={label}>{label}</Link>)}
    </div>
  )
}

function DrKContent(props) {
  const sections = props.content.map(({header, listItems}) => {
    return(
      <div>
        <h3>{header}</h3>
        <hr/>
        <ul className='resume-list'>
          {listItems.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
    )
  });

  return (
    <div style={{textAlign: 'center'}}>
      <img src={drK} alt='Dr. K portrait' />
      <h2>CURRICULUM VITAE</h2>
      <br/>
      <hr/>
      {sections}
    </div>
  )
}

class Accolades extends React.Component {
  constructor(props) {
    super(props);
    this.content = this.props.content;
    this.state = {
      modalOpen: false,
      image: null
    }
  }

  handleClick = (e) => {
    this.setState({
      image: this.content[e.target.id],
      modalOpen: true
    })
  }

  onModalClose = () => this.setState({ modalOpen: false });

  renderAccoladeText = () => {
    return (
      this.content.map(({title}, index) => {
        return (
          <p className='accolade-link' id={index} onClick={this.handleClick}><u>{title}</u></p>
        )
      })
    )
  }

  renderAccolade = () => {
    return this.state.image ? <Accolade
                                file={this.state.image.file}
                                title={this.state.image.title}
                                type={this.state.image.type} /> : null

  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        {this.renderAccoladeText()}
        <ReactModal isOpen={this.state.modalOpen} onRequestClose={this.onModalClose} >
          {this.renderAccolade()}
        </ReactModal>
      </div>
    )
  }
}

function Accolade(props) {
  const image = (props.type === 'pdf') ? (
    <Document file={props.file} >
      <Page pageNumber={1} />
      <Page pageNumber={2} />
    </Document>
  ) : (
    <img src={props.file} alt={props.title} className='accolade'/>
  );

  return (
    <div>
      {image}
    </div>
  )
}

function HaikuAutobiography(props) {
  const renderHaikus = () => {
    let haikus = [];
    for (const num in props.content) {
      haikus.push(
        <div className='haiku'>
          <p>{num}.</p>
          {props.content[num].map((line) => <p>{line}</p>)}
        </div>
      )
    }
    return haikus;
  }
  return (
    <div>
      {renderHaikus()}
    </div>
  )
}

export default Content;
