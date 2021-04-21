import './Combination.css';
import React, { useState, useEffect, Fragment } from 'react';
import { CombinationColumn } from '../CombinationColumn/CombinationColumn'

export function Combination({ setValueFromColumn }) {
    return (
        <Fragment>
            <div className="Combination">
                <CombinationColumn setValueFromColumn={setValueFromColumn} colIndex={0}/>
                <CombinationColumn setValueFromColumn={setValueFromColumn} colIndex={1}/>
                <CombinationColumn setValueFromColumn={setValueFromColumn} colIndex={2}/>
                <CombinationColumn setValueFromColumn={setValueFromColumn} colIndex={3}/>
            </div>
        </Fragment>
    );
}