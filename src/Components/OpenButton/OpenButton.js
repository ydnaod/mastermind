import './OpenButton.css';
import React, { useState, useEffect, Fragment } from 'react';

function OpenButton({ submitGuess }) {

    const handleClick = () => {
        submitGuess();
    }

    return (
        <Fragment>
            <div className="button" onClick={handleClick}>Guess</div>
        </Fragment>
    );
}

export default OpenButton;