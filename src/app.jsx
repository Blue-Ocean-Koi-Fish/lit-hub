import React from 'react';
import BookReader from './BookReader';
import sampleHTML from './book-html';

function App() {
  // return <h1>Koi Fish!</h1>;
  return (
    <div>
      <h1>Koi Fish!</h1>
      <BookReader book={sampleHTML} />
    </div>
  );
}

export default App;
