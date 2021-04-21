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

    const variants = {
        enter: direction => {
          return {
            y: direction > 0 ? 50 : -50,
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
            y: direction < 0 ? 50 : -50,
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