// importing React
import React, {Component} from 'react';
//importing the links from react-router
import {BrowserRouter as Router, Route} from 'react-router-dom';
//creating a class which extends a component
export default class Board extends Component {
    //rendering row from for loop

    renderRow(){
        //declaring the row variable
        var row = [];
        //for loop syntax
        for (var i=0; i < 10; i++) {
            //pulling the information out of the table
            row.push(<td>:-)</td>)
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
            rows.push(this.renderRow())
        }
        // return the rows
        return rows
    }
    // rendering table
    render(){
        // declaring the rows variable
        var renderRows =[];
        return(
            <table>
            {/*html tag for table row*/}
                {/*rendering Rows*/}
                {this.renderRows()}
                {/*html tag for table row*/}
            </table>
        )
    }
}
