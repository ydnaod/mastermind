import './Game.css';
import React, { useState, useEffect, Fragment } from 'react';
import { Vault } from '../Vault/Vault';
import { History } from '../History/History'
import { GuessTracker } from '../GuessTracker/GuessTracker'
import {Hint } from '../Hint/Hint'

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

    const addToHistory = (message) => {
        const tempArray = history;
        console.log(tempArray)
        setHistory(() => [...tempArray, message]);
    }

    useEffect(() => {
        generateCode();
    }, [history])

    return (
        <Fragment>
            <div className="vaultDisplay">
                <Vault secretCode={secretCode}
                    addToHistory={addToHistory}/>
                <GuessTracker guesses={guesses} />
            </div>
            {history.map((sentence,index) => {
                return <Hint sentence={sentence} key={index}/>
            })}
        </Fragment>
    );
}
