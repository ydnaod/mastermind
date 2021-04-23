import './Hint.css';
import React, { Fragment } from 'react';

export function Hint({sentence}) {
  return (
    <Fragment>
      <h3>{sentence}</h3>
    </Fragment>
  );
}
