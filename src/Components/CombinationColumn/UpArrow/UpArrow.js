import './UpArrow.css';
import React, { Fragment } from 'react';
import UpArrowImage from '../../../images/UpArrow.png'
import useSound from 'use-sound';
import Click1Sfx from '../../../sfx/Click1.mp3'

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
      <img alt="A clickable up arrow" src={UpArrowImage} className="upArrow" onClick={handleClick}/>
    </Fragment>
  );
}
