import React from 'react';
import { FaMoon, FaSun, FaChartLine } from 'react-icons/fa';

const NavBar = ({ darkMode, setDarkMode }) => {
  return (
    <nav className={`navbar ${darkMode ? 'dark-mode' : ''}`}>
      <div className="container navbar-container">
        <div className="navbar-logo">
          <FaChartLine size={24} />
          <h1>FinDash</h1>
        </div>
        <div className="navbar-actions">
          <button 
            className="toggle-theme" 
            onClick={() => setDarkMode(!darkMode)}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;