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
import Reader from "./reader/reader";

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
  const [username, setUsername] = useState('');

  const showBook = (bookId) => {
    getCurrentBook(bookId)
      .then((res) => {
        setCurrentBook(res);
      });
  };

  // Simulates fetching of a real book
  useEffect(() => {
    axios.get('/txt?url=https://www.gutenberg.org/ebooks/11.html.images')
      .then((res) => {
        // console.log('got', res.data);
        setCurrentBook(res.data);
      })
      .catch((error) => (console.log(error)));
  }, []);

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

        {/* Uncomment for production */}
        {/* {showReader ? <Reader book={currentBook} /> : null} */}
        {/* Show when in development */}
        <Reader book={currentBook} />
      </>
    ) : (
      <Login setLoggedIn={setLoggedIn} username={username} setUsername={setUsername} />
    )
  );
}

export default App;
