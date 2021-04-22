import './NumberToGuess.css';
import React, { useState, useEffect, Fragment } from 'react';
import { motion, AnimatePresence } from "framer-motion"

export function NumberToGuess({ colIndex, numberToDisplay, setValueFromColumn }) {

    useEffect(() => {
        setValueFromColumn(colIndex, numberToDisplay)
    }, [numberToDisplay])

    return (
        <Fragment>
            <h1 className="number">{numberToDisplay}</h1>
        </Fragment>
    );
}