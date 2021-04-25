import React, { Fragment, useEffect, useState, useRef } from 'react'
import './Timer.css'

export function Timer({ endGame }) {

    const [remainingTime, setRemainingTime] = useState(10);
    const [ticking, setTicking] = useState(true);
    const timeRef = useRef(remainingTime);
    timeRef.current = remainingTime;

    const checkRemainingTime = () => {
        console.log(remainingTime)
        if (timeRef.current <= 0) {
            setTicking(() => false);
            endGame(` - You ran out of time`);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime(remainingTime => remainingTime - 1)
            console.log(timeRef.current)
            checkRemainingTime();
            if (!ticking) {
                clearInterval(interval)
                console.log('uh')
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Fragment>
            <h3>{remainingTime}</h3>
        </Fragment>
    );
}