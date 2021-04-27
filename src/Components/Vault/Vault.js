import './Vault.css';
import React, { useState, Fragment } from 'react';
import { Combination } from '../Combination/Combination'
import OpenButton from '../OpenButton/OpenButton';
import useSound from 'use-sound';
import Click4Sfx from '../../sfx/Click4.mp3'
import unlockSfx from '../../sfx/unlock.mp3'
import { motion } from 'framer-motion'

export function Vault({ secretCode,
    addToHistory,
    decrementGuesses,
    endGame,
    game,
    loading,
    shuffle,
    handleShuffleEnd,
    muted,
    classicMode }) {

    const [currentCombination, setCurrentCombination] = useState([0, 0, 0, 0])

    const [playActive] = useSound(
        Click4Sfx,
        { volume: 0.25 }
    );

    const [playUnlock] = useSound(
        unlockSfx,
        { volume: 0.25 }
    );

    const setValueFromColumn = (index, value) => {
        const tempArray = currentCombination;
        tempArray[index] = value;
        setCurrentCombination(tempArray)
    }

    const submitGuess = () => {
        if (!game) return;
        if (decrementGuesses()) {
            const tempArray = currentCombination;
            const result = tempArray.join("");
            let resultString = `You guessed: ${result}. `;
            if (checkVictory(tempArray)) {
                resultString += `You cracked the code and opened the vault!`;
                addToHistory(resultString)
                !muted && playUnlock();
            } else if (classicMode && checkIfAnyNumbersAreCorrect(tempArray) > 0) {
                const correctButNotInPlace = checkIfAnyNumbersAreCorrectOrInPlace(tempArray);
                const correctAndInPlace = checkIfNumbersAreInPlace(tempArray);
                if (correctButNotInPlace === 1) {
                    resultString += `${correctButNotInPlace} number is correct. `;
                } else if (correctButNotInPlace > 1) {
                    resultString += `${correctButNotInPlace} numbers are correct. `;
                }
                if (correctAndInPlace === 1) {
                    resultString += `${correctAndInPlace} number is correct and in the right place. `;
                } else if (correctAndInPlace > 1) {
                    resultString += `${correctAndInPlace} numbers are correct and in the right place. `;
                }
                addToHistory(resultString)
                !muted && playActive();
            } else if (checkIfNumbersAreInPlace(tempArray) > 0) {
                resultString += `A number is correct and is in the right place.`;
                addToHistory(resultString)
                !muted && playActive();
            } else if (checkIfAnyNumbersAreCorrect(tempArray) > 0) {
                resultString += `A number is correct.`;
                addToHistory(resultString)
                !muted && playActive();
            } else {
                resultString += `No numbers are correct.`;
                addToHistory(resultString)
                !muted && playActive();
            }
        }
    }

    const checkVictory = (codeArray) => {
        const cloneArray = JSON.stringify(codeArray);
        const cloneSecret = JSON.stringify(secretCode);
        if (cloneSecret === cloneArray) {
            endGame();
            return true;
        }
        return false;
    }

    const checkIfAnyNumbersAreCorrectOrInPlace = (codeArray) => {
        const inPlaceCounter = checkIfNumbersAreInPlace(codeArray);
        const totalCorrect = checkIfAnyNumbersAreCorrect(codeArray);
        return totalCorrect - inPlaceCounter;
    }

    const checkIfNumbersAreInPlace = (codeArray) => {
        let counter = 0;
        for (let i = 0; i < secretCode.length; i++) {
            if (secretCode[i] === codeArray[i]) {
                counter++;
            }
        }
        return counter
    }

    const checkIfAnyNumbersAreCorrect = (codeArray) => {
        const dict = {};
        let counter = 0;
        for (const number of secretCode) {
            if (!dict.hasOwnProperty(number)) {
                dict[number] = 1;
            } else {
                dict[number]++;
            }
        }
        for (let i = 0; i < secretCode.length; i++) {
            if (dict.hasOwnProperty(codeArray[i]) && dict[codeArray[i]] > 0) {
                dict[codeArray[i]]--;
                counter++;
            }
        }
        return counter
    }

    return (
        <Fragment>
            <div className="vaultContent"
                data-SecretCode={secretCode}>
                <Combination setValueFromColumn={setValueFromColumn}
                    shuffle={shuffle}
                    handleShuffleEnd={handleShuffleEnd}
                    muted={muted} />
            </div>
            {loading ? <motion.div animate={{ scale: 1 }}
                initial={{ scale: .3 }}
                className="button">Loading</motion.div> :
                <OpenButton submitGuess={submitGuess} />}
        </Fragment>
    );
}
