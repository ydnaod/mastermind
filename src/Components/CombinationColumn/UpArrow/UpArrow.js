import './UpArrow.css';
import React, { Fragment } from 'react';
import UpArrowImage from '../../../images/UpArrow.png'
import useSound from 'use-sound';
import Click1Sfx from '../../../sfx/Click1.mp3'
import { motion } from 'framer-motion'

export function UpArrow({handleIncrease}) {

    const handleClick = () => {
        playActive();
        handleIncrease();
    }

    const [playActive] = useSound(
        Click1Sfx,
        { volume: 0.25 }
      );

  return (
    <Fragment>
      <motion.img whileTap={{scale:.9}} whileHover={{scale: 1.1}} alt="A clickable up arrow" src={UpArrowImage} className="upArrow" onClick={handleClick}/>
    </Fragment>
  );
}
