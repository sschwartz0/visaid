'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('./middlewares/cors');

const app = express();

app.use(cors);
app.use(bodyParser.json({limit: '30mb'}));
app.use(bodyParser.urlencoded({
  limit: '30mb',
  extended: false,
}));
app.use('/', routes);

module.exports = app;
