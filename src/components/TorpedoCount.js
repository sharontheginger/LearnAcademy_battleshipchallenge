import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

class TorpedoCount extends Component {
    render() {
        const { fired, remaining, hit } = this.props

        return (
            <div className= "Count">
                <h3>Torpedoes Hit: {hit}</h3>
                <h3>Torpedoes Fired: {fired}</h3>
                <h3>Torpedoes Left: {remaining}</h3>
            </div>
        );
    }
}

export default TorpedoCount;
