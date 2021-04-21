import './NumberToGuess.css';
import React, { useState, useEffect, Fragment } from 'react';
import { motion, AnimatePresence } from "framer-motion"

export function NumberToGuess({ numberToDisplay }) {

    useEffect(() => {

    }, [numberToDisplay])

    return (
        <Fragment>
                    <h1>{numberToDisplay}</h1>
        </Fragment>
    );
}