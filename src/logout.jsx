import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

function Logout({ setLoggedIn, settings }) {
  const { t } = useTranslation();

  const logUserOut = () => {
    document.cookie = 's_id= ; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
    console.log(settings);
    axios.put('/frontEndLogout', { settings })
      .then(() => {
        console.log('Logged out successfully');
      })
      .catch(() => {
        console.log('Error on logout');
      });
    setLoggedIn(false);
  };

  return (
    <div className="logout-btn-wrap">
      <button type="button" className="logout-btn" onClick={() => logUserOut()}>{t('login.logout')}</button>
    </div>
  );
}

export default Logout;
