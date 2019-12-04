import React, { Component } from 'react';
import './BoxDraw.scss';

// const tab = [['1', '2'],['3', '4']];
// console.log(tab[1][1])

export class BoxDraw extends Component {
    constructor(props) {
        super(props)
        this.state = {
            colorArray: ['#173f5f', '#20639b', '#3caea3', '#f6d55c', '#ed553b'],
            boxColorSelected: [],
            boxIdSelected: 0,
            boxRowSelected: 0,
            rowCount: 5,
            cellCount: 10,
            score: 0
        }
    }

    componentDidMount() {
        const box = document.getElementsByClassName('box-container__box');
        console.log(box[0].style)
        console.log(box.length)

        for (let x = 0; x < box.length; x++) {
            box[x].style.backgroundColor = this.state.colorArray[Math.floor(Math.random() * this.state.colorArray.length)]; //set random colors for boxes
            box[x].id = x; //set uniqe ID for all boxes
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.score !== prevState.score) {
            this.props.handler(this.state.score)
        }
    }

    handleClick = async (e) => {
        console.log('cell is:' + e.target.getAttribute('cell'), 'row is:' + e.target.getAttribute('row'), 'color is:' + e.target.style.backgroundColor)

        await this.setState({
            boxColorSelected: e.target.style.backgroundColor,
            boxIdSelected: e.target.getAttribute('cell'),
            boxRowSelected: e.target.getAttribute('row')
        });

        this.colorCheck(parseInt(this.state.boxIdSelected), parseInt(this.state.boxRowSelected), this.state.boxColorSelected)
    }

    colorCheck = (cell, row, colorId) => {
        //sprawdzenie czy poza zakresem planszy
        if (cell < this.state.cellCount && row < this.state.rowCount) {

            console.log('cell', cell, 'row', row, 'colorId', colorId)

            //góra czek
            if (row > 0) {
                if (colorId === document.querySelectorAll(`div[row="${row - 1}"][cell="${cell}"]`).item(0).style.backgroundColor) {
                    console.log('góra');
                    document.querySelectorAll(`div[row="${row}"][cell="${cell}"]`).item(0).style.backgroundColor = 'white'
                    document.querySelectorAll(`div[row="${row - 1}"][cell="${cell}"]`).item(0).style.backgroundColor = 'white'
                    this.colorCheck(cell, row - 1, colorId);
                    this.setState({
                        ...this.state.score,
                        score: this.state.score + 1
                    });
                }
            }
            //dół czek
            if (row < this.state.rowCount - 1) {
                if (colorId === document.querySelectorAll(`div[row="${row + 1}"][cell="${cell}"]`).item(0).style.backgroundColor) {
                    console.log('doł');
                    document.querySelectorAll(`div[row="${row}"][cell="${cell}"]`).item(0).style.backgroundColor = 'white'
                    document.querySelectorAll(`div[row="${row + 1}"][cell="${cell}"]`).item(0).style.backgroundColor = 'white'
                    this.colorCheck(cell, row + 1, colorId);
                    this.setState({
                        ...this.state.score,
                        score: this.state.score + 1
                    });
                }
            }

            //prawo czek
            if (cell < this.state.cellCount - 1) {
                if (colorId === document.querySelectorAll(`div[row="${row}"][cell="${cell + 1}"]`).item(0).style.backgroundColor) {
                    console.log('prawo');
                    document.querySelectorAll(`div[row="${row}"][cell="${cell}"]`).item(0).style.backgroundColor = 'white'
                    document.querySelectorAll(`div[row="${row}"][cell="${cell + 1}"]`).item(0).style.backgroundColor = 'white'
                    this.colorCheck(cell + 1, row, colorId);
                    this.setState({
                        ...this.state.score,
                        score: this.state.score + 1
                    });
                }
            }

            //lewo czek
            if (cell > 0) {
                if (colorId === document.querySelectorAll(`div[row="${row}"][cell="${cell - 1}"]`).item(0).style.backgroundColor) {
                    console.log('lewo');
                    document.querySelectorAll(`div[row="${row}"][cell="${cell}"]`).item(0).style.backgroundColor = 'white'
                    document.querySelectorAll(`div[row="${row}"][cell="${cell - 1}"]`).item(0).style.backgroundColor = 'white'
                    this.colorCheck(cell - 1, row, colorId);
                    this.setState({
                        ...this.state.score,
                        score: this.state.score + 1
                    });
                }
            }
        }
    }

    render() {
        let boxLine = [];
        for (let y = 0; y < this.state.rowCount; y++) {
            let box = [];
            for (let i = 0; i < this.state.cellCount; i++) {
                box.push(<div className="box-container__box" onClick={this.handleClick} row={y} cell={i} key={i}></div>);
            }
            boxLine.push(
                <div className="box-container__line" key={y}>
                    {box}
                </div>
            )
        }
        return (
            <div className="box-container">
                {boxLine}
            </div>
        )
    }
}
