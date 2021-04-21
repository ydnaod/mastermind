import './UpArrow.css';
import React, { useState, useEffect, Fragment } from 'react';

export function UpArrow({handleIncrease}) {

    const handleClick = () => {
        handleIncrease();
    }

  return (
    <Fragment>
      <h1 className="upArrow" onClick={handleClick}>^</h1>
    </Fragment>
  );
}
