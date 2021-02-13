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

class App extends React.Component {
  constructor() {
    super();
    this.images = [
      portrait,
      fish,
      artMuseum,
      flower,
      samuel,
      leaves,
      rainDrive,
      pinkFlower,
      motorcycle,
      waterTower,
      horse,
      wreath,
      rocks,
      lightSplatter,
      cardinal,
      tiredCat,
      basketCat,
      crayonDrawing,
      lightFixture,
      pineTree,
      lime
    ];
    this.state = {};
  }

  render() {
    return (
      <div className='App'>
        <div className='header'>
          <h1>WritingUnderOath</h1>
        </div>

        <Row images={this.images.slice(0,4)} />
        <Row images={this.images.slice(4,8)} />
        <Row images={this.images.slice(8,12)} />
        <Row images={this.images.slice(12,16)} />
        <Row images={this.images.slice(16,20)} />

        <div className='footer'>
          <p>Footer</p>
        </div>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    );
  }

}

function Row(props) {
  return (
    <div className='row'>
      {props.images.map((img) => <Square image={img} />)}
    </div>
  )
}

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='square'>
        <img src={this.props.image} />
      </div>
    )

  }
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

export default App;
