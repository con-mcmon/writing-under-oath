import React from "react";
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Document, Page } from 'react-pdf';
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

// import drKContent from './content/dr-k-content.html';

class App extends React.Component {
  constructor() {
    super();
    this.content = [
      {image: portrait, label: 'Dr. K', path: 'dr-k'},
      {image: fish, label: 'Accolades', path: 'accolades'},
      {image: artMuseum, label: 'Editorial Services', path: 'editorial-services'},
      {image: flower, label: 'Rhetorical Origins', path: 'rhetorical-origins'},
      {image: samuel, label: 'Rhetoric and Poetics', path: 'rhetoric-and-poetics'},
      {image: switchBacks, label: 'Switchbacks', path: 'switchbacks'},
      {image: rainDrive, label: 'Haiku Autobiography', path: 'haiku-autobiography'},
      {image: pinkFlower, label: 'Index Of Articles', path: 'index-of-articles'},
      {image: motorcycle, label: 'Six Stories', path: 'six-stories'},
      {image: waterTower, label: 'Fake News', path: 'fake-news'},
      {image: horse, label: 'Living Under Oath', path: 'living-under-oath'},
      {image: wreath, label: 'Reality Under Oath', path: 'reality-under-oath'},
      {image: rocks, label: 'Union', path: 'union'},
      {image: lightSplatter},
      {image: cardinal},
      {image: tiredCat},
      {image: basketCat},
      {image: crayonDrawing},
      {image: lightFixture},
      {image: pineTree},
      {image: lime},
      {image: leaves},
    ];
    this.state = {};
  }

