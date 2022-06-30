import React, { useState, useEffect } from 'react';
import { getAllBooks, removeBook } from '../browser_db/books';

function Collection() {
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    getAllBooks().then((res) => {
      setCollection(res);
    });
  }, []);

  const removeCurrentBook = (bookId) => {
    removeBook(bookId);
    window.location.reload();
  };

  console.log(collection);
  return (
    // Book Collection Cards
    <div className="collection-section-wrap">
      <section className="collection-section">
        <h4 className="title">
          Your Collection
        </h4>
        <div className="book-cards-wrap">
          {collection.map((book) => (
            <div className="book-card" style={{ backgroundImage: `url(${book.meta.formats['image/jpeg']})` }}>
              <div className="book-meta">
                <p>{book.meta.authors[0].name}</p>
                {/* <p>(1969)</p> */}
                <p className="book-title">{book.name}</p>
                <button className="book-btn book-btn-add" type="button" onClick={() => { removeCurrentBook(book.id); }}>Remove +</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Collection;
