import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function Logout({ setLoggedIn }) {
  const { t } = useTranslation();

  const logUserOut = () => {
    document.cookie = 's_id= ; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
    setLoggedIn(false);
  };

  return (
    <div className="logout-btn-wrap">
      <button type="button" className="logout-btn" onClick={() => logUserOut()} className="logout-btn">{t('login.logout')}</button>
    </div>
  );
}

export default Logout;
