import React, { Component } from 'react';
import './App.css';
import keycloak from './Components/keycloak/keycloak.jsx'

import { Route, Link, browserHistory, HashRouter,BrowserRouter } from 'react-router-dom'

class App extends Component {


  render() {
    return (
      
        <BrowserRouter>
            <div className="App">
        <Route exact path="/" component={keycloak}></Route>
       </div>
       </BrowserRouter>
    
    );
  }
}

export default App;
