/* eslint-disable prefer-template */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getAllBooks, removeBook } from '../browser_db/books';

function Collection({ currentBook }) {
  const { t } = useTranslation();
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    getAllBooks().then((res) => {
      setCollection(res);
    });
  }, [currentBook]);

  const removeCurrentBook = (bookId) => {
    removeBook(bookId);
    window.location.reload();
  };

  return (
    // Book Collection Cards
    <div className="collection-section-wrap">
      <section className="collection-section">
        <h4 className="title">
          {t('collections.main')}
        </h4>
        <div className="book-cards-wrap">
          {collection.map((book) => (
            <div className="book-card" style={{ backgroundImage: `url(${book.meta.formats['image/jpeg']})` }}>
              <div className="book-meta">
                <p>{book.meta.authors[0].name}</p>
                <p className="book-title">{book.name.slice(0, 25) + '...'}</p>
                <button className="book-btn book-btn-add" type="button" onClick={() => { removeCurrentBook(book.id); }}>
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
