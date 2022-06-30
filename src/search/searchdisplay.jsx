import React from 'react';
import axios from 'axios';
import { addBook } from '../../browser_db/books';

const SearchDisplay = function SearchDisplay({
  bookList, count, searchTerms, setSearchTerms, setUserBooks, showBook, username,
}) {
  const handleRemove = (k) => {
    const newSearchTerms = { ...searchTerms };
    newSearchTerms[k] = '';
    setSearchTerms(newSearchTerms);
  };

  return (
    <div>
      <div className="title">
        Results:
        {count}
      </div>
      <div className="search-term-labels">
        {Object.keys(searchTerms).map((k) => (
          searchTerms[k].length ? (
            <span key={k}>
              {k}
              {': '}
              {searchTerms[k]}
              <button type="button" onClick={() => handleRemove(k)}>
                Remove
              </button>
            </span>
          ) : null))}
      </div>
      {bookList.map((book) => {
        let nameA = 'Unknown';
        if (book.authors.length > 0) {
          nameA = book.authors[0].name;
        }
        return (
          <div key={book.id} className="book-card">
            <img src={book.formats['image/jpeg']} alt={`${book.title} Book Cover`} />
            <div>{nameA}</div>
            <div>{book.title}</div>
            <button
              type="button"
              className="toggle_status_btn"
              onClick={(e) => {
                e.preventDefault();
                axios.post('/addToCollection', {
                  username,
                  bookId: book.id,
                }).then(() => (
                  axios.get(`/txt?url=${book.formats['text/html']}`)
                    .then((res) => (
                      addBook(book.title, res.data, book, book.id)
                    ))
                    .then(() => {
                      showBook(book.id);
                      setUserBooks((books) => [...books, book.id]);
                    })
                ));
              }}
            >
              Add/Remove
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default SearchDisplay;
