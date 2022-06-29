import React, { useState, useEffect } from "react";
import Login from './login';
// import Collection from "./collection";
import Settings from "./settings";
// import Reader from "./reader";
import Header from "./header";


import SearchDisplay from "./search/searchdisplay";
import SearchSection from "./search/searchsection";

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
