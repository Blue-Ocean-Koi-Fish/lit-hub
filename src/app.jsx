import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './login';
import Settings from './settings';
import Header from './header';
import SearchDisplay from './search/searchdisplay';
import SearchSection from './search/searchsection';
import { getCurrentBook } from '../browser_db/books';
import Collection from './collection';
import '../public/styles/unified.css';
import Logout from './logout';
// import Reader from "./reader";

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
  const [currentBook, setCurrentBook] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (document.cookie) {
      axios.post('/verifyToken', { token: document.cookie })
        .then((res) => {
          //console.log(res);
          setLoggedIn(true);
          setUsername('');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  const showBook = (bookId) => {
    getCurrentBook(bookId)
      .then((res) => {
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
            username={username}
          />
        ) : null}

        {/* {showReader ? <Reader book={currentBook} /> : null} */}
        {/*  {<Reader book={testBook} /> || null} */}
      </>
    ) : (
      <Login setLoggedIn={setLoggedIn} username={username} setUsername={setUsername} />
    )
  );
}

export default App;
