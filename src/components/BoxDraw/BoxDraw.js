import React, { Component } from 'react';
import './BoxDraw.scss';

export class BoxDraw extends Component {
    constructor(props) {
        super(props)
        this.state = {
            colorArray: ['#173f5f', '#20639b', '#3caea3', '#f6d55c', '#ed553b']
        }
    }

    componentDidMount() {
        const box = document.getElementsByClassName('box-container__box');
        console.log(box[0].style)
        console.log(box.length)
        
        for (let x = 0; x < box.length; x++) {
            box[x].style.backgroundColor = this.state.colorArray[Math.floor(Math.random()*this.state.colorArray.length)]; //set random colors for boxes
            box[x].id = x; //set uniqe ID for all boxes
        }
    }

    handleClick = (e) => {
        console.log('box id:' + e.target.id, 'color is:' + e.target.style.backgroundColor)
        const click = parseInt(e.target.id);
        console.log(click + 1, click - 1)
        console.log(document.getElementById(click - 10).style.backgroundColor, 'up');
        console.log(document.getElementById(click + 10).style.backgroundColor, 'down');
        console.log(document.getElementById(click - 1).style.backgroundColor, 'left');
        console.log(document.getElementById(click + 1).style.backgroundColor, 'right');
        this.setState({
            boxColorSelected: e.target.style.backgroundColor,
            boxIdSelected: e.target.id
        })
    }

    componentDidUpdate() {

    }

    countDown = (n) => {
        console.log(n);
        if(n >= 1) this.countDown(n-1);
    }
    

    render() {
        this.countDown(5);
        let box = [];
        for (let i = 0; i < 10; i++) {
            box.push(<div className="box-container__box" onClick={this.handleClick} key={i}></div>)
        } 

        let boxLine = [];
        for (let y = 0; y < 5; y++) {
            boxLine.push(
                <div className="box-container__line" key={y}>
                    {box}
                </div>
            )
        }
        console.log(box, 'test')
        return (
            <div className="box-container">
                {boxLine}
            </div>
        )
    }
}
