// add to a onMouseEnter statment and pass in what you want to be said
function Speech(target) {
  const msg = new SpeechSynthesisUtterance();
  msg.text = target;
  speechSynthesis.speak(msg);
}

// add to a onMouseLeave statment to stop tts when not hovering.
function cancel() {
  speechSynthesis.cancel();
}

// use this function to set up pauseing on spacebar press.
// document.addEventListener('keypress', (event) => {
//  if (event.key === 'Space') {
//    event.preventDefault();
//    pause();
//  }
// }, false);
function pause(test) {
  if (!test) {
    speechSynthesis.pause();
  } else {
    speechSynthesis.resume();
  }
}

export { Speech, pause, cancel };
