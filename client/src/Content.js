import React from "react";
import {
  Switch,
  Route,
  Link,
} from "react-router-dom";
import { Document, Page, pdfjs } from 'react-pdf';
import ReactModal from 'react-modal';
import './App.css';
import { cvContent, accoladeContent, tutorialServicesContent } from './content/config';
import rhetoricalOrigins from './content/rhetorical-origins';
import rhetoricAndPoetics from './content/rhetoric-and-poetics';
import switchbacks from './content/switchbacks';
import haikuAutobiography from './content/haiku-autobiography';
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
    case 'Tutorial Services':
      content = <TutorialServices content={tutorialServicesContent} />;
      break;
    case 'Rhetorical Origins':
      content = <RhetoricalOrigins content={rhetoricalOrigins} />;
      break;
    case 'Rhetoric and Poetics':
      content = <RhetoricAndPoetics content={rhetoricAndPoetics} />
      break;
    case 'Switchbacks':
      content = <Switchbacks content={switchbacks} />
      break;
    case 'Haiku Autobiography':
      content = <HaikuAutobiography content={haikuAutobiography} />
      break;

    }

  return (
    <div className='App'>
      <NavBox links={props.links} selected={props.name}/>
      <h1>{props.name}</h1>
      <hr/>
      <div className='content'>
        {content}
      </div>
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
        <ul>
          {listItems.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
    )
  });

  return (
    <div>
      <img src={drK} alt='Dr. K portrait' />
      <h3>CURRICULUM VITAE</h3>
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
      image: this.content[e.target.name],
      modalOpen: true
    })
  }

  onModalClose = () => this.setState({ modalOpen: false });

  renderButtons = () => {
    return (
      this.content.map(({title}, index) => {
        return (
          <li>
            <button name={index} onClick={this.handleClick}>{title}</button>
          </li>
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
      <div>
        <ul>
          {this.renderButtons()}
        </ul>
        <ReactModal isOpen={this.state.modalOpen} onRequestClose={this.onModalClose}>
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
    <img src={props.file} alt={props.title} />
  );

  return (
    <div>
      {image}
    </div>
  )
}

function TutorialServices(props) {
  const content = props.content;
  return (
    <div>
      <p>{content.header}</p>
      <ul>
        {content.listItems.map((item) => <li>{item}</li>)}
      </ul>
      <div>
        {content.paragraphs.map((item) => <p>{item}</p>)}
      </div>
    </div>
  )
}

function RhetoricalOrigins(props) {
  const content = props.content;

  const renderBody = () => {
    return(
      content.body.map(({heading, subHeading, body}) => {
        console.log(heading, subHeading, body);
        return (
          <div>
            <h2>{heading}</h2>
            <h3>{subHeading}</h3>
            <p>{body}</p>
          </div>
        )
      })
    )
  }

  return (
    <div>
      <h1>{content.title}</h1>
      {renderBody()}
    </div>
  )
}

function RhetoricAndPoetics(props) {
  const content = props.content;
  return (
    <div>
      <h1>{content.title}</h1>
      <h2>{content.subHeading}</h2>
      {content.body.map((item) => <p>{item}</p>)}
    </div>
  )
}

function Switchbacks(props) {
  return (
    <div>
      {props.content()}
    </div>
  )
}

function HaikuAutobiography(props) {
  const renderHaikus = () => {
    let haikus = [];
    for (const num in props.content) {
      haikus.push(
        <div>
          <p>{num}</p>
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
