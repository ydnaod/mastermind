import './Combination.css';
import React, { Fragment } from 'react';
import { CombinationColumn } from '../CombinationColumn/CombinationColumn'

export function Combination({ setValueFromColumn, shuffle, handleShuffleEnd, muted }) {
    return (
        <Fragment>
            <div className="Combination">
                <CombinationColumn setValueFromColumn={setValueFromColumn}
                    colIndex={0}
                    shuffle={shuffle}
                    handleShuffleEnd={handleShuffleEnd}
                    muted={muted} />
                <CombinationColumn setValueFromColumn={setValueFromColumn}
                    colIndex={1}
                    shuffle={shuffle}
                    handleShuffleEnd={handleShuffleEnd}
                    muted={muted} />
                <CombinationColumn setValueFromColumn={setValueFromColumn}
                    colIndex={2}
                    shuffle={shuffle}
                    handleShuffleEnd={handleShuffleEnd}
                    muted={muted} />
                <CombinationColumn setValueFromColumn={setValueFromColumn}
                    colIndex={3}
                    shuffle={shuffle}
                    handleShuffleEnd={handleShuffleEnd}
                    muted={muted} />
            </div>
        </Fragment>
    );
}