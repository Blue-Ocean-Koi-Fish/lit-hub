/* eslint-disable react/no-array-index-key */
import React from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
// Translator
import i18n from './i18n';
import Logout from './logout';

function Settings({
  settings, setSettings, setShowSettings, setLoggedIn, username,
}) {
  const { t } = useTranslation();

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

  const handleClose = () => {
    setShowSettings(false);
    axios.put('/updateSettings', { username, settings })
      .catch((err) => {
        console.log(err);
      });
  };

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
              ['English', 'Русский', 'Українська', '中文', 'Japanese (Not implemented)'],
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
        <Logout
          setLoggedIn={setLoggedIn}
          settings={settings}
        />

        <button type="button" id="settings-close-btn" onClick={handleClose}>X</button>
      </div>
    </div>
  );
}

export default Settings;
