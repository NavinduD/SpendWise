const express = require('express');
const apps = express();

apps.get('/', function (req, res) {
  res.send('Hello World!');
});

module.exports = apps;

