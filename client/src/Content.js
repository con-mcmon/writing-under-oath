import React from "react";
import {
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import { Document, Page, pdfjs } from 'react-pdf';
import ReactModal from 'react-modal';
import './App.css';
import {cvContent, accoladeContent} from './config'

import drK from './images/dr-k.jpg';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function Content(props) {
  let content;
  switch(props.name) {
    case 'Dr. K':
      content = <DrKContent />;
      break;
    case 'Accolades':
      content = <Accolades />
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
  const renderContents = cvContent.map(({header, listItems}) => {
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
      {renderContents}
    </div>
  )
}

class Accolades extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      image: null
    }
  }

  handleClick = (e) => {
    this.setState({
      image: accoladeContent[e.target.name],
      modalOpen: true
    })
  }

  onModalClose = () => this.setState({modalOpen: false});

  renderButtons = () => {
    return (
      accoladeContent.map(({title}, index) => {
        return (
          <li>
            <button name={index} onClick={this.handleClick}>{title}</button>
          </li>
        )
      })
    )
  }

  render() {
    return (
      <div>
        <ul>
          {this.renderButtons()}
        </ul>
        <ReactModal isOpen={this.state.modalOpen} onRequestClose={this.onModalClose}>
          {this.state.image ? <Accolade
            file={this.state.image.file}
            title={this.state.image.title}
            type={this.state.image.type} /> : null}
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

export default Content;
