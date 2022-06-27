import React from 'react';
import { Speech, pause, cancel } from './speech';

function App() {
  // on mouse enter say the inner text
  let paused = false;
  document.addEventListener('keypress', (event) => {
    if (event.code === 'Space') {
      event.preventDefault();
      pause(paused);
      paused = !paused;
    }
  }, false);
  return (
    <div>
      <h1 style={{ width: '30%' }} onMouseEnter={(e) => { Speech(e.target.innerText); }} onMouseLeave={() => { cancel(); }}>
        Koi Fish!
      </h1>
      <div style={{ width: '30%' }} onMouseEnter={() => { Speech('Book Title'); }} onMouseLeave={() => { cancel(); }}>
        <h2>Book Title</h2>
        <div name="Book Title">Book Cover</div>
      </div>
      <p onMouseEnter={(e) => { Speech(e.target.innerText); }}>
        a distinct section of a piece of writing,
        usually dealing with a single theme and indicated by a new line, indentation, or numbering.
        the concluding paragraph
      </p>
    </div>
  );
}

export default App;
