// importing React
import React, {Component} from 'react';
//importing the links from react-router
import {BrowserRouter as Router, Route} from 'react-router-dom';
//creating a class which extends a component
const ship = 1
export default class Board extends Component {
    //rendering row from for loop

    constructor(props) {
        super(props);
        this.state={
            board:[],
        }
        // this.handleClick=this.handleClick.bind(this);
        this.setupBoard()
        for (var i=0; i < 5; i++) {
            this.placeShip()
        }
    }
    setupBoard(){
        for (var i=0; i < 10; i++){
            this.state.board.push([])

        }
    }

    placeShip(){
        var x=Math.floor(Math.random()*10);
        var y=Math.floor(Math.random()*10);
        if (!this.state.board[x][y] || this.state.board[x][y].length === 0){
            this.state.board[x][y] = ship
        } else {
            this.placeShip()
        }
    }

    handleClick(){
        this.setState({})
    }
    renderRow(rowNumber){
        //declaring the row variable
        var row = [];
        //for loop syntax
        for (var i=0; i < 10; i++) {
            //pulling the information out of the table
            row.push(<td id={i + "_" + rowNumber} onClick={this.handleClick.bind(this)}>{
                this.state.board[rowNumber][i]}</td>)
        }
        //returns the row
        return <tr>{row}</tr>
    }
    // rendering rows from for loop
    renderRows(){
        // declaring the rows variable
        var rows =[];
        // declaring the renderRow variable
        var renderRow =[];
        // for loop syntax
        for(var i=0; i < 10; i++) {
            //pulling the information out of the row table above
            rows.push(this.renderRow(i))
        }
        // return the rows
        return rows
    }
    // rendering table
    render(){
        // declaring the rows variable
        var renderRows =[];
        return(
            <table className="Gameboard">
            {/*html tag for table row*/}
                {/*rendering Rows*/}
                {this.renderRows()}
                {/*html tag for table row*/}
            </table>
        )
    }
}
