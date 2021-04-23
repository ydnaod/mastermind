import './NumberToGuess.css';
import React, { useEffect, Fragment } from 'react';

export function NumberToGuess({ colIndex, numberToDisplay, setValueFromColumn }) {

    useEffect(() => {
        setValueFromColumn(colIndex, numberToDisplay)
    }, [numberToDisplay])

    return (
        <Fragment>
            <h1 className="number">{numberToDisplay}</h1>
        </Fragment>
    );
}