require('dotenv').config();
const { default: axios } = require('axios');
const express = require('express');
const path = require('path');

const app = express();
const backendURL = 'http://107.20.126.146:8080';

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

app.get('/txt', (req, res) => {
  axios.get(`${backendURL}/txt`, {
    params: req.query,
  })
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

app.post('/addToCollection', (req, res) => {
  axios.post(`${backendURL}/addToCollection`, req.body, {
    headers: req.headers,
  })
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.put('/updateCollection', (req, res) => {
  console.log('headers', req.headers);
  console.log('body', req.body);
  res.end();
  // axios.put(`${backendURL}/updateCollection`, req.body, {
  //   headers: req.headers,
  // })
  //   .then(() => {
  //     res.sendStatus(201);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.sendStatus(500);
  //   });
});

app.delete('/removeFromCollection', (req, res) => {
  axios.delete(`${backendURL}/removeFromCollection`, {
    headers: req.headers,
  })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.get('/collection/:username', (req, res) => {
  axios.get(`${backendURL}/collection/:username`, {
    headers: req.headers,
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
