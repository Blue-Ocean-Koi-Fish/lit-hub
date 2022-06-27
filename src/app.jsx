import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [count, setCount] = useState(JSON.parse(window.localStorage.getItem('count')) || 0);
  const [book, setBook] = useState('');
  // useEffect(() => {
  //   axios.get('https://aleph.gutenberg.org/files/1343/1343-0.txt')
  //     .then((response) => {
  //       setBook(response.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  useEffect(() => {
    window.localStorage.setItem('count', count);
  }, [count]);

  return (
    <>
      <h1>Koi Fish! And More</h1>
      <button type="button" onClick={() => setCount((a) => a + 1)}>Click to add</button>
      <h3>{count}</h3>
      <iframe style={{height: '1000px', width: '100%'}} src="https://gutenberg.org/files/1343/1343-0.txt" />
    </>
  );
}

export default App;
