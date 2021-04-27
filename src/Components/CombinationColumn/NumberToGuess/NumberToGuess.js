import './NumberToGuess.css';
import React, { useEffect, Fragment } from 'react';

export function NumberToGuess({ colIndex, numberToDisplay, setValueFromColumn }) {

    useEffect(() => {
        setValueFromColumn(colIndex, numberToDisplay)
        // eslint-disable-next-line
    }, [numberToDisplay])

    return (
        <Fragment>
            <h1 className="number"
                data-NumberToGuess={numberToDisplay}>
                {numberToDisplay}
            </h1>
        </Fragment>
    );
}