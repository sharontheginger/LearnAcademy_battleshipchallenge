import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import TorpedoCount from './TorpedoCount.js'
import NumberHits from './NumberHits.js'

const EMPTY = 0
const SHIP = 1
const HIT = 2
const MISS = 3
const SHIPSIZE = [5,4,3,2,1];

export default class Board extends Component {

    constructor(props) {
        super(props)

        this.state = {
            torpedoTotalCount: 50,
            torpedoesFired: 0,
            torpedoesHit: 0,
            differentShips: 0,
            board: this.setupBoard()
        }

        for (var i=0; i < 5; i++) {
            this.placeShip()
        }
    }



    setupBoard() {
        let board = []

        for(let row = 0; row < 10; row++) {
            board[row] = []
            for(let col = 0; col < 10; col++) {
                board[row][col] = EMPTY
            }
        }
        return board
    }

    placeShip() {
        // find random cell
        var row = Math.floor(Math.random()*10);
        var col = Math.floor(Math.random()*10);
        // var maxCol = 10 - SHIPSIZE[ship];
        // var col = Math.floor(Math.random()*maxCol);
        // var row = ship;

        // console.log(this.state.board[row][col])

        // add cells for each multicell ship
        for (var i = 0; i < 3; i++){
            //if the random cell is empty, put a ship there
                if (this.state.board[row][col+i] === EMPTY){
                    // TODO use setState function instead of directly altering state
                    // TODO make sure that the ship can't go over the side of the board
                    this.state.board[row][col+i] = SHIP;
                    // console.log(this.state.board[row][col+shipSquare])
                    console.log(row + "_" + col)
                } else {
                    // if the cell was not empty, try again
                    // TODO need to find a way to control this -- is currently running too many times
                    this.placeShip()
                }
            }
        }

    handleClick(row, col) {
        const { board } = this.state
        if (board[row][col] === SHIP) {
            this.setState({torpedoesHit: this.state.torpedoesHit + 1})
            board[row][col] = HIT
        } else if (board[row][col] === EMPTY) {
            board[row][col] = MISS
        }

        this.setState({
            board: board,
            torpedoesFired: this.state.torpedoesFired + 1,
            torpedoTotalCount: this.state.torpedoTotalCount - 1
        })
    }

    renderRow(row) {
        const { board } = this.state
        var set = [];
        for (var col=0; col < 10; col++) {
            if(board[row][col] === HIT) {
                set.push(<td
                            key={row + "_" + col}
                            onClick={this.handleClick.bind(this, row, col)}
                            className="hit">
                    </td>)
                } else if (board[row][col] === MISS) {
                set.push(<td
                            key={row + "_" + col}
                            onClick={this.handleClick.bind(this, row, col)}
                            className="miss">
                    </td>)
                } else {
                set.push(<td
                            key={row + "_" + col}
                            onClick={this.handleClick.bind(this, row, col)}
                            className="">
                    </td>)
                }
        }

        return <tr key={row}>{set}</tr>
    }

    renderRows() {

        var rows = []
        var renderRow = []
        for(var i=0; i < 10; i++) {
            rows.push(this.renderRow(i))
        }
        return rows
    }

    render() {
        console.log(this.state.board)

        return(
            <div>
                <table className="Gameboard">
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>

                <TorpedoCount
                    hit={this.state.torpedoesHit}
                    fired={this.state.torpedoesFired}
                    remaining={this.state.torpedoTotalCount}/>
            </div>
        )
    }
}
