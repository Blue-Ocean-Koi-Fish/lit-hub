import React from 'react';

function Header({ setShowSettings, setShowSearchResults }) {
  return (
    <>
      <header className="header-moving">
        <div className="logo">
          <h2 className="title">
            LitHub
          </h2>
          <div className="img" />
        </div>
        <nav className="nav">
          <button type="button" className="btn" id="collection-btn" onClick={() => setShowSearchResults(false)}>
            Collection
          </button>
          <button type="button" className="btn" id="settings-btn" onClick={() => setShowSettings((s) => !s)}>
            Settings
          </button>
        </nav>

        {/* Mobile view settings button */}
        <button className="btn-settings btn-round" type="button" onClick={() => setShowSettings((s) => !s)}>
          <i className="fa-solid fa-gear icon" />
        </button>
      </header>

      <header className="header-static" />
    </>
  );
}

export default Header;
