import React, { useState, useEffect } from "react";

const SearchDisplay = function SearchDisplay({ bookList, count }) {
  if (count === 0) {return null}
  return (
    <div>
      <div className="title">Results: {count}</div>
      {bookList.map((book) => {
        let nameA = 'Unknown';
        if (book.authors.length > 0) {
          nameA = book.authors[0].name;
        }
        return (
          <div key={book.id} className="book-card">
            <img src={book.formats['image/jpeg']} alt="Book Cover" />
            <div>{nameA}</div>
            <div>{book.title}</div>
            {/* THIS NEEDS TO BE IMPLEMENTED */}
            <button type="button" className="toggle_status_btn" onClick={(e) => { e.preventDefault(); console.log('to be implemented'); }}>Add/Remove</button>
          </div>
        );
      })}
    </div>
  );
};

export default SearchDisplay;
