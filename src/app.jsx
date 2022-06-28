import React from 'react';
import BookReader from './BookReader';
import sample1 from './sample-1';
import sample2 from './sample-2';
// import sample3 from './sample-3';

function App() {
  return (
    <div>
      <h1>Koi Fish!</h1>
      <BookReader book={sample1} />
    </div>
  );
}

export default App;
