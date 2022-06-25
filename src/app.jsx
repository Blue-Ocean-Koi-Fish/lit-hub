import React, { useState } from 'react';

function App() {
  // on mouse enter say the inner text
  const [time, setTime] = useState(false);
  const msg = new SpeechSynthesisUtterance();
  const speeehHandler = (target) => {
    msg.text = target;
    if (!time) {
      window.speechSynthesis.speak(msg);
      setTime(true);
      setTimeout(() => {
        setTime(false);
      }, '500');
    }
  };
  return (
    <div>
      <h1 style={{ width: '30%' }} onMouseEnter={(e) => { speeehHandler(e.target.innerText); }}>
        Koi Fish!
      </h1>
      <div style={{ width: '30%' }} onMouseEnter={() => { speeehHandler('Book Title'); }}>
        <h2>Book Title</h2>
        <div name="Book Title">Book Cover</div>
      </div>
    </div>
  );
}

export default App;
