import React, { Component } from 'react';
import { BrowserRouter as Router, Route, /*Link, */Switch } from "react-router-dom";
import Login from './Container/Login';
import Register from './Container/Register';
import MuiDashboard from './Container/MuiDashboard';
// import AskInput from './Components/AskInput';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/user/login" component={Login} />
            <Route exact path="/user/register" component={Register} />
            <Route exact path="/user/:email" component={MuiDashboard} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
