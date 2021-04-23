import './DownArrow.css';
import React, { Fragment } from 'react';
import DownArrowImage from '../../../images/DownArrow.png'
import useSound from 'use-sound';
import Click2Sfx from '../../../sfx/Click2.mp3'

export function DownArrow({handleDecrease}) {

    const handleClick = () => {
        playActive();
        handleDecrease();
    }

    const [playActive] = useSound(
        Click2Sfx,
        { volume: 0.25 }
      );

  return (
    <Fragment>
      <img alt="A clickable down arrow" src={DownArrowImage} className="downArrow" onClick={handleClick}/>
    </Fragment>
  );
}
