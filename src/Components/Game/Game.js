import './Game.css';
import React, { useState, useEffect, Fragment } from 'react';
import { Vault } from '../Vault/Vault';
import { History } from '../History/History'
import { GuessTracker } from '../GuessTracker/GuessTracker'
import { Hint } from '../Hint/Hint'

export function Game() {

    const [guesses, setGuesses] = useState(10);
    const [secretCode, setSecretCode] = useState();
    const [history, setHistory] = useState([]);

    const generateCode = async () => {
        if (secretCode) {
            return;
        }
        try {
            const response = await fetch(`https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new`, {
                method: 'GET'
            });
            const parseRes = await response.text();
            const resultArray = parseRes.split("\n");
            resultArray.pop();
            for (let i = 0; i < resultArray.length; i++) {
                resultArray[i] = parseInt(resultArray[i]);
            }
            setSecretCode(resultArray)
        } catch (error) {
            console.error(error.message)
        }
    }

    const decrementGuesses = () => {
        let guessTemp = guesses;
        if (checkGuessesRemaining(guessTemp)) {
            setGuesses(() => guesses - 1);
            guessTemp = guesses;
            console.log(guessTemp - 1)
            return true;
        } else {
            endGame();
            return false
        }
    }

    const endGame = () => {
        addToHistory("Game over! The code was " + secretCode)
    }

    const checkGuessesRemaining = (guessesRemaining) => {
        if (guessesRemaining <= 0) {
            return false;
        } else {
            return true
        }
    }

    const addToHistory = (message) => {
        const tempArray = history;
        let guessTemp = guesses;
        console.log(message)
        setHistory(() => [...tempArray, message]);
    }

    useEffect(() => {
        generateCode();
    }, [history])

    return (
        <Fragment>
            <div className="dashboard">
                <div className="vault">
                        <Vault secretCode={secretCode}
                            addToHistory={addToHistory}
                            decrementGuesses={decrementGuesses} />
                </div>
                <div className="guessTracker">
                    <GuessTracker guesses={guesses} />
                </div>
            </div>
            <div className="history">
                {history.map((sentence, index) => {
                    return <Hint sentence={sentence} key={index} />
                })}
            </div>
        </Fragment>
    );
}
