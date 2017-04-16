'use strict';

const express = require('express');
const path = require('path');
const morgan = require('morgan'); // logger
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(__dirname + '/../dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(morgan('dev'));

const db = mongoose.connection;
mongoose.connect('mongodb://mongo:27017/mitosis');
mongoose.Promise = global.Promise;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');

  // all other routes are handled by Angular
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '/../dist/index.html'));
  });

  app.listen(app.get('port'), function () {
    console.log('Mitosis NodeJS App listening on port ' + app.get('port'));
  });
});

module.exports = app;
