import './Vault.css';
import React, { useState, useEffect, Fragment } from 'react';
import { Combination } from '../Combination/Combination'
import OpenButton from '../OpenButton/OpenButton';

export function Vault() {
  return (
    <Fragment>
      <Combination />
      <OpenButton />
    </Fragment>
  );
}
