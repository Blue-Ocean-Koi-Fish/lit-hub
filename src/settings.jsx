import React from 'react';

function Settings({ settings, setSettings, setShowSettings }) {
  const handleLanguage = (e) => {
    const newSettings = { ...settings };
    newSettings.language = e.target.value;
    setSettings(newSettings);
  };
  const handleColorBlindedness = (e) => {
    const newSettings = { ...settings };
    newSettings['color-blindedness'] = e.target.value;
    setSettings(newSettings);
  };

  return (
    <div className="settings-modal-wrap">
      <div className="modal-main">
        <h4 className="section-category-title">
          Section Category Title
        </h4>
        <section className="section">
          <h4 className="title">
            Language
          </h4>
          <form name="language">
            <label htmlFor="english">
              <input type="radio" name="language" id="english" value="english" onChange={handleLanguage} checked={settings.language === 'english'} />
              English
            </label>
            <label htmlFor="russian">
              <input type="radio" name="language" id="russian" value="russian" onChange={handleLanguage} checked={settings.language === 'russian'} />
              Russian
            </label>
            <label htmlFor="ukrainian">
              <input type="radio" name="language" id="ukrainian" value="ukrainian" onChange={handleLanguage} checked={settings.language === 'ukrainian'} />
              Ukrainian
            </label>
            <label htmlFor="chinese">
              <input type="radio" name="language" id="chinese" value="chinese" onChange={handleLanguage} checked={settings.language === 'chinese'} />
              Chinese
            </label>
            <label htmlFor="japanese">
              <input type="radio" name="language" id="japanese" value="japanese" onChange={handleLanguage} checked={settings.language === 'japanese'} />
              Japanese
            </label>
          </form>
          <h4 className="title">
            Color-blindedness
          </h4>
          <form name="color-blindedness">
            <label htmlFor="none">
              <input type="radio" name="color-blindedness" id="none" value="none" onChange={handleColorBlindedness} checked={settings['color-blindedness'] === 'none'} />
              None
            </label>
            <label htmlFor="protanopia">
              <input type="radio" name="color-blindedness" id="protanopia" value="protanopia" onChange={handleColorBlindedness} checked={settings['color-blindedness'] === 'protanopia'} />
              Protanopia
            </label>
            <label htmlFor="deuteranopia">
              <input type="radio" name="color-blindedness" id="deuteranopia" value="deuteranopia" onChange={handleColorBlindedness} checked={settings['color-blindedness'] === 'deuteranopia'} />
              Deuteranopia
            </label>
            <label htmlFor="tritanopia">
              <input type="radio" name="color-blindedness" id="tritanopia" value="tritanopia" onChange={handleColorBlindedness} checked={settings['color-blindedness'] === 'tritanopia'} />
              Tritanopia
            </label>
            <label htmlFor="achromatopsia">
              <input type="radio" name="color-blindedness" id="achromatopsia" value="achromatopsia" onChange={handleColorBlindedness} checked={settings['color-blindedness'] === 'achromatopsia'} />
              Achromatopsia
            </label>
            <label htmlFor="protanomaly">
              <input type="radio" name="color-blindedness" id="protanomaly" value="protanomaly" onChange={handleColorBlindedness} checked={settings['color-blindedness'] === 'protanomaly'} />
              Protanomaly
            </label>
            <label htmlFor="deuteranomaly">
              <input type="radio" name="color-blindedness" id="deuteranomaly" value="deuteranomaly" onChange={handleColorBlindedness} checked={settings['color-blindedness'] === 'deuteranomaly'} />
              Deuteranomaly
            </label>
            <label htmlFor="tritanomaly">
              <input type="radio" name="color-blindedness" id="tritanomaly" value="tritanomaly" onChange={handleColorBlindedness} checked={settings['color-blindedness'] === 'tritanomaly'} />
              Tritanomaly
            </label>
            <label htmlFor="achromatomaly">
              <input type="radio" name="color-blindedness" id="achromatomaly" value="achromatomaly" onChange={handleColorBlindedness} checked={settings['color-blindedness'] === 'achromatomaly'} />
              Achromatomaly
            </label>
          </form>
        </section>
        <button type="button" onClick={() => { setShowSettings(false); }}>Close</button>
      </div>
    </div>
  );
}

export default Settings;
