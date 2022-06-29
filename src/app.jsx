import React, { useState, useEffect } from "react";
import Login from "./login";
import Collection from "./collection";
import SearchDisplay from "./search/searchdisplay";
import Settings from "./settings";
import Reader from "./reader";
import Header from "./header";
import SearchSection from "./search/searchsection";

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
  const [showReader, setShowReader] = useState(false);
  console.log(userBooks);
  return (
    <div id="root">
      {loggedIn ? (
        <>
          <Header
            setShowSettings={setShowSettings}
            setShowSearchResults={setShowSearchResults}
          />
          <SearchSection
            setCount={setCount}
            searchTerms={searchTerms}
            setSearchTerms={setSearchTerms}
            setShowSearchResults={setShowSearchResults}
            setBookList={setBookList}
          />
          {showSearchResults ? (
            <SearchDisplay
              setUserBooks={setUserBooks}
              searchTerms={searchTerms}
              setSearchTerms={setSearchTerms}
              count={count}
              bookList={bookList}
            />
          ) : (
            <Collection />
          )}
          {showSettings ? (
            <Settings
              settings={settings}
              setSettings={setSettings}
              setShowSettings={setShowSettings}
            />
          ) : null}
          {showReader ? <Reader /> : null}
        </>
      ) : (
        <Login setLoggedIn={setLoggedIn} />
      )}
    </div>
  );
}

export default App;
