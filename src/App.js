import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Board from './components/Board.js';
import Jumbotron from './components/Jumbo.js';


class App extends Component {
  render() {
    return (
      <Router>
          <div>
          <Jumbotron />
          <h4 className='instructions'>
              Play Battleship! Click squares to launch torpedoes and try to hit each of five battleships. <br /> <br/>
              If you don't find all five battleships in 50 tries, the game is over. Good luck!
          </h4>
          <Route path = "/" component={Board}/>
          </div>
      </Router>
    );
  }
}

export default App;
