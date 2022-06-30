import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function Login({ setLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { t, i18n } = useTranslation();

  return (
    <section className="login-section">

      <div className="hero">
        bubbly-animation
      </div>

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
          <button type="button" id="login-submit" onClick={() => setLoggedIn(true)}>{t('login.login')}</button>
        </form>
      </div>
    </section>
  );
}

export default Login;
