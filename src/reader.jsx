import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { addBook, getCurrentBook } from '../browser_db/books';

function Reader() {
  const [font, setFont] = useState('font1');
  const [fontSize, setFontSize] = useState(12);
  const [currentBook, setCurrentBook] = useState('');

  // this is just to test the browserdb
  const getBook = () => {
    axios.get('/txt')
      .then((res) => {
        console.log('Here ', res.data);
        addBook('book name', res.data);
      });
  };

  // browser database testing function
  const showBook = () => {
    getCurrentBook('book name')
      .then((res) => {
        console.log('IS THIS RES ', res);
        setCurrentBook(res.text);
      });
  };

  const handleMinus = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setFontSize((s) => s - 1);
    }
  };
  const handlePlus = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setFontSize((s) => s + 1);
    }
  };

  useEffect(() => {
    setFontSize((s) => Number(s));
  }, [fontSize]);

  return (
    <div className="book-controls">
      <div className="meta-data">
        <p className="section-title">
          Reading:
        </p>
        <p className="author">
          Author
        </p>
        <p className="year">
          Year
        </p>
        <p className="book-title">
          Book Title
        </p>
        <div className="book-cover">
          Book cover div
        </div>
      </div>
      <div className="meta-data">
        <label className="section-title" htmlFor="font-select">
          Font
          <select id="font-select" name="font" value={font} onChange={(e) => setFont(e.target.value)}>
            <option value="font1">
              Font1
            </option>
            <option value="font2">
              Font2
            </option>
            <option value="font3">
              Font3
            </option>
          </select>
        </label>
        <label className="section-title" htmlFor="font-size">
          Font Size
          <span
            onClick={() => { setFontSize((s) => s - 1); }}
            onKeyDown={handleMinus}
            role="button"
            tabIndex={0}
          >
            -
          </span>
          <input
            type="number"
            id="font-size"
            name="font-size"
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
          />
          <span
            onClick={() => { setFontSize((s) => s + 1); }}
            onKeyDown={handlePlus}
            role="button"
            tabIndex={0}
          >
            +
          </span>
          {/* buttons are for testing browswer database */}
          <button type="button" onClick={getBook}>Get BOOK: TESTING ONLY</button>
          <button type="button" onClick={showBook}>SHOW BOOK : TESTING ONLY</button>
          <p>
            {currentBook}
          </p>
        </label>
      </div>
    </div>
  );
}

export default Reader;
