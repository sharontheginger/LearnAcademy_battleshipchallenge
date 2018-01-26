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
            torpedoTotalCount: 9,
            torpedoesFired: 0,
            torpedoesHit: 0,
            differentShips: 0,
            alreadyClicked:0,
            board: this.setupBoard()
        }
    }

    componentWillMount() {
        for (let i = 0; i < 5; i++) {
            this.placeShip(3)
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

    placeShip(size) {
        const copyOfBoard = this.state.board

        // find random cell
        var row = Math.floor(Math.random()*10)
        var col = Math.floor(Math.random()*10)

        // check if we can place the ship -- if true then place the ship
        if(this.isEmpty(copyOfBoard, row, col, size) === true) {
            for(let i = 0; i < size; i++) {
                copyOfBoard[row][col+i] = SHIP
            }
        } else {
            this.placeShip(size)
        }

        this.setState({
            board: copyOfBoard
        })
    }

    isEmpty(board, row, col, size) {
        for(let i = 0; i < size; i++) {
            // console.log("row:", row, "column:", col, "ship space:", i, " = ", col+i)

            if (board[row][col+i] === SHIP || board[row][col+i] === undefined) {
                return false
            }
        }

        return true
    }

    handleClick(row, col) {
        const { board } = this.state

        if (this.state.torpedoesFired >= 9){
            alert("Game Over!")
        } else if (board[row][col] === SHIP) {
            this.setState({
                board: board,
                torpedoesHit: this.state.torpedoesHit + 1,
                torpedoesFired: this.state.torpedoesFired + 1,
                torpedoTotalCount: this.state.torpedoTotalCount - 1
            })

            board[row][col] = HIT
        } else if (board[row][col] === EMPTY) {
            this.setState({
                board: board,
                torpedoesFired: this.state.torpedoesFired + 1,
                torpedoTotalCount: this.state.torpedoTotalCount - 1})
            board[row][col] = MISS
        } else {
            alert("ALREADY CLICKED!")
        }
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

