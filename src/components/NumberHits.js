import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

class NumberHits extends Component {
  render() {
    return (
        <div>
            <h2>Number of hits: {this.props.hitsCount}</h2>
        </div>

    )
  }
}

export default NumberHits;
