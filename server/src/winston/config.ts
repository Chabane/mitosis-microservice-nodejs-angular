import * as winston from 'winston';

winston.configure({
  transports: [
    new (winston.transports.File)({filename: 'mitosis-winston.log'})
  ]
});

export default winston;
