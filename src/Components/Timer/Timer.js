import React, { Fragment, useEffect, useState, useRef } from 'react'
import './Timer.css'

export function Timer({ endGame, game }) {

    const [remainingTime, setRemainingTime] = useState(5);
    const [ticking, setTicking] = useState(true);

    const tickingRef = useRef(ticking);
    const timeRef = useRef(remainingTime);
    const gameRef = useRef(game);

    timeRef.current = remainingTime;
    tickingRef.current = ticking;
    gameRef.current = game;

    const checkRemainingTime = () => {
        if (timeRef.current <= 0) {
            setTicking(() => false);
            endGame(` - You ran out of time`);
        } 
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (!gameRef.current) setTicking(() => false);

            setRemainingTime(remainingTime => remainingTime - 1)
            checkRemainingTime();

            if (!tickingRef.current) {
                clearInterval(interval)
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Fragment>
            <h3 id={remainingTime}>Time Remaining: {remainingTime}</h3>
        </Fragment>
    );
}