import './DownArrow.css';
import React, { useState, useEffect, Fragment } from 'react';
import DownArrowImage from '../../../images/DownArrow.png'

export function DownArrow({handleDecrease}) {

    const handleClick = () => {
        handleDecrease();
    }

  return (
    <Fragment>
      <img src={DownArrowImage} className="downArrow" onClick={handleClick}/>
    </Fragment>
  );
}
