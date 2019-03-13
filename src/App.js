import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';
import Button from '@material-ui/core/Button';

class App extends Component {
  render() {
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header
            mdl-layout--fixed-tabs">
        <header className="mdl-layout__header">
          <div className="mdl-layout__tab-bar mdl-js-ripple-effect">
          <h1 className="mdl-layout-title">Spotify</h1>

          </div>

        </header>
        <main>
          <Button variant="contained" color="secondary" size="large" spacing="500" component={Link} to="/">
              Landing
          </Button>
          <Button variant="contained" color="secondary" size="large" component={Link} to="/library">
          library
          </Button>

          <Route exact path="/" component={Landing} />
          <Route path="/library" component={Library} />
          <Route path="/album/:slug" component={Album} />
        </main>


      </div>
    );
  }
}

export default App;
