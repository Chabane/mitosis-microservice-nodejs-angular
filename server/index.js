'use strict';

const express = require('express');
const path = require('path');
const morgan = require('morgan'); // logger
const bodyParser = require('body-parser');
const app = express();
const api = require('./routes/api');
const winston = require('./winston/config');

app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function () {
  winston.info('Mitosis NodeJS App listening on port ' + app.get('port'));
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(morgan('dev'));
app.use('/api', api);

// all other routes are handled by Angular
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '/../dist/index.html'));
});

require('./db/connect');
require('./db/user');
require('./kafka/consumer');

module.exports = app;

var wowweemip = require("wowweemip");
var mipFinder = new wowweemip.Finder();

mipFinder.scan(function(err, robots) {
  if (err != null) {
    console.log(err);
    return;
  }

  //connect to first mip
  var selectedMip = robots[0];
  mipFinder.connect(selectedMip, function(err) {
    if (err != null) {
      console.log(err);
      return;
    }

    console.log("connected");

    //move toward
    selectedMip.driveDistanceByCm(20, 0, function(err) {
      console.log("moving toward");
    });
  });
});
