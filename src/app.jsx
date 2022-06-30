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
import testBook from '../testData/sample-6';

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
    language: 'english',
    'color-blindedness': 'none',
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
  const [currentBook, setCurrentBook] = useState('');

  const showBook = (bookId) => {
    getCurrentBook(bookId)
      .then((res) => {
        console.log('IS THIS RES From APP ', res);
        setCurrentBook(res);
      });
  };

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
        {showSearchResults ? (
          <SearchDisplay
            setUserBooks={setUserBooks}
            searchTerms={searchTerms}
            setSearchTerms={setSearchTerms}
            count={count}
            bookList={bookList}
            showBook={showBook}
          />
        ) : null} */}

        {/* {showReader ? <Reader book={currentBook} /> : null} */}
        {<Reader book={testBook} /> || null}
      </>
    ) : (
      <Login setLoggedIn={setLoggedIn} />
    )
  );
}

export default App;
