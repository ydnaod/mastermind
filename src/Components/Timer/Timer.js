import React, { Fragment, useEffect, useState, useRef } from 'react'
import './Timer.css'

export function Timer({ endGame }) {

    const [remainingTime, setRemainingTime] = useState(60);
    const [ticking, setTicking] = useState(true);

    const tickingRef = useRef(ticking);
    const timeRef = useRef(remainingTime);
    timeRef.current = remainingTime;
    tickingRef.current = ticking;

    const checkRemainingTime = () => {
        if (timeRef.current <= 0) {
            setTicking(() => false);
            endGame(` - You ran out of time`);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
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