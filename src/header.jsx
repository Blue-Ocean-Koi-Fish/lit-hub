import React from 'react';
import { useTranslation } from 'react-i18next';

function Header({ setShowSettings, setShowSearchResults }) {
  const { t, i18n } = useTranslation();

  return (
    <>
      <header className="header-moving">
        <div className="logo">
          <h2 className="title">
            Lit-Hub
          </h2>
          <div className="img" />
        </div>
        <nav className="nav">
          <button type="button" className="btn" id="collection-btn" onClick={() => setShowSearchResults(false)}>
            {t('header.collection')}
          </button>
          <button type="button" className="btn" id="settings-btn" onClick={() => setShowSettings((s) => !s)}>
            {t('header.settings')}
          </button>
        </nav>

        {/* Mobile view settings button */}
        <button className="btn-settings btn-settings-mobile btn-round" type="button" onClick={() => setShowSettings((s) => !s)}>
          <i className="fa-solid fa-gear icon" />
        </button>
      </header>

      <header className="header-static" />
    </>
  );
}

export default Header;
