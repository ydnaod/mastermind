import React, { Fragment, useEffect, useState, useRef } from 'react'
import './Timer.css'
import useSound from 'use-sound';
import clockSfx from '../../sfx/Tick1.mp3'

export function Timer({ endGame, game, muted }) {

    const [remainingTime, setRemainingTime] = useState(100);
    const [ticking, setTicking] = useState(true);

    const tickingRef = useRef(ticking);
    const timeRef = useRef(remainingTime);
    const gameRef = useRef(game);
    const mutedRef = useRef(muted);

    timeRef.current = remainingTime;
    tickingRef.current = ticking;
    gameRef.current = game;
    mutedRef.current = muted;


    const [playClock, { isPlaying }] = useSound(
        clockSfx,
        { volume: 0.15 }
      );

    const clockRef = useRef(playClock);
    clockRef.current = playClock;

    const isPlayingRef = useRef(isPlaying);
    isPlayingRef.current = isPlayingRef;

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
            if (!mutedRef.current) {
                clockRef.current();
            }
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