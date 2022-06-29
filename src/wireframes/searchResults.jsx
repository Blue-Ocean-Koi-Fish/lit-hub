import React from 'react';

function SearchResults({ searchTerms, setSearchTerms }) {
  const handleRemove = (k) => {
    const newSearchTerms = { ...searchTerms };
    newSearchTerms[k] = '';
    setSearchTerms(newSearchTerms);
  };

  return (
    <div className="login-wrap">
      <section className="collection-section">
        <h4 className="title">
          Search Results
        </h4>
        <div className="search-term-labels">
          {Object.keys(searchTerms).map((k) => (
            searchTerms[k].length
              ? (
                <span key={k}>
                  {k}
                  {': '}
                  {searchTerms[k]}
                  <button
                    type="button"
                    onClick={() => handleRemove(k)}
                  >
                    Remove
                  </button>
                </span>
              ) : null
          ))}
        </div>
      </section>
    </div>
  );
}

export default SearchResults;
