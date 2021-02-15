import React from "react";
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';

import portrait from './images/squares/square-1.jpg';
import fish from './images/squares/square-2.jpg';
import artMuseum from './images/squares/square-3.jpg';
import flower from './images/squares/square-4.jpg';
import samuel from './images/squares/square-5.jpg';
import leaves from './images/squares/square-6.jpg';
import rainDrive from './images/squares/square-7.jpg';
import pinkFlower from './images/squares/square-8.jpg';
import motorcycle from './images/squares/square-9.jpg';
import waterTower from './images/squares/square-10.jpg';
import horse from './images/squares/square-11.jpg';
import wreath from './images/squares/square-12.jpg';
import rocks from './images/squares/square-13.jpg';
import lightSplatter from './images/squares/square-14.jpg';
import cardinal from './images/squares/square-15.jpg';
import tiredCat from './images/squares/square-16.jpg';
import basketCat from './images/squares/square-17.jpg';
import crayonDrawing from './images/squares/square-18.jpg';
import lightFixture from './images/squares/square-19.jpg';
import pineTree from './images/squares/square-20.jpg';
import lime from './images/squares/square-21.jpg';
import switchBacks from './images/squares/square-22.jpg';

class App extends React.Component {
  constructor() {
    super();
    this.content = [
      {image: portrait, label: 'Dr. K'},
      {image: fish, label: 'Accolades'},
      {image: artMuseum, label: 'Editorial Services'},
      {image: flower, label: 'Rhetorical Origins'},
      {image: samuel, label: 'Rhetoric and Poetics'},
      {image: switchBacks, label: 'Switchbacks'},
      {image: rainDrive, label: 'Haiku Autobiography'},
      {image: pinkFlower, label: 'Index Of Articles'},
      {image: motorcycle, label: 'Six Stories'},
      {image: waterTower, label: 'Fake News'},
      {image: horse, label: 'Living Under Oath'},
      {image: wreath, label: 'Reality Under Oath'},
      {image: rocks, label: 'Union'},
      {image: lightSplatter, label: ''},
      {image: cardinal, label: ''},
      {image: tiredCat, label: ''},
      {image: basketCat, label: ''},
      {image: crayonDrawing, label: ''},
      {image: lightFixture, label: ''},
      {image: pineTree, label: ''},
      {image: lime, label: ''},
      {image: leaves, label: ''},
    ];
    this.state = {};
  }

  buildContentRoutes = () => {
    const links = this.content.filter((item) => item.label).map((item) => ({
                                                                            label: item.label,
                                                                            path: `/${item.label.toLowerCase().replace(/ /g, '-')}`
                                                                          }));
    return links.map(({label, path}) => {
        return (
            <Route path={path} key={label}>
              <Content links={links} label={label} />
            </Route>
        )
      })
  }

  render() {
    return (
      <div className='App'>
        <Switch>
          {this.buildContentRoutes()}
          <Route path="/">
            <Home images={this.content} />
          </Route>
        </Switch>
      </div>
    );
  }
}



function Home(props) {
  let rows = [];
  for (let x = 0; x < props.images.length; x+=4) {
    rows.push(<Row images={props.images.slice(x, x + 4)} />)
  }

  return (
    <div className='App'>
      <div className='header'>
        <h1>WritingUnderOath</h1>
        <h2>Serious Theories of Nonfiction</h2>
      </div>
      <hr/>
      {rows}
      <div className='footer'>
        <p>Footer</p>
      </div>
    </div>
  );
}


function Row(props) {
  return (
    <div className='row'>
      {props.images.map((img) => <Square image={img.image} label={img.label} />)}
    </div>
  )
}

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false
    };
  }

  render() {
    const label = this.props.label;
    const image =
      <img
        src={this.props.image}
        alt={label}
        onMouseOver={() => this.setState( {hovered: true} )}
        onMouseOut={() => this.setState( {hovered: false} )} />;

    return (
      <div className='square'>
        {label ? <Link to={`/${label.toLowerCase().replace(/ /g, '-')}`}>{image}</Link> : image}
        <span className={this.state.hovered ? 'square-label-hover' : 'square-label'}>{label}</span>
      </div>
    )
  }
}

function NavBox(props) {
  return (
    <div className='nav-box'>
      <Link to='/' className='nav-link'>Home</Link>
      {props.links.map(({label, path}) => <Link to={path} className={label === props.selected ? 'nav-link-selected' : 'nav-link'} key={label}>{label}</Link>)}
    </div>
  )
}

function Content(props) {
  return (
    <div className='=App'>
      <NavBox links={props.links} selected={props.label}/>
    </div>
  )
}

export default App;
