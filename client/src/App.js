import React from "react";
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Content from './Content';
import Footer from './footer';
import squares from './content/squares';

function App(props) {
  const buildContentRoutes = () => {
    const links = squares.filter((item) => item.label);
    return links.map(({label, path}) => {
        return (
            <Route exact path={`/${path}`} key={label}>
              <Content links={links} name={label} />
            </Route>
        )
      })
  }

  return (
    <div className='App'>
      <Switch>
        {buildContentRoutes()}
        <Route path="/">
          <Home content={squares} />
        </Route>
      </Switch>
    </div>
  );
}

function Home(props) {
  const buildRows = () => {
    let rows = [];
    for (let x = 0; x < props.content.length; x+=4) {
      rows.push(<Row content={props.content.slice(x, x + 4)} />)
    }
    return rows;
  }

  return (
    <div className='App'>
      <div className='header'>
        <p className='title'>WritingUnderOath</p>
        <p className='sub-title'>Serious Theories of Nonfiction</p>
      </div>
      <hr/>
      {buildRows()}
      <Footer />
    </div>
  );
}


function Row(props) {
  return (
    <div className='row'>
      {props.content.map((item) => <Square
                                      image={item.image}
                                      label={item.label}
                                      path={item.path} />
                                    )}
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
    const image = (
      <img
        src={this.props.image}
        alt={label}
        className='square'
        onMouseOver={() => this.setState( {hovered: true} )}
        onMouseOut={() => this.setState( {hovered: false} )} />
    );

    return (
      <div>
        {label ? <Link to={this.props.path}>{image}</Link> : image}
        <p className={this.state.hovered ? 'square-label-hover' : 'square-label'}>{label}</p>
      </div>
    )
  }
}

export default App;
