import React, { useState, useEffect } from "react";
import Login from './login';
import Settings from "./settings";
import Header from "./header";
import SearchDisplay from "./search/searchdisplay";
import SearchSection from "./search/searchsection";

import Collection from "./collection";
import Reader from "./reader/reader";


import testBook from '../testData/sample-5';

import '../public/styles/unified.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
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
  return (
    loggedIn ? (
      <>
        <Header setShowSettings={setShowSettings} setShowSearchResults={setShowSearchResults} />

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
        <Reader book={testBook} />
      </>
    ) : (
      <Login setLoggedIn={setLoggedIn} />
    )
  );
}

export default App;
