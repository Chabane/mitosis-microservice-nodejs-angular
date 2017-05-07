'use strict';

const winston = require('winston');

winston.configure({
  transports: [
    new (winston.transports.File)({filename: 'mitosis-winston.log'})
  ]
});

module.exports = winston;
