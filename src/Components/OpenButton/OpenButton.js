import './OpenButton.css';
import React, { useState, useEffect, Fragment } from 'react';

function OpenButton({ submitGuess }) {

    const handleClick = () => {
        submitGuess();
    }

    return (
        <Fragment>
            <button onClick={handleClick}>Open</button>
        </Fragment>
    );
}

export default OpenButton;