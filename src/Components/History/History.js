import './History.css';
import React, { useState, useEffect, Fragment } from 'react';

export function History({ history }) {

    useEffect(() => {

    }, [history])

    return (
        <Fragment>
            {history.map((sentence, index) => {
                return <h1 key={index}>{sentence}</h1>
            })}
        </Fragment>
    );
}