  buildContentRoutes = () => {
    const links = this.content.filter((item) => item.label);
    return links.map(({label, path}) => {
        return (
            <Route path={`/${path}`} key={label}>
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
            <Home content={this.content} />
          </Route>
        </Switch>
      </div>
    );
  }
}



function Home(props) {
  let rows = [];
  for (let x = 0; x < props.content.length; x+=4) {
    rows.push(<Row content={props.content.slice(x, x + 4)} />)
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
        onMouseOver={() => this.setState( {hovered: true} )}
        onMouseOut={() => this.setState( {hovered: false} )} />
    );

    return (
      <div className='square'>
        {label ? <Link to={this.props.path}>{image}</Link> : image}
        <span className={this.state.hovered ? 'square-label-hover' : 'square-label'}>{label}</span>
      </div>
    )
  }
}

function Content(props) {
  let content;
  switch(props.name) {
    case 'Dr. K':
      content = <DrKContent />;
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
  const content = [
    {
      header: 'Education',
      listItems: [
        'Ph.D. Union Institute & University, Creative Writing: Nonfiction: 2006',
        'M.F.A. Goucher College, Journalism: Print Media: 2000',
        'B.S. Philosophy: American Analytical, University at Oneonta/NY: 1991'
      ]
    },
    {
      header: 'Professional Positions',
      listItems: [
        'Substitute Teacher: Otsego County: Cooperstown, Laurens, Milford, K-12: 2018-Present',
        'Founder and Publisher: WritingUnderOath. Scholarly Journal: 2012',
        'Lecturer, SUNY/New Paltz: 2016',
        'Associate Professor: Empire College: 2014',
        'Adjunct Professor, SUNY/Albany: 2012',
        'Rockland Community College, NY: 2012',
        'Adjunct Professor, Fordham University: 2006',
        'Adjunct Professor, Ramapo College of New Jersey: 2003-2010',
        'Adjunct Professor, SUNY/Oneonta: 1999-2006',
        'Adjunct Professor, Morris County Community College: 2004-2010',
        'Editor, Specialty Book Marketing: 1985-2012',
        'Senior Editor, Seeley’s Publications: 1996-1998',
        'Reporter, The Freeman’s Journal: 1994-1996',
        'Reporter, Research Alert, Queens NY: 1989-1992',
        'Commentator, National Public Radio: Marketplace: 1989-1991',
        'Founder and Publisher, Marketing to Women: 1987-1992',
        'Founder and Publisher, 1-800-75 WOMEN Kurtz Research: 1987-1992',
        'Publisher’s Rep, Audubon, Harvard Business Review, Sew News, American Demographics, Curpier Co.: 1982-1988'
      ]
    },
    {
      header: 'Professional Associations',
      listItems: [
        'Association for the Study of Literature and Environment',
        'Editorial Freelancers Association'
      ]
    },
    {
      header: 'Community, Civic, and Professional Services',
      listItems: [
        'Committee On Special Education',
        'Habitat for Humanity',
        'Oblate, Saint John Baptist',
        'Lecture, St. Mary’s Catholic Church'
      ]
    },
    {
      header: 'Awards and Recognitions',
      listItems: [
        '1992: Boston Marathon, 3:30:38, Women Overall: 349',
        '1991: New York City Marathon, 3:25:33, Women Overall: 219',
        '1991: Academic Achievement Award: Philosophy, SUNY/ Oneonta'
      ]
    },
    {
      header: 'Scholarly Activities: Books',
      listItems: [
        '2012: Metaphorical Nonfictions @ amazon',
        '2005: Kiss Me Goodnight. Tachycardia.',
        '2006: Six Stories: Suicide by Jumping; Switchbacks @ amazon',
        '2006: Switchbacks: Ascending the Catskill Mountain High Peaks @ amazon',
        '1990: Marketing to Women in the 1990s. FIND SVP, NYC: 1991',
        '1992: Marketing Cars to Women. Mademoiselle, Conde Nast Publications, NYC: 1990',
        '1990: Marketing Media to Women. Kurtz Research, Oneonta NY: 1988'
      ]
    },
    {
      header: 'Editor',
      listItems: [
        '2019: Warrior Ethos: The Path of Trauma. Michael McCafferty',
        '2017: Designer. A Journey Toward Environmental Stewardship. Michael Zagata',
        '2012: WritingUnderOath.com. Scholarly Journal. Theories of Nonfiction',
        '1995: Digest for the Successful Aquarium. ed. TetraWerke: Melle Germany',
        '1995: Baseball Card Annual. Specialty Book Marketing, New York NY',
        '1994: Egyptian Book of the Dead: The Book of Going Forth by Day. Text Input. Chronicle Books: SF, CA'
      ]
    },
    {
      header: 'Essays and Articles',
      listItems: [
        '“Essay Topography.” SNR Review (Winter 2007) http://www.snreview.org/0407Kurtz.html',
        '“Doll Watching: New Faces at Home in Doll City.” Doll Artisan, ed. (Aug/Sep): 1996',
        '“The Right Head for the Job,” Doll Pro, ed. (Jul/Aug): 1996',
        '',
        '“Workingwoman.” Marketing to Women 3:4 (Jan.): 1990',
        '“Women of the 90s.” Marketing to Women 3:5 (Feb.): 1990',
        '“Home Decorating.” Marketing to Women 3:6 (Mar.): 1990',
        '“Tidbits.” The Women’s Poll, ed. 3:4 (Jan.) USA Today: 1990',
        '',
        '“Women Entrepreneurs.” The Women’s Poll, ed. 2:13 (Oct.) USA Today: 1989',
        '“Women and Their Jobs.” The Women’s Poll, ed. 2:12 (Sept) USA Today: 1989',
        '“Saving Money.” The Women’s Poll, ed. 2:11 (Aug.) USA Today: 1989',
        '“Time is a Valuable Resource.” The Women’s Poll, ed. 2:10 (July) USA Today: 1989',
        '“Entering Male Professions.” Marketing to Women 2:1 (Jan.): 1989',
        '“Cosmetics for Career Women.” Marketing to Women 2:2 (Feb.): 1989',
        '“Convenience Nutrition.” Marketing to Women 2:3 (Mar.): 1989',
        '“Media Habits.” Marketing to Women 2:4 (Apr.): 1989',
        '“On Trial.” Marketing to Women 2:5 (May.): 1989',
        '“Modern Motherhood.” Marketing to Women 2:6 (Jun.): 1989',
        '“The Nurse Curse.” Marketing to Women 2:7 (Jul.): 1989',
        '“Unarmed Forces.” Marketing to Women 2:8 (Aug.): 1989',
        '“Baby Jamboree.” Marketing to Women 2:9 (Sep.): 1989',
        '“Women of the Cosmos.” Marketing to Women 2:10 (Oct.): 1989',
        '“Self Health.” Marketing to Women 2:11 (Nov.): 1989',
        '“Compendium of Trends.” Marketing to Women 2:12 (Dec.): 1989',
        '',
        '“Planning for Happiness.” WomenScope: Surveys of Women 2:4 (Jan.): 1988',
        '“Strutting Around.” WomenScope: Surveys of Women 2:5 (Feb.): 1988',
        '“Bookwormen.” WomenScope: Surveys of Women 2:6 (Mar.): 1988',
        '“Marketing Newspapers to Women.” WomenScope: Surveys of Women 2:7 (Apr.): 1988',
        '“Stealthy Wealthy.” Marketing to Women 2:8 (May): 1988',
        '“Steam Bath Mummies.” Marketing to Women 2:9 (Jun.): 1988',
        '“The Tax Ax.” Marketing to Women 2:10 (Jul.): 1988',
        '“Marketing Magazines to Women.” Marketing to Women 2:11 (Aug.): 1988',
        '“Canadian Cosmetics.” Marketing to Women 2:12 (Sept.): 1988',
        '“Marketing Radio to Women.” Marketing to Women 2:13 (Oct.): 1988',
        '“Penwomanship.” Marketing to Women 3:2 (Nov.): 1988',
        '“Compendium of Trends.” Marketing to Women 3:3 (Dec.): 1988',
        '',
        '“Women Will Elect the Next President.” Marketing to Women (July): 1987',
        '“New Sexual Revolution and Fertility.” Marketing to Women 1:1 (Oct.): 1987',
        '“Women in the Year 2000.” Marketing to Women 1:2 (Nov.): 1987',
        '“Facts About Childcare.” Marketing to Women 1:3 (Dec.): 1987',
      ]
    },
    {
      header: 'Papers and Professional Presentations',
      listItems: [
        '1999: “Natural History of the Adirondacks,” Huntington Library Lecture Series, Oneonta NY',
        '1990: “Women in the 1990s,” Annual Kentucky Riverboat Cruise, Redbook, New York NY',
        '1989: "Marketing Newspapers to Women,” Scripps Howard, Editor’s Conference, Cincinnati '
      ]
    },
    {
      header: 'Writing Consultations',
      listItems: [
        '2005: Scholarship, Narrative Journalism, Conference, Harvard University, Cambridge, MA',
        '1998: Goucher College: Richard Selzer, Edmund Morris, Tracy Kidder, William Least Heat Moon, John McPhee, Vivian Gornick, Susan Orlean, Mark Singer',
        '1999: Goucher College: George Plimpton, Joyce Carol Oats, Tom French, Barry Lopez, Terry Tempest Williams, Gay Talease, Alex Kotlowitz, Madison Smartt Bell'
      ]
    },
    {
      header: 'Interviews and Commentaries',
      listItems: [
        '“Beware the Investor,” Finance Series part V, Entrepreneurial Woman (Jan/Feb): 1991',
        '“The Future of Women.” Lecture Series with: Planned Parenthood with Faye Waddleton, Pres., Betty Friedan, Ada Deer, Wilma Mankiller, Chief Cherokee Nation. Windows on the World, World Trade Center, New York NY: 1989',
        '',
        '“Advertising to Women.” Marketplace. American Public Radio (Jan.): 1991',
        '',
        '“Business Travel.” Marketplace. American Public Radio (Feb.): 1990',
        '“Daughter and Family Business.” Marketplace. American Public Radio: (Mar.): 1990',
        '“Day Care Health Insurance.” Marketplace. American Public Radio (Apr.): 1990',
        '“Diversity.” Marketplace. American Public Radio (May): 1990',
        '“Forms and Colors.” Marketplace. American Public Radio (Jun.): 1990',
        '“Going to the Movies.” Marketplace. American Public Radio (Jul.): 1990',
        '“Handwriting.” Marketplace. American Public Radio (Aug.): 1990',
        '“Lingerie.” Marketplace. American Public Radio (Sep.): 1990',
        '“Marketing Newspapers.” Marketplace. American Public Radio (Oct.): 1990',
        '“Marketing Radio.” Marketplace. American Public Radio (Nov.): 1990',
        '“Men Have It Better.” Marketplace. American Public Radio (Dec.): 1990',
        '',
        '“New Diversity.” Marketplace. American Public Radio (1-22): 1989',
        '“The Fetal Position.” Marketplace. American Public Radio (Feb.): 1989',
        '“The Old Women’s Movement.” Marketplace. American Public Radio (3-20): 1989',
        '“Ties That Bind.” Marketplace. American Public Radio (4-13): 1989',
        '“Volunteered Time.” Marketplace. American Public Radio (5-22): 1989',
        '“Women and the Financial Industry.” Marketplace. American Public Radio (7-26): 1989',
        '“Women Entrepreneurs.” Marketplace. American Public Radio (7-26): 1989',
        '“Women Grin and Bear It.” Marketplace. American Public Radio (8-23): 1989',
        '“Women Have It Worse.” Marketplace. American Public Radio (10-11): 1989',
        '“Women’s Ads Market Drive.” Marketplace. American Public Radio (10-18): 1989'
      ]
    },
    {
      header: 'Interdisciplinary Scholarship: Poetry',
      listItems: [
        '“Stream Excrement” SNR Review, 2008',
        '“Tachycardia” Kiss Me Goodnight: Stories and Poems by Women Who Were Girls When Their Mothers Died. Ann O’Fallon and Margaret Vaillancourt, eds. Syren: Minneapolis, MN, 2004. pp. 67-77',
        '“Sleep” Hudson Valley Echoes 20 (Spring):12, 1991. LaGrangeville NY',
        '“Last October” Sunrust 90 (Winter): 53. New Wilmington PA'
      ]
    },
    {
      header: 'Courses Taught',
      listItems: [
        'Composition 100',
        'Composition 200 ',
        'Honors Classes',
        'Flash Fiction',
        'Writing Workshops',
        'Analytical Writing',
        'American Literature',
        'Creative Writing',
        'Children’s Literature',
        'Intro to Literature',
        'Creative Nonfiction',
        'Short Story',
        'Advanced Composition',
        'Women and Nature',
        'Modern Fiction',
        'Writing Intensives',
        'Cinema Studies',
        'American Literature',
        'Writing for the Media',
        'Media Ethics',
        'Mystery and Detective Fiction',
        'College English',
        'Intro to Journalism',
        'World Lit I, II, III',
        'Creative Nonfiction',
        'Modern FictionCollege',
        'English I, II',
        'Idea Development',
        'Writing for Publication',
        'International English',
        'Narrative Theory',
        'Writing Workshops'
      ]
    }
  ];

  const renderContents = content.map(({header, listItems}) => {
    return(
      <div>
        <h3>{header}</h3>
        <hr/>
        <ul>
          {listItems.map((item) => <li>{item}</li>)}
        </ul>
      </div>
    )
  });

  return (
    <div>
      <h3>CURRICULUM VITAE</h3>
      <br/>
      <hr/>
      {renderContents}
    </div>
  )
}

export default App;
