import React from 'react';
import {BrowserRouter as Router, Route, Redirect,} from 'react-router-dom';
import {Login} from './pages/Login';

function  App(){



  return(
      <Router>
          <Route exact path="/login" component={Login} />
          <Redirect from="/" to="/login" />
      </Router>

  )

}
export default App
