import React, { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import Login from './login';
import Settings from './settings';
import Header from './header';
import SearchDisplay from './search/searchdisplay';
import SearchSection from './search/searchsection';
import { getCurrentBook } from '../browser_db/books';
import { getAllBooks } from '../browser_db/books';
import Popular from './popular';
import '../public/styles/unified.css';
import Logout from './logout';
import Collection from './collection';
// import Reader from "./reader";

// Translator
import './i18n';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [searchTerms, setSearchTerms] = useState({
    title: '',
    author: '',
    language: '',
    topic: '',
  });
  const [userBooks, setUserBooks] = useState([]);
  const [bookList, setBookList] = useState();
  const [count, setCount] = useState(0);
  const [settings, setSettings] = useState({
    language: 'English',
    'color-blindedness': 'none',
    font: 'Times',
    fontSize: '24',
  });
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showReader, setShowReader] = useState(true);

  const [collectionLength, setCollectionLength] = useState(0);
  const [currentBook, setCurrentBook] = useState([]);
  const [username, setUsername] = useState([]);

  getAllBooks()
    .then((res) => {
      setCollectionLength(res.length);
    });
  // document.cookie.s_id === 'guest';

  const Switch = collectionLength !== 0 ? Collection : Popular;

  useEffect(() => {
    if (document.cookie) {
      axios.post('/verifyToken', { token: document.cookie })
        .then((res) => {
          setLoggedIn(true);
          setUsername(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const showBook = (bookId) => {
    getCurrentBook(bookId)
      .then((res) => {
        setCurrentBook(res);
      });
  };

  return (
    loggedIn ? (
      <Suspense fallback="loading">
        <Header setShowSettings={setShowSettings} setShowSearchResults={setShowSearchResults} />
        <section className="collections">
          <SearchSection
            setShowSearchResults={setShowSearchResults}
            setSearchTerms={setSearchTerms}
            searchTerms={searchTerms}
            setCount={setCount}
            setBookList={setBookList}
          />
          {showSearchResults ? (
            <SearchDisplay
              setUserBooks={setUserBooks}
              searchTerms={searchTerms}
              setSearchTerms={setSearchTerms}
              count={count}
              bookList={bookList}
              showBook={showBook}
              username={username}
            />
          ) : (
            <Switch
              currentBook={currentBook}
            />
          )}

          {showSettings ? (
            <Settings
              settings={settings}
              setSettings={setSettings}
              setShowSettings={setShowSettings}
              setLoggedIn={setLoggedIn}
            />
          )
            : null}
        </section>
          {showSearchResults ? (
          <SearchDisplay
          setCount={setCount}
          setBookList={setBookList}
            setUserBooks={setUserBooks}
            searchTerms={searchTerms}
            setSearchTerms={setSearchTerms}
            count={count}
            bookList={bookList}
            showBook={showBook}
            username={username}
          />
        ) : null}

        {/* {showReader ? <Reader book={currentBook} /> : null} */}
        {/* {<Reader book={testBook} /> || null} */}
      </Suspense>
    ) : (
      <Suspense fallback="loading">
        <Login
          setLoggedIn={setLoggedIn}
          username={username}
          setUsername={setUsername}
          setSettings={setSettings}
        />
      </Suspense>
    )
  );
}

export default App;
