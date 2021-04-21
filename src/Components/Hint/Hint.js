import './Hint.css';
import React, { useState, useEffect, Fragment } from 'react';

export function Hint({sentence}) {
  return (
    <Fragment>
      <h2>{sentence}</h2>
    </Fragment>
  );
}
