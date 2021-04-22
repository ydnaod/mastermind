import './Hint.css';
import React, { useState, useEffect, Fragment } from 'react';

export function Hint({sentence}) {
  return (
    <Fragment>
      <h3>{sentence}</h3>
    </Fragment>
  );
}
