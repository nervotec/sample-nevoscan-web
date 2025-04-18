import React, { useState, useEffect, useRef } from 'react';
import HomeScreen from './sections/HomeScreen';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function App() {



  return (
    <div className="App">
      <header className="App-header">
        <HomeScreen></HomeScreen>
      </header>
    </div>
  );
}

export default App;
