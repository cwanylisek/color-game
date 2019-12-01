import React, { Component } from 'react';
// import { Route } from 'react-router';
import { Board } from './containers/Board/Board';
import { ScoreCounter } from './containers/ScoreCounter/ScoreCounter';
import './App.scss';

export default class App extends Component {
    constructor(props) {
        super(props)
        
    }

    render() {
        return(
            <div className="App">
                <ScoreCounter />
                <Board />
            </div>
        )
    }
}