import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Router, Route, HashRouter} from 'react-router-dom';
import {createHashHistory} from 'history';
import {PageA} from './pageA';
import {PageB} from './pageB';

const history = createHashHistory();

ReactDOM.render(
  <HashRouter>
    <Router history={history} >    
        <div>    
          <Route exact={true} path="/" component={PageA}/>
          <Route path="/pageB" component={PageB}/>
        </div>
    </Router>    
  </HashRouter>

,
  document.getElementById('root')
);
