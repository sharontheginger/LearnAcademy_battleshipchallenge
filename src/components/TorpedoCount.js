import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

class TorpedoCount extends Component {
    render() {
        const { fired, remaining, hit } = this.props

        return (
            <div>
                <h2>Torpedoes Hit: {hit}</h2>
                <h2>Torpedoes Fired: {fired}</h2>
                <h2>Torpedoes Left: {remaining}</h2>
            </div>
        );
    }
}

export default TorpedoCount;
