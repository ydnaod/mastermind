import './Combination.css';
import React, { useState, useEffect, Fragment } from 'react';
import { CombinationColumn } from '../CombinationColumn/CombinationColumn'

export function Combination() {
    return (
        <Fragment>
            <div className="Combination">
                <CombinationColumn />
                <CombinationColumn />
                <CombinationColumn />
                <CombinationColumn />
            </div>
        </Fragment>
    );
}