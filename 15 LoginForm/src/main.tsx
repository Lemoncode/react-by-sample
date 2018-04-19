import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { LoginPage } from './pages/login';
import { PageB } from './pages/b';

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route exact={true} path="/" component={LoginPage} />
      <Route path="/pageB" component={PageB} />
    </Switch>
  </HashRouter>
  , document.getElementById('root')
);
