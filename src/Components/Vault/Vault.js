import './Vault.css';
import React, { useState, useEffect, Fragment } from 'react';
import { Combination } from '../Combination/Combination'
import OpenButton from '../OpenButton/OpenButton';

export function Vault({ secretCode }) {

    const [[col0, col1, col2, col3], setCurrentCombination] = useState([0, 0, 0, 0])

    const setValueFromColumn = (index, value) => {
        const tempArray = [col0, col1, col2, col3];
        tempArray[index] = value;
        setCurrentCombination(tempArray)
    }

    const submitGuess = () => {
        if (checkVictory()) {
            console.log("you win!")
        } else if (checkIfNumbersAreInPlace()) {
            console.log("Number in the right place")
        } else if (checkIfAnyNumbersAreCorrect()) {
            console.log("A number is correct")
        } else {
            console.log('sorry')
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
            console.log(dict)
        }
        for (let i = 0; i < secretCode.length; i++) {
            if (dict.hasOwnProperty(tempArray[i])) {
                return true
            }
        }
        return false
    }

    useEffect(() => {

    }, [])

    return (
        <Fragment>
            <Combination setValueFromColumn={setValueFromColumn}/>
            <OpenButton submitGuess={submitGuess}/>
        </Fragment>
    );
}
