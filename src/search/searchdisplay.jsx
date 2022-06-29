import React, { useState, useEffect } from "react";

const SearchDisplay = function SearchDisplay({ bookList, count, searchTerms, setSearchTerms, setUserBooks, setCurrentBook }) {
  const handleRemove = (k) => {
    const newSearchTerms = { ...searchTerms };
    newSearchTerms[k] = '';
    setSearchTerms(newSearchTerms);
  };
  return (
    <div>
      <div className="title">Results: {count}</div>
      <div className="search-term-labels">
        {Object.keys(searchTerms).map((k) =>
          (searchTerms[k].length ? (
            <span key={k}>
              {k}
              {": "}
              {searchTerms[k]}
              <button type="button" onClick={() => handleRemove(k)}>
                Remove
              </button>
            </span>
          ) : null))}
      </div>
      {bookList.map((book) => {
        let nameA = "Unknown";
        if (book.authors.length > 0) {
          nameA = book.authors[0].name;
        }
        return (
          <div key={book.id} className="book-card">
            <img src={book.formats["image/jpeg"]} alt="Book Cover" />
            <div>{nameA}</div>
            <div>{book.title}</div>
            <button
              type="button"
              className="toggle_status_btn"
              onClick={(e) => {
                e.preventDefault();
                /* setUserBooks(books => [...books, book.id]); */
                setCurrentBook(book.format['text/html']);
              }}
            >
              Read Book
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default SearchDisplay;
