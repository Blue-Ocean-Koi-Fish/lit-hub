/* eslint-disable react/button-has-type */
import React from 'react';

function Test({ numberOfFish, handleSubmit, userInput }) {
  console.log(numberOfFish);
  return (
    <div>
      {numberOfFish.map(() => (
        <h1>Koi Fish!</h1>
      ))}
      <button id="update">Install Update</button>
      <button onClick={() => handleSubmit(userInput)}>Submit Input</button>
    </div>
  );
}

export default Test;
