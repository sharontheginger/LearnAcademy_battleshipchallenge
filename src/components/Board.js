import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import TorpedoCount from './TorpedoCount.js'
import NumberHits from './NumberHits.js'

const EMPTY = 0
const SHIP = 1
const HIT = 2
const MISS = 3
const SHIPSIZE = [5,4,3,2,1]

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
        console.log("::: CALLED componentWillMount :::");

        this.placeShips()
    }

    notCalled() {
        console.log("::: HEY! I'M BEING CALLED! :::");
    }

    placeShips() {
        console.log("::: CALLED placeShips :::");

        for (let i = 0; i < SHIPSIZE.length; i++) {
            console.log("Placing ship size:" + SHIPSIZE[i])

            var num = Math.floor(Math.random() * 2)

            if (num === 1) {
                this.placeShipHor(SHIPSIZE[i])
            } else {
                this.placeShipVer(SHIPSIZE[i])
            }
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

    placeShipHor(size) {
        const copyOfBoard = this.state.board

        // find random cell
        var row = Math.floor(Math.random()*10)
        var col = Math.floor(Math.random()*10)

        // check if we can place the ship -- if true then place the ship
        if(this.isEmptyHor(copyOfBoard, row, col, size) === true) {
            for(let i = 0; i < size; i++) {
                copyOfBoard[row][col+i] = SHIP
            }
        } else {
            this.placeShipHor(size)
        }

        this.setState({
            board: copyOfBoard
        })
    }

    placeShipVer(size) {
        const copyOfBoard = this.state.board

        // find random cell
        var row = Math.floor(Math.random()*10)
        var col = Math.floor(Math.random()*10)

        // check if we can place the ship -- if true then place the ship
        if(this.isEmptyVer(copyOfBoard, row, col, size) === true) {
            for(let i = 0; i < size; i++) {
                copyOfBoard[row+i][col] = SHIP
            }
        } else {
            this.placeShipVer(size)
        }

        this.setState({
            board: copyOfBoard
        })
    }

    isEmptyHor(board, row, col, size) {
        for(let i = 0; i < size; i++) {
            // console.log("HORIZONTAL:: row:", row, "column:", col+i, "ship space:", i )
            // check that board cell has valid coordinates (row & col of 0-9)
            // only need to check the value that is changing, because the random number
            // generator only provides values 0-9
            if ( board[row][col+i] === undefined  || board[row][col+i] === SHIP ) {
                return false
            }
        }

        return true
    }

    isEmptyVer(board, row, col, size) {
        for(let i = 0; i < size; i++) {
            // console.log("VERTICAL:: row:", row+i, "column:", col, "ship space:", i )
            if (board[row+i] === undefined || board[row+i][col] === SHIP ) {
                return false
            }
        }

        return true
    }

    handleClick(row, col) {
        const { board } = this.state

        if (board[row][col] === SHIP) {
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
        if(this.state.torpedoTotalCount === 0){
            alert("Game Over!")
        }
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
