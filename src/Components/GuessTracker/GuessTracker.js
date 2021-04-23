import './GuessTracker.css';
import React, { Fragment } from 'react';

export function GuessTracker({guesses}) {
  return (
    <Fragment>
      <h1>Guesses Remaining: {guesses}</h1>
    </Fragment>
  );
}