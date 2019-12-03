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
            boxRowSelected: 0
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

    handleClick = async (e) => {
        console.log('box id:' + e.target.id, 'row is:' + e.target.getAttribute('row'), 'color is:' + e.target.style.backgroundColor)
        const toNumId = parseInt(e.target.id); //parse to num

        // console.log(document.getElementById(toNumId - 10).style.backgroundColor, 'up');
        // console.log(document.getElementById(toNumId + 10).style.backgroundColor, 'down');
        // console.log(document.getElementById(toNumId - 1).style.backgroundColor, 'left');
        // console.log(document.getElementById(toNumId + 1).style.backgroundColor, 'right');
        await this.setState({
            boxColorSelected: e.target.style.backgroundColor,
            boxIdSelected: e.target.id,
            boxRowSelected: e.target.getAttribute('row')
        });
        this.colorCheck(this.state.boxIdSelected, this.state.boxColorSelected, this.state.boxRowSelected)
    }

    colorCheck = (id, colorId, row) => {
        const idNum = parseInt(id)
        console.log('wykonany', idNum, id, row)

        switch (colorId) {

            case document.getElementById(idNum + 1).style.backgroundColor:
                console.log(true, 'color check right');
                document.getElementById(idNum).style.backgroundColor = 'orange';
                document.getElementById(idNum + 1).style.backgroundColor = 'orange';
                let number = document.getElementById(idNum + 1).id
                console.log(number, 'trzeci box do sprawdzenia')
                this.colorCheck(document.getElementById(idNum + 1).id, colorId, row);
                break;

            case document.getElementById(idNum - 1).style.backgroundColor:
                console.log(true, 'color check left');
                document.getElementById(idNum - 1).style.backgroundColor = 'orange';
                this.colorCheck(document.getElementById(idNum - 1).id, colorId, row);
                break;

            case (row != 5) ? document.getElementById(idNum + 10).style.backgroundColor : null:
                console.log(true, 'color check left');
                document.getElementById(idNum + 10).style.backgroundColor = 'orange';
                this.colorCheck(document.getElementById(idNum + 10).id, colorId, row);
                break;
            //sprawdzac czy nie jest undefined? do zrobienia

            case (row != 1) ? document.getElementById(idNum - 10).style.backgroundColor : null:
                console.log(true, 'color check left');
                document.getElementById(idNum - 10).style.backgroundColor = 'orange';
                (row != 1) ? this.colorCheck(document.getElementById(idNum - 10).id, colorId, row) : console.log('sds');
                break;

            default:
                console.log(false, 'color check false')
        }
    }

    // ogolnie to jest problem z przechodzeniem na dalszy row, współrzędne x/y i rozbijanie coś tam mi nie pasowało

    countDown = (n) => {
        console.log(n);
        if (n >= 1) this.countDown(n - 1);
    }


    render() {
        let boxLine = [];
        for (let y = 0; y < 5; y++) {
            let box = [];
            for (let i = 0; i < 10; i++) {
                box.push(<div className="box-container__box" onClick={this.handleClick} row={y + 1} line={i + 1} key={i}></div>);
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
