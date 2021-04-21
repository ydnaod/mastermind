import logo from './logo.svg';
import './App.css';
import { Game } from './Components/Game/Game'
import React, { useState, useEffect, Fragment } from 'react';

function App() {
  return (
    <Fragment>
      <div className="App">
        <Game />
      </div>
    </Fragment>
  );
}

export default App;
