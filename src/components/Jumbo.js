import React, { Component } from 'react';

class Jumbotron extends Component {
    render() {
      return(
        <div className="Jumbo">
            <img className='Battleship' src={ require('../images/battleship.jpg') } />
        </div>
        )

    }
}

export default Jumbotron;
