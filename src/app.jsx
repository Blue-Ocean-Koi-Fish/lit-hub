import React, { useState, useEffect } from 'react';
import Login from './login';
import Settings from './settings';
import Header from './header';
import SearchDisplay from './search/searchdisplay';
import SearchSection from './search/searchsection';
import Logout from './logout';

const axios = require('axios');

import Collection from './collection';
// import Reader from "./reader";

import '../public/styles/unified.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [searchTerms, setSearchTerms] = useState({
    title: "",
    author: "",
    language: "",
    topic: "",
  });
  const [userBooks, setUserBooks] = useState([]);
  const [bookList, setBookList] = useState();
  const [count, setCount] = useState(0);
  const [settings, setSettings] = useState({
    language: "english",
    "color-blindedness": "none",
  });
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showReader, setShowReader] = useState(true);

  useEffect(() => {
    if (document.cookie) {
      axios.post('http://localhost:8080/verifyToken', { token: document.cookie })
        .then((res) => {
          console.log(res);
          setLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  return (
    loggedIn ? (
      <>
        <Header setShowSettings={setShowSettings} setShowSearchResults={setShowSearchResults} />
        <Logout setLoggedIn={setLoggedIn} />
        <section className="collections">
          <SearchSection />
          <Collection />
          {showSettings ? (
            <Settings
              settings={settings}
              setSettings={setSettings}
              setShowSettings={setShowSettings}
            />
          )
            : null}
        </section>
        {/* <SearchForm
          searchTerms={searchTerms}
          setSearchTerms={setSearchTerms}
          setShowSearchResults={setShowSearchResults}
        />
        {showSearchResults
          ? <SearchResults searchTerms={searchTerms} setSearchTerms={setSearchTerms} />
          : <Collection />} */}

        {/* {showReader ? <Reader /> : null} */}
      </>
    ) : (
      <Login setLoggedIn={setLoggedIn} />
    )
  );
}

export default App;
