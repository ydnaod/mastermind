import './Game.css';
import React, { useState, useEffect, Fragment } from 'react';
import { Vault } from '../Vault/Vault';
import { GuessTracker } from '../GuessTracker/GuessTracker'
import { Hint } from '../Hint/Hint'
import { motion } from 'framer-motion'

export function Game() {

    const [guesses, setGuesses] = useState(10);
    const [secretCode, setSecretCode] = useState();
    const [history, setHistory] = useState([]);
    const [game, setGame] = useState(false);
    const [loading, setLoading] = useState(true);

    const generateCode = async () => {
        if (!game && loading) {
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
                setSecretCode(() => resultArray)
                setGame(() => true)
                setLoading(() => false)
            } catch (error) {
                console.error(error.message)
            }
        }
    }

    const decrementGuesses = () => {
        let guessTemp = guesses;
        if (checkGuessesRemaining(guessTemp)) {
            setGuesses(() => guesses - 1);
            guessTemp = guesses;
            checkGuessesRemaining(guessTemp - 1)
            if (!game) {
                endGame();
            }
            return true;
        } else {
            endGame();
            return false
        }
    }

    const endGame = () => {
        setGame(() => false)
        addToHistory("Game over! The code was " + secretCode)
    }

    const checkGuessesRemaining = (guessesRemaining) => {
        if (guessesRemaining <= 0) {
            endGame();
            return false;
        } else {
            return true
        }
    }

    const addToHistory = (message) => {
        const tempArray = history;
        setHistory(() => [...tempArray, message]);
    }

    const createNewGame = () => {
        setLoading(() => true)
        setGame(() => false);
        setHistory(() => []);
        setGuesses(() => 10);
    }

    useEffect(() => {
        generateCode();
        checkGuessesRemaining(guesses);
    }, [guesses, game, loading])

    return (
        <Fragment>
            <motion.div className="dashboard"
                animate={{ y: 0 }}
                initial={{ y: 50 }}>

                <motion.div className="vault"
                    animate={{ y: 0 }}
                    initial={{ y: 50 }}>
                    <Vault secretCode={secretCode}
                        addToHistory={addToHistory}
                        decrementGuesses={decrementGuesses}
                        endGame={endGame}
                        game={game}
                        loading={loading} />
                </motion.div>

                <motion.div className="guessTracker"
                    animate={{ y: 0 }}
                    initial={{ y: 50 }}>
                    <GuessTracker guesses={guesses} />
                </motion.div>
                <div className="newGame">
                    <motion.div whileTap={{ scale: .9 }}
                        whileHover={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        initial={{ scale: .3 }}
                        class="button"
                        id="newGameButton"
                        onClick={createNewGame}>
                            New Game
                    </motion.div>
                </div>
            </motion.div>
            <motion.div className="history"
                animate={{ y: 0 }}
                initial={{ y: 50 }}>
                {history.map((sentence, index) => {
                    return <Hint sentence={sentence} key={index} />
                })}
            </motion.div>
        </Fragment>
    );
}
