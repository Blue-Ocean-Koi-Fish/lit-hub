/* eslint-disable react/button-has-type */
import React from 'react';

function Page({ booksPage }) {
  console.log('Book Page: ', booksPage);
  return (
    <div>
      {booksPage.map((bookInfo) => (
        <h4>{bookInfo.title}</h4>
      ))}
    </div>
  );
}

export default Page;
