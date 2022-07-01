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
    // window.location.reload();
  };

  const getHQ = (book) => {
    if (book.meta.formats['image/jpeg']) {
      console.log(book.meta.formats['image/jpeg']);
      const url = `url(${book.meta.formats['image/jpeg'].replace('small', 'medium')})`;
      return { backgroundImage: url };
    }
    return null;
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
            <div className="book-card" style={getHQ(book)}>
              <div className="book-meta">
                <div className="meta-text-wrap">
                  <p>{book.meta.authors[0].name}</p>
                  <p className="book-title">{book.name.slice(0, 25) + '...'}</p>
                </div>

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
