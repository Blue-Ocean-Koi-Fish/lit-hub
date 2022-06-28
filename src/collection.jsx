import React from 'react';

function Collection() {
  return (
    <div className="login-wrap">
      <section className="collection-section">
        <h4 className="title">
          Title
        </h4>
        <div className="book-card">
          <span>
            book meta-data
          </span>
          <button type="button" className="toggle-status-btn">
            Toggle Status
          </button>
        </div>
      </section>
    </div>
  );
}

export default Collection;
