'use strict';

const express = require('express');
const app = express();

var server = require('http').Server(app);

require('dotenv').config();

app.get('/', (req, res) => {
  res.status(200).send('home');
});

const PORT = process.env.PORT || 8888;
server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
