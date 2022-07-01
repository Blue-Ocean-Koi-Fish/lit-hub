/* eslint-disable prefer-template */
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Popular({ popularBooks }) {
  const getHQ = (book) => {
    if (book.formats['image/jpeg']) {
      const url = `url(${book.formats['image/jpeg'].replace('small', 'medium')})`;
      return { backgroundImage: url };
    }
    return null;
  };

  // console.log('Popular Books: ', popularBooks);
  return (
    // Book Collection Cards
    <div className="collection-section-wrap">
      <section className="collection-section">
        <h4 className="title">
          Popular Books
        </h4>
        <div className="book-cards-wrap">
          {popularBooks.map((book) => (
            <div className="book-card" style={getHQ(book)}>
              <div className="book-meta">
                <p>{book.authors[0].name}</p>
                <p className="book-title">{book.title}</p>
               {/*  <button className="book-btn book-btn-add" type="button" onClick={() => { removeCurrentBook(book.id); }}>Remove +</button> */}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Popular;
