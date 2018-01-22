import React, { Component } from 'react';
import './App.css';
import Board from './Board.js';
import {BrowserRouter as Router, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
          <div className="App">
          <Route path = "/" component={Board}/>
          </div>
      </Router>
    );
  }
}

export default App;
