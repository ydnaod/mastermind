import './UpArrow.css';
import React, { Fragment } from 'react';
import UpArrowImage from '../../../images/UpArrow.png'
import { motion } from 'framer-motion'

export function UpArrow({handleIncrease}) {

    const handleClick = () => {
        handleIncrease();
    }

  return (
    <Fragment>
      <motion.img whileTap={{scale:.9}}
        whileHover={{scale: 1.1}}
        alt="A clickable up arrow"
        src={UpArrowImage}
        className="upArrow"
        onClick={handleClick}/>
    </Fragment>
  );
}
