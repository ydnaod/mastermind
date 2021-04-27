import './CombinationColumn.css';
import React, { useState, Fragment, useEffect } from 'react';
import { UpArrow } from './UpArrow/UpArrow';
import { NumberToGuess } from './NumberToGuess/NumberToGuess';
import { DownArrow } from './DownArrow/DownArrow';
import { PossibleNumbers } from '../../util/PossibleNumbers';
import { motion, AnimatePresence } from "framer-motion"
import useSound from 'use-sound';
import Click2Sfx from '../../sfx/Click2.mp3'
import Click1Sfx from '../../sfx/Click1.mp3'

export function CombinationColumn({ colIndex, setValueFromColumn, shuffle, handleShuffleEnd, muted }) {

  const [[index, dir], setIndex] = useState([0, 0]);

  const handleIncrease = () => {
    const tempArray = [(index + 1) % PossibleNumbers.length, 1];
    setIndex(tempArray);
    !muted && playClick1();
  }


  const [playClick1] = useSound(
    Click1Sfx,
    { volume: 0.25 }
  );

  const [playClick2] = useSound(
    Click2Sfx,
    { volume: 0.25 }
  );

  const handleDecrease = () => {
    if (index === 0) {
      setIndex([PossibleNumbers.length - 1, -1]);
    } else {
      setIndex([index - 1, -1]);
    }
    !muted && playClick2();
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

  const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const shuffleColumn = async () => {
    if (!shuffle) return;
    const randomNumber = Math.floor((Math.random() * 5) + 2);
    const randomInterval = Math.floor(Math.random() * 500);
      let tempArray = [];
      await timeout(randomInterval)
      tempArray = [(index + randomNumber) % PossibleNumbers.length, 1];
      setIndex(tempArray);
      !muted && playClick1();
    endShuffle();
  }

  const endShuffle = () => {
    handleShuffleEnd();
  }

  useEffect(() => {
    shuffleColumn();
  }, [shuffle])


  return (
    <Fragment>
      <div className="combinationColumn"
        data-CombinationColumn={colIndex}>
        <UpArrow handleIncrease={handleIncrease} colIndex={colIndex}/>
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

            <NumberToGuess colIndex={colIndex} setValueFromColumn={setValueFromColumn} numberToDisplay={PossibleNumbers[index]} />
          </motion.div>
        </AnimatePresence>
        <DownArrow handleDecrease={handleDecrease} colIndex={colIndex}/>
      </div>
    </Fragment>
  );
}