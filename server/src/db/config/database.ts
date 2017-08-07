import mongoose = require("mongoose");
import mockgoose = require("mockgoose");
import * as winston from 'winston';

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV === "testing") {
  mockgoose(mongoose).then((): void => {
    mongoose.connect("mongodb://mitosis.org/TestingDB");
  });
} else {
  mongoose.connect('mongodb://192.168.0.32:27017/mitosis', { useMongoClient: true });
}
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('openUri', function () {
  winston.info('Connected to MongoDB');
});

export { mongoose };


