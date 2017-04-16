'use strict';

const kafka = require('kafka-node');
const winston = require('winston');
const Client = kafka.Client;
const Offset = kafka.Offset;
const offset = new Offset(new Client());
const topic = 'topic-mitosis';

// Fetch available offsets
offset.fetch([
  { topic: topic, partition: 0, maxNum: 2 },
  { topic: topic, partition: 1 }
], function (err, offsets) {
  winston.log(err || offsets);
});

// Fetch commited offset
offset.commit('kafka-node-group', [
  { topic: topic, partition: 0 }
], function (err, result) {
  winston.log(err || result);
});
