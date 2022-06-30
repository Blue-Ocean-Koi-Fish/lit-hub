import React, { useState } from 'react';

function Login({ setLoggedIn, username, setUsername }) {
  const [password, setPassword] = useState('');

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
            <h3 className="subtitle">Web</h3>
          </div>

          <div className="img" alt="logo">
            {/* <img src="http://placecorgi.com/260/180" alt="logo" /> */}
          </div>
        </div>

        <form className="login-form">
          <h4 className="welcome-msg">
            Welcome to LitHub! Please Login or Register:
          </h4>
          <div className="input-wrap">
            {/* <img src="http://placecorgi.com/50/50" alt="username" /> */}
            <i className="fa-solid fa-user icon" />
            <input
              id="username"
              type="text"
              placeholder="Username"
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
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="button" id="login-submit" onClick={() => setLoggedIn(true)}>Log In</button>
        </form>
      </div>
    </section>
  );
}

export default Login;
