import './UpArrow.css';
import React, { useState, useEffect, Fragment } from 'react';
import UpArrowImage from '../../../images/UpArrow.png'

export function UpArrow({handleIncrease}) {

    const handleClick = () => {
        handleIncrease();
    }

  return (
    <Fragment>
      <img src={UpArrowImage} className="upArrow" onClick={handleClick}/>
    </Fragment>
  );
}
