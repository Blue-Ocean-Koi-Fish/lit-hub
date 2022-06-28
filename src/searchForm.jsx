import React from 'react';

function searchForm({ searchTerms, setSearchTerms, setShowSearchResults }) {
  const handleChange = (e) => {
    const newSearchTerms = { ...searchTerms };
    newSearchTerms[e.target.id] = e.target.value;
    setSearchTerms(newSearchTerms);
  };

  return (
    <form className="search-form">
      <label htmlFor="book-name">
        Book name
        <input id="book-name" type="text" onChange={handleChange} />
      </label>
      <label htmlFor="author">
        Author
        <input id="author" type="text" onChange={handleChange} />
      </label>
      <label htmlFor="language">
        Language
        <input id="language" type="text" onChange={handleChange} />
      </label>
      <label htmlFor="genre">
        Genre
        <input id="genre" type="text" onChange={handleChange} />
      </label>
      <button type="button" onClick={() => setShowSearchResults(true)}>
        Search
      </button>
    </form>
  );
}

export default searchForm;
