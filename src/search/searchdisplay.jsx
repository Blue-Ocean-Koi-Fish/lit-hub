import React from 'react';
import axios from 'axios';
import { addBook } from '../../browser_db/books';

const SearchDisplay = function SearchDisplay({
  bookList, count, searchTerms, setCount, setSearchTerms, setUserBooks, showBook, username, setBookList
}) {
  

  const handleRemove = (k) => {
    const newSearchTerms = { ...searchTerms };
    newSearchTerms[k] = '';
    setSearchTerms(newSearchTerms);
    axios
      .get('http://107.20.126.146:8080/search', {
        params: searchTerms,
      })
      .then((res) => {
        setBookList(res.data.results);
        setCount(res.data.count);
        setShowSearchResults(true);
      })
      .catch((err) => console.log(err));

  };
  
  return (
    <div className="collection-section-wrap">
      <section className="collection-section">
        <h4 className="title">
          Results:
          {count}
        </h4>
        {/* Search labels, secondary feature */}
        {/* <div className="search-term-labels">
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
        </div> */}
        <div className="book-cards-wrap">
          {bookList.map((book) => {
            let nameA = 'Unknown';
            if (book.authors.length > 0) {
              nameA = book.authors[0].name;
            }
            return (
              <div key={book.id} className="book-card" style={{ backgroundImage: `url(${book.formats['image/jpeg']})` }}>
                <div className="book-meta">
                  <div className="meta-text-wrap">
                    <p>{nameA}</p>
                    <p className="book-title">{book.title}</p>
                  </div>
                  <button
                    type="button"
                    className="toggle_status_btn book-btn book-btn-add"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log(username);
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
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default SearchDisplay;
