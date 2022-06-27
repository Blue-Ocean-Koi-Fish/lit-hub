import React, { useState } from 'react';

function Login({ setLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <div className="hero">
        bubbly-animation
      </div>
      <div className="login-wrap">
        <div className="logo-wrap">
          <h1 className="title">
            LitHub
          </h1>
          <h3 className="subtitle">
            Web
          </h3>
          <div className="img" alt="logo">
            <img src="http://placecorgi.com/260/180" alt="logo" />
          </div>
        </div>
        <form className="login-form">
          <h4 className="welcome-msg">
            Welcome to LitHub! Please Login or Register:
          </h4>
          <div className="input-wrap">
            <img src="http://placecorgi.com/50/50" alt="username" />
            <input
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-wrap">
            <img src="http://placecorgi.com/50/50" alt="password" />
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="button" id="login-submit" onClick={() => setLoggedIn(true)}>Log In</button>
        </form>
      </div>
    </>
  );
}

export default Login;
