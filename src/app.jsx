/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import Login from './login';
import Settings from './settings';
import Header from './header';
import SearchDisplay from './search/searchdisplay';
import SearchSection from './search/searchsection';
import {
  getCurrentBook, getAllBooks, clearTable, addBook,
} from '../browser_db/books';
import Popular from './popular';
import Logout from './logout';
import Collection from './collection';
import i18n from './i18n';
import Reader from './reader/reader';

import '../public/styles/unified.css';
// Translator

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [searchTerms, setSearchTerms] = useState({
    title: '',
    author: '',
    language: '',
    topic: '',
  });
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
  const [showReader, setShowReader] = useState(false);

  const [collectionLength, setCollectionLength] = useState(0);
  const [currentBook, setCurrentBook] = useState([]);
  const [username, setUsername] = useState([]);
  const [collection, setCollection] = useState([]);
  const [popularBooks, setPopularBooks] = useState([]);

  // getAllBooks()
  //   .then((res) => {
  //     setCollectionLength(res.length);
  //   });
  // document.cookie.s_id === 'guest';

  useEffect(() => {
    if (document.cookie) {
      if (navigator.onLine) {
        axios.post('/verifyToken', { token: document.cookie })
          .then((res) => {
            setLoggedIn(true);
            setUsername(res.data.username);
            setSettings(res.data.settings);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setLoggedIn(true);
      }
    }
  }, []);

  // Get the book from indexDB and update currentBook state.
  // Then render the reader.
  const showBook = (bookId) => {
    getCurrentBook(Number(bookId))
      .then((res) => {
        setCurrentBook(res[0].text);
        setShowReader(true);
      })
      .catch((error) => (console.log(error)));
  };

  useEffect(() => {
    if (loggedIn && navigator.onLine) {
      axios.get(`/collection/${username}`)
        .then((res) => {
          const mongoBooks = res.data;
          clearTable()
            .then(() => {
              if (mongoBooks.length) {
                const promiseArray = [];
                mongoBooks.forEach((book) => {
                  promiseArray.push(
                    axios.get(`/txt?url=${book.meta.formats['text/html']}`)
                      .then((res2) => (
                        addBook(book.meta.title, res2.data, book.meta, book.meta.id)
                      )),
                  );
                });
                return Promise.all(promiseArray);
              }
              return axios.get('/popular')
                .then((data) => {
                  setPopularBooks(data.data.results);
                });
            })
            .then(() => {
              setCollectionLength(mongoBooks.length);
            });
        });
    } else if (loggedIn) {
      getAllBooks()
        .then((data) => {
          setCollectionLength(data.length);
        });
    } else {
      setSearchTerms({
        title: '',
        author: '',
        language: '',
        topic: '',
      });
      setSettings({
        language: 'English',
        'color-blindedness': 'none',
        font: 'Times',
        fontSize: '24',
      });
      setShowSearchResults(false);
      setShowSettings(false);
      setShowReader(false);
      // setBookList(null);
      // setCount(0);
      // setCollectionLength(0);
      // setCurrentBook([]);
      // setUsername('');
      // setCollection([]);
    }
  }, [loggedIn]);

  useEffect(() => {
    const body = document.querySelector('body');
    const mode = settings['color-blindedness'].substring(0, 1).toUpperCase()
      + settings['color-blindedness'].substring(1, settings['color-blindedness'].length);

    body.removeAttribute('class');
    document.querySelector('body').classList.add(mode);
    i18n.changeLanguage(settings.language);
  }, [settings]);

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
              searchTerms={searchTerms}
              setSearchTerms={setSearchTerms}
              count={count}
              bookList={bookList}
              showBook={showBook}
              username={username}
            />
          ) : (collectionLength ? (
            <Collection
              currentBook={currentBook}
              showBook={showBook}
              collection={collection}
              setCollection={setCollection}
              username={username}
            />
          ) : <Popular popularBooks={popularBooks} username={username} />)}

          {showSettings ? (
            <Settings
              settings={settings}
              setSettings={setSettings}
              setShowSettings={setShowSettings}
              setLoggedIn={setLoggedIn}
              username={username}
            />
          )
            : null}
        </section>
        {showReader ? <Reader book={currentBook} /> : null}
        {/* {currentBook ? <Reader book={currentBook} /> : null} */}
        {/* <Reader book={currentBook} /> */}
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
