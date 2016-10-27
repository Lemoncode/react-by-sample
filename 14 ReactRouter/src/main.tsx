import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {App} from './app';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import {PageA} from './pageA';
import {PageB} from './pageB';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route  path="/" component={App} >
      <IndexRoute component={PageA}/>
      <Route path="/pageA" component={PageA} />
      <Route path="/pageB"  component={PageB} />
    </Route>
  </Router>

  , document.getElementById('root'));
