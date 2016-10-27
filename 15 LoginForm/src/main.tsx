import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {App} from './app';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import {LoginPage} from './pages/login';
import {PageB} from './pages/b';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route  path="/" component={App} >
      <IndexRoute component={LoginPage}/>
      <Route path="/login" component={LoginPage} />
      <Route path="/pageB"  component={PageB} />
    </Route>
  </Router>

  , document.getElementById('root'));
