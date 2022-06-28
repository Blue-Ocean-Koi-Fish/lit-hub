/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Test from './TestSW';
import Page from './Pages';
import Book from './Book';

function App() {
  const [userInput, setUserInput] = useState(0);
  const [numberOfFish, setNumberOfFish] = useState([]);
  const [booksPage, setBooksPage] = useState([]);
  useEffect(() => {
    axios.get('http://gutendex.com/books')
      .then((data) => {
        console.log('Data', data.data.results);
        setBooksPage(data.data.results);
      });
  }, []);

  const getUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = () => {
    setNumberOfFish(Array(Number(userInput)).fill(0));
  };
  console.log(numberOfFish);
  return (
    <div>
      <h1>Hello</h1>

      <Test numberOfFish={numberOfFish} handleSubmit={handleSubmit} userInput={userInput} />
      <button>
        <input onChange={getUserInput} />
      </button>
      <Book />
      <Page booksPage={booksPage} />
    </div>
  );
}
export default App;
