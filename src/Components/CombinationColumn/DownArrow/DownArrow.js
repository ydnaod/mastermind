import './DownArrow.css';
import React, { Fragment } from 'react';
import DownArrowImage from '../../../images/DownArrow.png'
import { motion } from 'framer-motion'

export function DownArrow({handleDecrease}) {

    const handleClick = () => {
        handleDecrease();
    }

  return (
    <Fragment>
      <motion.img whileTap={{scale:.9}}
        whileHover={{scale: 1.1}}
        alt="A clickable down arrow"
        src={DownArrowImage}
        className="downArrow"
        onClick={handleClick}/>
    </Fragment>
  );
}
