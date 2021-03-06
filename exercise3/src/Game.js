import React from 'react';

class Game extends React.Component {
    constructor(props) {
        super(props);
        const initialValues = this.randomValues();
        this.state = {
            value1: initialValues[0],
            value2: initialValues[1],
            value3: initialValues[2],
            proposedAnswer: initialValues[3]
        };
    };

    randomValues = () => {
        const values = Array.from({length: 3}, () => Math.floor(Math.random() * 100));
        const answer = Math.floor(Math.random() *3) + values.reduce((total, curr) => total + curr);
        return [...values, answer];
    };

    resetGame = (newValues) => {
        this.setState((currState) => ({
            value1: newValues[0],
            value2: newValues[1],
            value3: newValues[2],
            proposedAnswer: newValues[3]
        }));
    };


    gameLogic = (e) => {
        const newValues = this.randomValues();
        this.resetGame(newValues);
        const userAnswer = this.checkAnswer(e.target.name);
        this.props.inputHandle(userAnswer);
    };

    checkAnswer = (clicked) => {
        const { value1, value2, value3, proposedAnswer } = this.state;
        const correctAnswer = value1 + value2 + value3;
        return (
            (correctAnswer === proposedAnswer && clicked === 'true') ||
            (correctAnswer !== proposedAnswer && clicked === 'false')
        )
    };

    render() {
        const { value1, value2, value3, proposedAnswer } = this.state;
        return (
            <div className="game">
                <p>{`${value1} + ${value2} + ${value3} = ${proposedAnswer}`}</p>
                <button name="true" onClick={this.gameLogic}>TRUE</button>
                <button name="false" onClick={this.gameLogic}>FALSE</button>
            </div>
        )
    }


};

export default Game;