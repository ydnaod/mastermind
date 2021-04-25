import './Game.css';
import React, { useState, useEffect, Fragment, useRef } from 'react';
import { Vault } from '../Vault/Vault';
import { GuessTracker } from '../GuessTracker/GuessTracker'
import { Hint } from '../Hint/Hint'
import { motion } from 'framer-motion'
import { Timer } from '../Timer/Timer'

export function Game() {

    const [guesses, setGuesses] = useState(10);
    const [secretCode, setSecretCode] = useState();
    const [history, setHistory] = useState([]);
    const [game, setGame] = useState(false);
    const [loading, setLoading] = useState(true);
    const [shuffle, setShuffle] = useState(false);

    const historyRef = useRef(history);
    historyRef.current = history;

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

    const endGame = (extraInfo = '') => {
        setGame(() => false)
        const tempArray = secretCode?.join("")
        addToHistory(`Game over${extraInfo}! The code was ${tempArray}`)
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
        const tempArray = historyRef.current;
        setHistory(() => [...tempArray, message]);
    }

    const handleShuffleEnd = () => {
        setShuffle(() => false);
    }

    const createNewGame = () => {
        setShuffle(() => true);
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
                <div className="title">
                    <h1>Mastermind</h1>
                    <h4 id={"subtitle"}>Can you crack the code?</h4>
                </div>
                <motion.div className="vault"
                    animate={{ y: 0 }}
                    initial={{ y: 50 }}>
                    <Vault secretCode={secretCode}
                        addToHistory={addToHistory}
                        decrementGuesses={decrementGuesses}
                        endGame={endGame}
                        game={game}
                        loading={loading}
                        shuffle={shuffle}
                        handleShuffleEnd={handleShuffleEnd} />
                </motion.div>

                <motion.div className="guessTracker"
                    animate={{ y: 0 }}
                    initial={{ y: 50 }}>
                    <GuessTracker guesses={guesses} />
                </motion.div>
                <motion.div className="timer"
                    animate={{ y: 0 }}
                    initial={{ y: 50 }}>
                    <div className="remainingTime">
                        {loading ? <h3>Loading</h3> : <Timer game={game} endGame={endGame} />}
                    </div>
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
