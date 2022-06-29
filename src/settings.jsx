/* eslint-disable react/no-array-index-key */
import React from 'react';

function Settings({ settings, setSettings, setShowSettings }) {
  const handleLanguage = (e) => {
    const newSettings = { ...settings };
    newSettings.language = e.target.value;

    // document.querySelector('input.checked')?.classList?.remove('checked');
    // e.target.classList.add('checked');

    setSettings(newSettings);
  };
  const handleColorBlindedness = (e) => {
    const newSettings = { ...settings };
    newSettings['color-blindedness'] = e.target.value;

    // document.querySelector('input.checked')?.classList?.remove('checked');
    // e.target.classList.add('checked');

    setSettings(newSettings);
  };

  const fillSection = (arr, setting, handler) => (
    arr.map((option, i) => {
      const optionLower = option.toLowerCase();
      return (
        <label htmlFor={optionLower} key={i}>
          <input
            type="radio"
            name="optionuage"
            id={optionLower}
            value={optionLower}
            onChange={handler}
            checked={settings[setting] === optionLower}
          />
          {option}
        </label>
      );
    })
  );

  return (
    <div className="settings-modal-wrap">
      <div className="modal-main">
        <h4 className="section-category-title">
          Acessibility
        </h4>
        {/* Language */}
        <section className="section">
          <h4 className="title">
            Language
          </h4>
          <form name="language">
            {fillSection(
              ['English', 'Russian', 'Ukrainian', 'Chinese', 'Japanese'],
              'language',
              handleLanguage,
            )}
          </form>
        </section>
        {/* Color blindness */}
        <section className="section">
          <h4 className="title">Color-blindedness</h4>
          <form name="color-blindedness">
            {fillSection(
              ['None', 'Protanopia', 'Deuteranopia', 'Tritanopia', 'Achromatopsia', 'Protanomaly', 'Deuteranomaly', 'Tritanomaly', 'Achromatomaly'],
              'color-blindness',
              handleColorBlindedness,
            )}
          </form>
        </section>
        <button type="button" id="settings-close-btn" onClick={() => { setShowSettings(false); }}>X</button>
      </div>
    </div>
  );
}

export default Settings;
