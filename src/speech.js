function Speech(target) {
  const msg = new SpeechSynthesisUtterance();
  msg.text = target;
  speechSynthesis.speak(msg);
}

function cancel() {
  speechSynthesis.cancel();
}

function pause(test) {
  if (!test) {
    speechSynthesis.pause();
  } else {
    speechSynthesis.resume();
  }
}

export { Speech, pause, cancel };
