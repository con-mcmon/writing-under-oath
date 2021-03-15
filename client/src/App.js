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

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      windowWidth: window.innerWidth
    }
  }

  componentDidMount = () => {
   window.addEventListener("resize", this.handleResize);
  }

  componentWillUnMount = () => {
   window.addEventListener("resize", this.handleResize);
  }

  handleResize = (e) => {
    console.log(window.innerWidth);
    this.setState({ windowWidth: window.innerWidth });
  };

  buildContentRoutes = () => {
    const links = squares.filter((item) => item.label);
    return links.map(({label, path}) => {
        return (
            <Route exact path={`/${path}`} key={label}>
              <Content links={links} name={label} />
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
            <Home
              content={squares}
              windowWidth={this.state.windowWidth} />
          </Route>
        </Switch>
      </div>
    )
  }
}

function Home(props) {
  const styles = function() {
    const window = props.windowWidth;
    if (window >= 1220) {
      return {
        squares: 4,
        title: 'title title-4',
        subTitle: 'sub-title sub-title-4'
      }
    } else if (window < 1220 && window > 950) {
      return {
        squares: 3,
        title: 'title title-3',
        subTitle: 'sub-title sub-title-3'
      }
    } else if (window < 950 && window > 700) {
      return {
        squares: 2,
        title: 'title title-2',
        subTitle: 'sub-title sub-title-2'
        }
    } else {
      return {
        squares: 1,
        title: 'title title-1',
        subTitle: 'sub-title sub-title-1'
      }
    }
  }();

  const buildRows = () => {
    const length = styles.squares;
    let rows = [];
    for (let x = 0; x < props.content.length; x += length) {
      rows.push(<Row content={props.content.slice(x, x + length)} />)
    }
    return rows;
  }

  return (
    <div>
      <div className='header'>
        <p className={styles.title}>WritingUnderOath</p>
        <p className={styles.subTitle}>Serious Theories of Nonfiction</p>
      </div>
      <hr className='break-home'/>
      {buildRows()}
      <Footer />
    </div>
  );
}


function Row(props) {
  return (
    <div className='square-row'>
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
