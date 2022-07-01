/* eslint-disable prefer-template */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { getAllBooks, removeBook } from '../browser_db/books';

function Collection({
  currentBook, collection, setCollection, showBook, username,
}) {
  const { t } = useTranslation();

  useEffect(() => {
    getAllBooks().then((res) => {
      setCollection(res);
    });
  }, []);
  // Adding these to useEffect was causing collection to re-render non-stop
  // currentBook, collection

  const removeCurrentBook = (book) => {
    axios.delete('/removeFromCollection', {
      data: {
        username, bookId: book.meta.id,
      },
    })
      .then(() => (removeBook(book.id)))
      .then(() => {
        getAllBooks().then((res) => {
          setCollection(res);
        });
      });
  };

  const getHQ = (book) => {
    if (book.meta.formats['image/jpeg']) {
      const url = `url(${book.meta.formats['image/jpeg'].replace('small', 'medium')})`;
      return { backgroundImage: url };
    }
    return null;
  };

  // Make sure to only allow click events for cards,
  // or anything with a data-book-id attribute.
  const handleClick = (event) => {
    event.preventDefault();
    if (event.target.getAttribute('data-book-id')) {
      showBook(event.target.getAttribute('data-book-id'));
    }
  };

  return (
    // Book Collection Cards
    <div className="collection-section-wrap">
      <section className="collection-section">
        <h4 className="title">
          {t('collections.main')}
        </h4>
        <div className="book-cards-wrap" onClick={handleClick}>
          {collection.map((book) => (
            <div className="book-card" style={getHQ(book)} key={book.meta.id} data-book-id={book.book_id}>

              <div className="book-meta">
                <div className="meta-text-wrap">
                  <p>{book.meta.authors[0].name}</p>
                  <p className="book-title">{book.name.slice(0, 25) + '...'}</p>
                </div>
                <button className="book-btn book-btn-add" type="button" onClick={() => { removeCurrentBook(book); }}>
                  {t('collections.cards.remove')}
                  {' '}
                  -
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Collection;
