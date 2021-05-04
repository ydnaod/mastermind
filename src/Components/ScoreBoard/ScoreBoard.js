import React, { Fragment } from 'react';

export function ScoreBoard( { score } ) {
    return (
        <Fragment>
            <p>{score}</p>
        </Fragment>
    )
}