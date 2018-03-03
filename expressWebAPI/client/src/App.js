import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Login from './Container/Login';
import Register from './Container/Register';
import MuiDashboard from './Container/MuiDashboard';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/users/login" component={Login} />
            <Route exact path="/users/register" component={Register} />
            <Route exact path="/users/:email" component={MuiDashboard} />
          </Switch>
        </Router>

        {/* <Dashboard email="user@www.com" />
        <Link src="/login" component={Login} /> */}
      </div>
    );
  }
}

export default App;
