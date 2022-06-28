/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import axios from 'axios';
import { addBook, getCurrentBook } from '../local-db/book';

function Book({ }) {
  const [currentBook, setCurrentBook] = useState('');
  // const [book, setBook] = useState(['No book yet']);
  const getBook = () => {
    console.log('IS MY BUTTON WORKING');
    axios.get('/book')
      .then((data) => {
        console.log('DID IT GET HERE', typeof data.data);
        const theBook = data.data;
        addBook('Another Book', theBook);
      });
  };
/*   const setCurrentBook = () => {
    getCurrentBook().then((res) => {
      console.log(res);
      return res;
    });
  } */
  const showBook = () => {
    getCurrentBook('Some Book')
      .then((res) => {
        console.log('IS THIS RES ', res);
        setCurrentBook(res.text);
      });
  };
  return (
    <div>
      <button onClick={getBook}> Get Book </button>
      <button onClick={showBook}> Get Book </button>
      <p>{currentBook}</p>
    </div>
  );
}

export default Book;
