/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useTranslation } from 'react-i18next';
// Translator
import i18n from './i18n';
import Logout from './logout';

function Settings({
  settings, setSettings, setShowSettings, setLoggedIn,
}) {
  const { t } = useTranslation();

  const handleLanguage = (e) => {
    const newSettings = { ...settings };
    newSettings.language = e.target.value;
    i18n.changeLanguage(newSettings.language);

    // document.querySelector('input.checked')?.classList?.remove('checked');
    // e.target.classList.add('checked');

    setSettings(newSettings);
  };
  const handleColorBlindedness = (e) => {
    const newSettings = { ...settings };
    newSettings['color-blindedness'] = e.target.value;
    const body = document.querySelector('body');
    const mode = e.target.value.substring(0, 1).toUpperCase()
     + e.target.value.substring(1, e.target.value.length);

    body.removeAttribute('class');
    document.querySelector('body').classList.add(mode);
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
            name={optionLower}
            id={optionLower}
            value={optionLower}
            onChange={handler}
            checked={settings[setting] === optionLower}
          />
          {setting !== 'color-blindedness' ? option : t(`settings.coloblindnessModes.${option}`)}
        </label>
      );
    })
  );

  return (
    <div className="settings-modal-wrap">
      <div className="modal-main">
        <h4 className="section-category-title">
          {t('settings.accessibility')}
        </h4>
        {/* Language */}
        <section className="section">
          <h4 className="title">
            {t('settings.language')}
          </h4>
          <form name="language">
            {fillSection(
              ['English', 'Русский', 'Українська', 'Chinese', 'Japanese'],
              'language',
              handleLanguage,
            )}
          </form>
        </section>
        {/* Color blindness */}
        <section className="section">
          <h4 className="title">
            {t('settings.colorblindness')}
          </h4>
          <form name="color-blindedness">
            {fillSection(
              ['None', 'Protanopia', 'Deuteranopia', 'Tritanopia', 'Achromatopsia', 'Protanomaly', 'Deuteranomaly', 'Tritanomaly', 'Achromatomaly'],
              'color-blindedness',
              handleColorBlindedness,
            )}
          </form>
        </section>
        <Logout setLoggedIn={setLoggedIn} />

        <button type="button" id="settings-close-btn" onClick={() => { setShowSettings(false); }}>X</button>
      </div>
    </div>
  );
}

export default Settings;
