import React, { useState, useEffect } from 'react';
import Login from './login';
import Settings from './settings';
import Header from './header';
import SearchDisplay from './search/searchdisplay';
import SearchSection from './search/searchsection';
import { getCurrentBook } from '../browser_db/books';

import Collection from './collection';
import Reader from './reader/reader';
import '../public/styles/unified.css';

import axios from 'axios';
import testBook from '../testData/sample-5';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
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
  const [currentBook, setCurrentBook] = useState('');

  const showBook = (bookId) => {
    getCurrentBook(bookId)
      .then((res) => {
        console.log('IS THIS RES From APP ', res);
        setCurrentBook(res);
      });
  };

  // Simulates fetching of a real book
  useEffect(() => {
    axios.get('http://127.0.0.1:8081/txt?url=https://www.gutenberg.org/ebooks/1592.html.images')
      .then((res) => {
        console.log('got', res.data);
      })
      .catch((error) => (console.log(error)));
    setCurrentBook(testBook);
  }, []);

  return (
    loggedIn ? (
      <>
        <Header setShowSettings={setShowSettings} setShowSearchResults={setShowSearchResults} />

        <section className="collections">
          <SearchSection
            setCount={setCount}
            searchTerms={searchTerms}
            setSearchTerms={setSearchTerms}
            setShowSearchResults={setShowSearchResults}
            setBookList={setBookList}
          />
          <Collection currentBook={currentBook} />
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
        ) : null}

        {/* Uncomment for production */}
        {/* {showReader ? <Reader book={currentBook} /> : null} */}
        {/* Show when in development */}
        {/* <Reader book={currentBook} /> */}
      </>
    ) : (
      <Login setLoggedIn={setLoggedIn} />
    )
  );
}

export default App;
