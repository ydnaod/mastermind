import './Game.css';
import React, { useState, useEffect, Fragment } from 'react';
import { Vault } from '../Vault/Vault';
import { History } from '../History/History'
import { GuessTracker } from '../GuessTracker/GuessTracker'
import { PossibleNumbers } from '../../util/PossibleNumbers';

export function Game() {

    const [guesses, setGuesses] = useState(10);
    const [secretCode, setSecretCode] = useState();

    const generateCode = async () => {
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

    useEffect(() => {
        generateCode();
    }, [])

    return (
        <Fragment>
            <div className="vaultDisplay">
                <Vault />
                <GuessTracker guesses={guesses} />
            </div>
            <History />
        </Fragment>
    );
}
