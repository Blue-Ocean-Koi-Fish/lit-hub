require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '..', '/public')));
app.use(express.json());

app.get('/book', (req, res) => {
  axios.get('https://www.gutenberg.org/files/1342/1342-0.txt')
    .then((data) => {
      console.log(typeof data);
      //setBook(data);
      res.status(200).send(data.data);
    });
});

console.log(`Listening on ${process.env.PORT}`);
app.listen(process.env.PORT);
