import './Game.css';
import React, { useState, useEffect, Fragment } from 'react';
import { Vault } from '../Vault/Vault';
import { History } from '../History/History'
import { GuessTracker } from '../GuessTracker/GuessTracker'
import { PossibleNumbers } from '../../util/PossibleNumbers';

export function Game() {

    const [guesses, setGuesses] = useState(10);
    

    return (
        <Fragment>
            <div className="vaultDisplay">
                <Vault />
                <GuessTracker guesses={guesses}/>
                <h1>{}</h1>
            </div>
            <History />
        </Fragment>
    );
}
