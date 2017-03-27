import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {App} from './app';
import {Router, Route, HashRouter} from 'react-router-dom';
import {PageA} from './pageA';
import {PageB} from './pageB';

ReactDOM.render(
  <HashRouter>
    <Router history="">    
        <div>    
          <Route path="/" component={PageA}/>
          <Route path="/pageB" component={PageB}/>
        </div>
    </Router>    
  </HashRouter>

,
  document.getElementById('root')
);
