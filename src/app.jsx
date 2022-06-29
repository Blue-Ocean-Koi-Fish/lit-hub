import React, { useState, useEffect } from 'react';
import Login from './login';
import Collection from './collection';
import Settings from './settings';
import Header from './header';


// import SearchResults from './searchResults';
// import SearchForm from './searchForm';
import SearchSection from './search/searchsection';

import Reader from './reader/reader';
import sample1 from '../testData/sample-1';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);

  // const [searchTerms, setSearchTerms] = useState({
  //   'book-name': '',
  //   author: '',
  //   language: '',
  //   genre: '',
  // });

  const [settings, setSettings] = useState({
    language: 'english',
    'color-blindedness': 'none',
  });
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showReader, setShowReader] = useState(true);  // where does this get called?

  const [currentBook, setCurrentBook] = useState();

  return (
    loggedIn ? (
      <>
        <Header setShowSettings={setShowSettings} setShowSearchResults={setShowSearchResults} />

        <SearchSection />
        {/* <SearchForm
          searchTerms={searchTerms}
          setSearchTerms={setSearchTerms}
          setShowSearchResults={setShowSearchResults}
        />
        {showSearchResults
          ? <SearchResults searchTerms={searchTerms} setSearchTerms={setSearchTerms} />
          : <Collection />} */}

        {showSettings ? (
          <Settings
            settings={settings}
            setSettings={setSettings}
            setShowSettings={setShowSettings}
          />
        )
          : null}
        {/* {showReader ? <Reader /> : null} */}
      </>
    ) : (
      <Login setLoggedIn={setLoggedIn} />
    )
  );
}

export default App;
