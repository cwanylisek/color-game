import React from 'react';
import './ScoreCounter.scss';

export const ScoreCounter = (props) => {
    return (
        <div className="score">
            Your score is: <span>{props.score}</span> points!
        </div>
    )
}
