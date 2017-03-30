import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Redirect, Router, Route, HashRouter} from 'react-router-dom';
import {LoginPage} from './pages/login';
import {PageB} from './pages/b';
import {history} from './history'



ReactDOM.render(
  <HashRouter>
    <Router history={history} >    
        <div>  
          <Redirect from="/" to="/login"/>  
          <Route exact={true} path="/login" component={LoginPage}/>
          <Route path="/pageB" component={PageB}/>
        </div>
    </Router>    
  </HashRouter>

,
  document.getElementById('root')
);
