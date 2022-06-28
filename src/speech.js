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

//code for the reader
// document.addEventListener('keypress', (event) => {
//   if (event.code === 'Space') {
//     event.preventDefault();
//     if (started) {
//       pause(paused);
//       paused = !paused;
//     } else {
//       started = true;
//       // started = read(document.getElementById('big'));
//       const doc = document.getElementById('big')
//       for (let i = 0; i < doc.children.length; i++) {
//         Speech(doc.children[i].innerText)
//           // eslint-disable-next-line no-loop-func
//           .onend = () => {
//             if (i === doc.children.length - 1) {
//               started = false;
//             }
//           };
//       }
//     }
//   }
// }, false);


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
