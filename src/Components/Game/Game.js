import './Game.css';
import React, { useState, useEffect, Fragment, useRef } from 'react';
import { Vault } from '../Vault/Vault';
import { GuessTracker } from '../GuessTracker/GuessTracker'
import { Hint } from '../Hint/Hint'
import { motion } from 'framer-motion'
import { Timer } from '../Timer/Timer'
import { ScoreBoard } from '../ScoreBoard/ScoreBoard'
import SoundOnButton from '../../images/SoundOnButton.png'
import MuteButton from '../../images/MuteButton.png'
import useSound from 'use-sound';
import Click3Sfx from '../../sfx/Click3.mp3'


export function Game() {

    const [guesses, setGuesses] = useState(10);
    const [secretCode, setSecretCode] = useState();
    const [history, setHistory] = useState([]);
    const [game, setGame] = useState(false);
    const [loading, setLoading] = useState(true);
    const [shuffle, setShuffle] = useState(false);
    const [muted, setMuted] = useState(true);
    const [classicMode, setClassicMode] = useState(false);
    const [score, setScore] = useState(0);
    const [remainingTime, setRemainingTime] = useState(100);

    const historyRef = useRef(history);
    historyRef.current = history;

    const remainingTimeRef = useRef(remainingTime);
    remainingTimeRef.current = remainingTime;

    const [playClick3] = useSound(
        Click3Sfx,
        { volume: 0.25 }
    );

    const generateCode = async () => {
        if (!game && loading) {

            let codeGenerated = false;
            const illegalCode = [0, 0, 0, 0];
            let illegalCounter = 0;

            while (!codeGenerated) {
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
                    for (let i = 0; i < illegalCode.length; i++) {
                        if (illegalCode[i] === resultArray[i]) {
                            illegalCounter++;
                        }
                    }
                    if (illegalCounter <= 3) {
                        setSecretCode(() => resultArray)
                        setGame(() => true)
                        setLoading(() => false)
                        codeGenerated = true;
                    }
                } catch (error) {
                    console.error(error.message)
                }
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
        const timeComponent = remainingTimeRef.current * 5;
        const guessComponent = guesses * 10;
        console.log("Remaining time: " + remainingTime);
        console.log("remaining time Ref: " + remainingTimeRef);
        console.log("score" + score)
        setScore(timeComponent * guessComponent);
        console.log("score" + score)
        addToHistory(`Your score was: ${score}`);
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
        setScore(() => 0);
        setRemainingTime(() => 100)
    }

    const handleMuteToggle = () => {
        if (muted) {
            playClick3();
            setMuted(() => false)
        } else {
            setMuted(() => true)
        }
    }

    const handleModeToggle = () => {
        if (classicMode) {
            !muted && playClick3();
            setClassicMode(() => false)
            createNewGame();
        } else {
            setClassicMode(() => true)
            createNewGame();
        }
    }

    const handleTimeChange = () => {
        setRemainingTime(remainingTime => remainingTime - 1);
    }

    useEffect(() => {
        generateCode();
        checkGuessesRemaining(guesses);
        // eslint-disable-next-line
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
                        handleShuffleEnd={handleShuffleEnd}
                        muted={muted}
                        classicMode={classicMode} />
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
                        {loading ? <h3>Loading</h3> : <Timer game={game}
                            endGame={endGame}
                            muted={muted}
                            remainingTime={remainingTime}
                            handleTimeChange={handleTimeChange}/>}
                    </div>
                </motion.div>

                <div className="configButtons">
                    <div className="configButton">
                        <motion.div whileTap={{ scale: .9 }}
                            whileHover={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            initial={{ scale: .3 }}
                            class="button"
                            id="newGameButton"
                            data-cy="NewGameButton"
                            onClick={createNewGame}>
                            New Game
                        </motion.div>
                    </div>
                    <div className="configButton">
                        <motion.div whileTap={{ scale: .9 }}
                            whileHover={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            initial={{ scale: .3 }}
                            class="button"
                            id="switchModeButton"
                            data-cy="SwitchModeButton"
                            onClick={handleModeToggle}>
                            Switch to {classicMode ? "Hard Mode" : "Classic Mode"}
                        </motion.div>
                    </div>
                </div>

                {
                    loading ? '' : <motion.img onClick={() => handleMuteToggle()}
                        id="muteButton"
                        src={muted ? MuteButton : SoundOnButton}
                        whileTap={{ scale: .9 }}
                        whileHover={{ scale: 1.1 }}
                        animate={{ y: 0 }}
                        initial={{ y: 50 }} />
                }

            </motion.div>

            <motion.div className="history"
                animate={{ y: 0 }}
                initial={{ y: 50 }}>
                {history.map((sentence, index) => {
                    return <Hint sentence={sentence} key={index} />
                })}
            </motion.div>

            {/* <motion.div className="scoreBoard"
                animate={{ y: 0 }}
                initial={{ y: 50 }}>
                <ScoreBoard score={score}/>
            </motion.div> */}

        </Fragment>
    );
}
