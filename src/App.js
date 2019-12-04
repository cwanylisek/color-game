import React, { Component } from 'react';
// import { Route } from 'react-router';
import { BoxDraw } from './components/BoxDraw/BoxDraw';
import { ScoreCounter } from './containers/ScoreCounter/ScoreCounter';
import './App.scss';

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            scorePoints: 0
        }
    }

    handlerScorePoints = (scorePoints) => {
        this.setState(() => ({
            scorePoints
        }))
    }

    render() {
        return(
            <div className="App">
                <ScoreCounter score={this.state.scorePoints} />
                <BoxDraw handler={this.handlerScorePoints} />
            </div>
        )
    }
}