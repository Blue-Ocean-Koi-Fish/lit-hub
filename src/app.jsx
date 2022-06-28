import React, { useState, useEffect } from 'react';
import Login from './login';
import Collection from './collection';
import SearchResults from './searchResults';
import Settings from './settings';
import Reader from './reader';
import Header from './header';
import SearchForm from './searchForm';
import sample1 from '../testData/sample-1';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
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
  const [showReader, setShowReader] = useState(true);

  // Store the raw HTML string for the current book
  // then pass to Reader as props.
  const [currentBook, setCurrentBook] = useState(sample1);

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
          {showReader ? <Reader book={currentBook} /> : null}
        </>
      ) : (
        <Login setLoggedIn={setLoggedIn} />
      )}
    </div>
  );
}

export default App;
