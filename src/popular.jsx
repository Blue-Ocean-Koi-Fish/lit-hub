/* eslint-disable prefer-template */
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import { addBook } from '../browser_db/books';

function Popular({ popularBooks, username }) {
  const getHQ = (book) => {
    if (book.formats['image/jpeg']) {
      const url = `url(${book.formats['image/jpeg'].replace('small', 'medium')})`;
      return { backgroundImage: url };
    }
    return null;
  };
  const { t } = useTranslation();

  // console.log('Popular Books: ', popularBooks);
  return (
    // Book Collection Cards
    <div className="collection-section-wrap">
      <section className="collection-section">
        <h4 className="title">
          {t('collections.popular')}
        </h4>
        <div className="book-cards-wrap">
          {/* If book in collection, add 'added' class */}
          {popularBooks.map((book) => (
            <div className="book-card" data-id={book.id} style={getHQ(book)}>
              <div className="book-meta">
                <div className="meta-text-wrap">
                  <p>{book.authors[0].name}</p>
                  <p className="book-title">{book.title}</p>
                </div>
                <button data-id={book.id} className="book-btn book-btn-add" type="button" onClick={(e) => {
                  e.preventDefault();
                  axios.post('/addToCollection', {
                    username,
                    bookId: book.id,
                    meta: book,
                  }).then(() => (
                    axios.get(`/txt?url=${book.formats['text/html']}`)
                      .then((res) => (
                        addBook(book.title, res.data, book, book.id)
                      ))
                      // .then(() => {
                      //   // showBook(book.id);
                      //   // setUserBooks((books) => [...books, book.id]);
                      // })
                  ));
                }}>
                  {`${t('collections.cards.add')}/${t('collections.cards.remove')}`}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Popular;
