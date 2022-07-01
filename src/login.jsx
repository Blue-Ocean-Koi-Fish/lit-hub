import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

function Login({
  setLoggedIn,
  username,
  setUsername,
  setSettings,
}) {
  const [password, setPassword] = useState('');

  const { t } = useTranslation();
  const loginUser = () => {
    axios.post('/frontEndLogin', { username, password })
      .then((res) => {
        document.cookie = `s_id=${res.data.token}`;
        setSettings({
          language: res.data.settings.language,
          'color-blindedness': res.data.settings['color-blindedness'],
          font: res.data.settings.font,
          fontSize: res.data.settings.fontSize,
        });
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const registerUser = () => {
    axios.post('/frontEndRegister', { username, password })
      .then(() => {
        alert('Registration Successful, please login normally.');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="login-section">

      <div className="hero" />

      <div className="login-wrap">
        <div className="logo-wrap">
          <div className="logo-text">
            <h1 className="title">
              <span className="capital">L</span>
              it
              <span className="capital">H</span>
              ub
            </h1>
            <h3 className="subtitle">{t('header.subtitle')}</h3>
          </div>

          <div className="img" alt="logo">
            {/* <img src="http://placecorgi.com/260/180" alt="logo" /> */}
          </div>
        </div>

        <form className="login-form">
          <h4 className="welcome-msg">
            {t('login.welcome')}
          </h4>
          <div className="input-wrap">
            {/* <img src="http://placecorgi.com/50/50" alt="username" /> */}
            <i className="fa-solid fa-user icon" />
            <input
              id="username"
              type="text"
              placeholder={t('login.username')}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            {/* <img src="http://placecorgi.com/50/50" alt="password" /> */}
            <i className="fa-solid fa-lock icon" />
            <input
              id="password"
              type="password"
              placeholder={t('login.password')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="authentication-btns">
            <button type="button" id="login-submit" onClick={() => loginUser()}>{t('login.login')}</button>
            <button type="button" id="register-submit" onClick={() => registerUser()}>{t('login.register')}</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
