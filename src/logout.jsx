import React, { useState } from 'react';

function Logout({ setLoggedIn }) {
  const logUserOut = () => {
    document.cookie = "s_id= ; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    setLoggedIn(false);
  };

  return (
    <div>
      <button type="button" onClick={() => logUserOut()} className="logout-btn">Logout</button>
    </div>
  );
}

export default Logout;
