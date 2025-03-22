import React, { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Dashboard />
    </div>
  );
}

export default App;