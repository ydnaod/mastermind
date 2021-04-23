import './Vault.css';
import React, { useState, Fragment } from 'react';
import { Combination } from '../Combination/Combination'
import OpenButton from '../OpenButton/OpenButton';
import useSound from 'use-sound';
import Click4Sfx from '../../sfx/Click4.mp3'
import unlockSfx from '../../sfx/unlock.mp3'

export function Vault({ secretCode, addToHistory, decrementGuesses, endGame, game }) {

    const [[col0, col1, col2, col3], setCurrentCombination] = useState([0, 0, 0, 0])

    const [playActive] = useSound(
        Click4Sfx,
        { volume: 0.25 }
      );

      const [playUnlock] = useSound(
        unlockSfx,
        { volume: 0.25 }
      );

    const setValueFromColumn = (index, value) => {
        const tempArray = [col0, col1, col2, col3];
        tempArray[index] = value;
        setCurrentCombination(tempArray)
    }

    const submitGuess = () => {
        if (!game) return;
        if (decrementGuesses()) {
            const tempArray = [col0, col1, col2, col3];
            const result = tempArray.join("");
            if (checkVictory()) {
                addToHistory(`You guessed: ${result}. You win!`)
                playUnlock();
            } else if (checkIfNumbersAreInPlace()) {
                addToHistory(`You guessed: ${result}. A number is correct and is in the right place.`)
                playActive()
            } else if (checkIfAnyNumbersAreCorrect()) {
                addToHistory(`You guessed: ${result}. A number is correct.`)
                playActive()
            } else {
                addToHistory(`You guessed: ${result}. No numbers are correct.`)
                playActive()
            }
        }
    }

    const checkVictory = () => {
        const cloneArray = JSON.stringify([col0, col1, col2, col3]);
        const cloneSecret = JSON.stringify(secretCode);
        if (cloneSecret === cloneArray) {
            endGame();
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
