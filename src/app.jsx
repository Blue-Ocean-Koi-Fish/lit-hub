import React, { useState } from 'react';
import Login from './login';
import Settings from './settings';
import Header from './header';
import SearchDisplay from './search/searchdisplay';
import SearchSection from './search/searchsection';
import { getCurrentBook } from '../browser_db/books';

import Collection from './collection';
import Reader from './reader/reader';
import testBook from '../testData/sample-2';

import '../public/styles/unified.css';

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
        ) : null}

        {/* {showReader ? <Reader book={currentBook} /> : null} */}
        <Reader book={testBook}/>
      </>
    ) : (
      <Login setLoggedIn={setLoggedIn} />
    )
  );
}

export default App;
