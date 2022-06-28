<<<<<<< HEAD
import React from 'react';
import BookReader from './BookReader';
import sample1 from './sample-1';
import sample2 from './sample-2';
// import sample3 from './sample-3';

function App() {
  return (
    <div>
      <h1>Koi Fish!</h1>
      <BookReader book={sample2} />
=======
import React, { useState, useEffect } from 'react';
import Login from './login';
import Collection from './collection';
import SearchResults from './searchResults';
import Settings from './settings';
import Reader from './reader';
import Header from './header';
import SearchForm from './searchForm';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [searchTerms, setSearchTerms] = useState({
    'book-name': '',
    author: '',
    language: '',
    genre: '',
  });
  const [settings, setSettings] = useState({
    language: 'english',
    'color-blindedness': 'none',
  });
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showReader, setShowReader] = useState(false);

  return (
    <div id="root">
      {loggedIn ? (
        <>
          <Header setShowSettings={setShowSettings} setShowSearchResults={setShowSearchResults} />
          <SearchForm
            searchTerms={searchTerms}
            setSearchTerms={setSearchTerms}
            setShowSearchResults={setShowSearchResults}
          />
          {showSearchResults
            ? <SearchResults searchTerms={searchTerms} setSearchTerms={setSearchTerms} />
            : <Collection />}
          {showSettings ? (
            <Settings
              settings={settings}
              setSettings={setSettings}
              setShowSettings={setShowSettings}
            />
          )
            : null}
          {showReader ? <Reader /> : null}
        </>
      ) : (
        <Login setLoggedIn={setLoggedIn} />
      )}
>>>>>>> 771d13603087819cbf57a805b2c2ce762d0ac622
    </div>
  );
}

export default App;
