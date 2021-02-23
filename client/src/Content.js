import React from "react";
import {
  Switch,
  Route,
  Link,
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

function Accolades(props) {
  return <div></div>
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
