require('dotenv').config();
const { default: axios } = require('axios');
const express = require('express');
const path = require('path');

const app = express();
const backendURL = 'http://localhost:8080';

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

// this is just for texting the browserdb
app.get('/txt', (req, res) => {
  console.log(req.query.url);
  axios.get(`${req.query.url}`)
    .then((data) => {
      res.status(200).send(data.data);
    });
});

app.get('/search', (req, res) => {
  axios.get(`${backendURL}/search`, {
    params: req.query,
  })
    .then((data) => {
      res.status(200).send(data.data);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

const PORT = process.env.PORT || 3000;

console.log(`Listening on ${PORT}`);
app.listen(PORT);
