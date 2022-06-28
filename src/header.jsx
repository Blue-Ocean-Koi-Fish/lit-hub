import React from 'react';

function Header({ setShowSettings, setShowSearchResults }) {
  return (
    <header className="header">
      <div className="logo">
        <h2 className="title">
          LitHub
        </h2>
        <div className="img">
          <img src="http://placecorgi.com/260/180" alt="logo" />
        </div>
      </div>
      <nav className="nav">
        <button type="button" className="btn" id="collection-btn" onClick={() => setShowSearchResults(false)}>
          Collection
        </button>
        <button type="button" className="btn" id="settings-btn" onClick={() => setShowSettings((s) => !s)}>
          Settings
        </button>
      </nav>
    </header>
  );
}

export default Header;
