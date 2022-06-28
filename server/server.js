require('dotenv').config();
const { default: axios } = require('axios');
const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '..', '/public')));
app.use(express.json());

//this is just for texting the browserdb
app.get('/txt', (req, res) => {
  console.log(req.url);
  axios.get(`http://localhost:6000${req.url}`)
    .then((data) => {
      res.status(200).send(data.data);
    });
});

console.log(`Listening on ${process.env.PORT}`);
app.listen(process.env.PORT);
