/* eslint-disable prefer-template */
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';

function Popular() {
  const { t } = useTranslation();
  const [popularBooks, setPopularBooks] = useState([]);

  useEffect(() => {
    axios.get('/popular')
      .then((data) => {
        console.log(data.data.results);
        setPopularBooks(data.data.results);
      });
  }, []);

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
            <div className="book-card" data-id={book.id} style={{ backgroundImage: `url(${book.formats['image/jpeg']})` }}>
              <div className="book-meta">
                <div className="meta-text-wrap">
                  <p>{book.authors[0].name}</p>
                  <p className="book-title">{book.title}</p>
                </div>
                <button data-id={book.id} className="book-btn book-btn-add" type="button" onClick={() => { /*removeCurrentBook(book.id);*/ }}>
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
