import React from 'react';

function App() {
  const msg = new SpeechSynthesisUtterance();
  const speeehHandler = (e) => {
    msg.text = e.target.innerText;
    window.speechSynthesis.speak(msg);
  };
  return (
    <div>
      <h1 onMouseEnter={(e) => { console.log(e.target.innerText); speeehHandler(e); }}>
        Koi Fish!
      </h1>
    </div>
  );
}

export default App;
