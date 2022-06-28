require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

console.log(`Listening on ${process.env.PORT}`);
app.listen(process.env.PORT);
