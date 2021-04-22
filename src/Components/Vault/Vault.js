import './Vault.css';
import React, { useState, useEffect, Fragment } from 'react';
import { Combination } from '../Combination/Combination'
import OpenButton from '../OpenButton/OpenButton';

export function Vault({ secretCode, addToHistory, decrementGuesses }) {

    const [[col0, col1, col2, col3], setCurrentCombination] = useState([0, 0, 0, 0])

    const setValueFromColumn = (index, value) => {
        const tempArray = [col0, col1, col2, col3];
        tempArray[index] = value;
        setCurrentCombination(tempArray)
    }

    const submitGuess = () => {
        if (decrementGuesses()) {
            const tempArray = [col0, col1, col2, col3];
            const result = tempArray.join("");
            if (checkVictory()) {
                addToHistory(`You guessed: ${result}. You win!`)
            } else if (checkIfNumbersAreInPlace()) {
                addToHistory(`You guessed: ${result}. A number is correct and is in the right place`)
            } else if (checkIfAnyNumbersAreCorrect()) {
                addToHistory(`You guessed: ${result}. A number is correct`)
            } else {
                addToHistory(`You guessed: ${result}. Sorry`)
            }
        }
    }

    const checkVictory = () => {
        const cloneArray = JSON.stringify([col0, col1, col2, col3]);
        const cloneSecret = JSON.stringify(secretCode);
        if (cloneSecret === cloneArray) {
            return true;
        }
        return false;
    }

    const checkIfNumbersAreInPlace = () => {
        const tempArray = [col0, col1, col2, col3];
        for (let i = 0; i < secretCode.length; i++) {
            if (secretCode[i] === tempArray[i]) {
                return true
            }
        }
        return false
    }

    const checkIfAnyNumbersAreCorrect = () => {
        const tempArray = [col0, col1, col2, col3];
        const dict = {};
        for (const number of secretCode) {
            if (!dict.hasOwnProperty(number)) {
                dict[number] = 1;
            } else {
                dict[number]++;
            }
        }
        for (let i = 0; i < secretCode.length; i++) {
            if (dict.hasOwnProperty(tempArray[i])) {
                return true
            }
        }
        return false
    }

    return (
        <Fragment>
            <div className="vaultContent">
            <Combination setValueFromColumn={setValueFromColumn} />
            </div>
            <OpenButton submitGuess={submitGuess} />
        </Fragment>
    );
}
