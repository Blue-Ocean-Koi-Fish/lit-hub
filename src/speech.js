// add to a onMouseEnter statment and pass in what you want to be said
function Speech(target, lan) {
  const msg = new SpeechSynthesisUtterance();
  msg.text = target;
  msg.lang = lan || 'en-US';
  speechSynthesis.speak(msg);
}

// add to a onMouseLeave statment to stop tts when not hovering.
function cancel() {
  speechSynthesis.cancel();
}

// document.addEventListener('keypress', (event) => {
//   if (event.code === 'Space') {
//     event.preventDefault();
//     if (started) {
//       pause(paused);
//       paused = !paused;
//     } else {
//       console.log('here');
//       started = true;
//       for (let i = 0; i < document.getElementById.children.length; i++) {
//          
//       }
//     }
//   }
// }, false);
function read(doc, count) {
  // eslint-disable-next-line no-param-reassign
  count = count || 0;
  console.log(doc.children[count].innerText);
  Speech(doc.children[count].innerText)
    .onend = () => {
      if (count >= doc.children.length - 1) {
        return false;
      }
      return count + 1;
    };
}

// use this function to set up pauseing on spacebar press.
// let started = false;
// let paused = false;
// document.addEventListener('keypress', (event) => {
//   if (event.code === 'Space') {
//     event.preventDefault();
//     if (started) {
//       pause(paused);
//       paused = !paused;
//     } else {
//       Speech(document.getElementById('test').innerText)
//         .onend = () => {
//           started = false;
//         };
//       started = true;
//     }
//   }
// }, false);
function pause(test) {
  if (!test) {
    speechSynthesis.pause();
  } else {
    speechSynthesis.resume();
  }
}

export {
  Speech, pause, cancel, read,
};
