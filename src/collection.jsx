import React from 'react';

function Collection() {
  return (
    // Book Collection Cards
    <div className="collection-section-wrap">
      <section className="collection-section">
        <h4 className="title">
          Title
        </h4>
        <div className="book-cards-wrap">
          {/* TODO: Replace with dynamic cards */}
          <div className="book-card">
            <div className="book-meta">
              <p>Fedor Dostoevsky</p>
              <p>(1969)</p>
              <p className="book-title">War and the Prejudice</p>
              <button className="book-btn book-btn-add" type="button">Add +</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Collection;
