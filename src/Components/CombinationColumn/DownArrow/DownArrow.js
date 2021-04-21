import './DownArrow.css';
import React, { useState, useEffect, Fragment } from 'react';

export function DownArrow({handleDecrease}) {

    const handleClick = () => {
        handleDecrease();
    }

  return (
    <Fragment>
      <h1 className="downArrow" onClick={handleClick}>v</h1>
    </Fragment>
  );
}
