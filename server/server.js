require('dotenv').config();
const { default: axios } = require('axios');
const express = require('express');
const path = require('path');

const app = express();
const backendURL = process.env.BACKEND_URL;
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

app.get('/txt', (req, res) => {
  axios.get(`${backendURL}/txt`, {
    params: req.query,
  })
    .then((data) => {
      res.status(200).send(data.data);
    })
    .catch((err) => { console.error(err); });
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

app.get('/popular', (req, res) => {
  axios.get(`${backendURL}/popular`)
    .then((data) => {
      res.status(200).send(data.data);
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
  axios.get(`${backendURL}/collection/${req.params.username}`, {
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

app.post('/frontEndLogin', (req, res) => {
  const { username, password } = req.body;
  axios.post(`${backendURL}/loginUser`, { username, password })
    .then((response) => {
      res.status(201).json(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.post('/frontEndRegister', (req, res) => {
  const { username, password } = req.body;
  axios.post(`${backendURL}/registerUser`, { username, password })
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

app.post('/verifyToken', (req, res) => {
  axios.post(`${backendURL}/verifyToken`, req.body, {
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

app.put('/frontEndLogout', (req, res) => {
  axios.put(`${backendURL}/logoutUser`, req.body, {
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
