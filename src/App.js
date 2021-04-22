import './App.css';
import { Game } from './Components/Game/Game'
import React, { Fragment } from 'react';

function App() {
  return (
    <Fragment>
      <div className="App">
        <div className="Game">
          <Game />
        </div>
      </div>
    </Fragment>
  );
}

export default App;
