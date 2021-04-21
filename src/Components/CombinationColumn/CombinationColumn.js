import './CombinationColumn.css';
import React, { useState, useEffect, Fragment } from 'react';
import { UpArrow } from './UpArrow/UpArrow';
import { NumberToGuess } from './NumberToGuess/NumberToGuess';
import { DownArrow } from './DownArrow/DownArrow';
import { PossibleNumbers } from '../../util/PossibleNumbers';
import { motion, AnimatePresence } from "framer-motion"

export function CombinationColumn() {

    const [[index, dir], setIndex] = useState([0, 0]);

    const handleIncrease = () => {
        if (index === PossibleNumbers.length - 1) {
            setIndex([0, 1]);
        } else {
            setIndex([index + 1, 1]);
        }
    }

    const handleDecrease = () => {
        if (index === 0) {
            setIndex([PossibleNumbers.length - 1, -1]);
        } else {
            setIndex([index - 1, -1]);
        }
    }


    // const numbers = [
    //     {
    //         number: 0
    //     },
    //     {
    //         number: 1
    //     },
    //     {
    //         number: 2
    //     },
    //     {
    //         number: 3
    //     },
    //     {
    //         number: 4
    //     },
    //     {
    //         number: 5
    //     },
    //     {
    //         number: 6
    //     },
    //     {
    //         number: 7
    //     },
    // ]

    const variants = {
        enter: direction => {
          return {
            y: direction > 0 ? 100 : -100,
            opacity: 0
          };
        },
        center: {
          zIndex: 1,
          y: 0,
          opacity: 1
        },
        exit: direction => {
          return {
            zIndex: -1,
            y: direction < 0 ? 100 : -100,
            opacity: 0
          };
        }
      };


    return (
        <Fragment>
            <div className="combinationColumn">
                <UpArrow handleIncrease={handleIncrease} />
                <AnimatePresence initial={false} custom={dir}>
                    <motion.div 
                        key={index}
                        custom={dir}
                        variants={variants}
                        animate="center"
                        initial="enter"
                        exit="exit"
                        transition={{
                            y: { type: "spring", stiffness: 300, damping: 30, duration: 2 },
                            opacity: { duration: .1 },
                          }}
                        className="numberToGuess">

                        <NumberToGuess numberToDisplay={PossibleNumbers[index]} />
                    </motion.div>
                </AnimatePresence>
                <DownArrow handleDecrease={handleDecrease} />
            </div>
        </Fragment>
    );
}