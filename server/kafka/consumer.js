'use strict';

const kafka = require('kafka-node');
const winston = require('winston');

var Consumer = kafka.Consumer;
var Offset = kafka.Offset;
var Client = kafka.Client;
const argv = require('optimist').argv;
var topic = argv.topic || 'topic-mitosis';

var client = new Client('zookeeper:2181');
var topics = [
    {topic: topic, partition: 1},
    {topic: topic, partition: 0}
];
var options = { autoCommit: false, fetchMaxWaitMs: 1000, fetchMaxBytes: 1024 * 1024 };

var consumer = new Consumer(client, topics, options);
var offset = new Offset(client);

consumer.on('message', function (message) {
  winston.debug(message);
});

consumer.on('error', function (err) {
  winston.info('error yoh', err);
});

/*
* If consumer get `offsetOutOfRange` event, fetch data from the smallest(oldest) offset
*/
consumer.on('offsetOutOfRange', function (topic) {
  topic.maxNum = 2;
  offset.fetch([topic], function (err, offsets) {
    if (err) {
      return winston.error(err);
    }
    var min = Math.min(offsets[topic.topic][topic.partition]);
    consumer.setOffset(topic.topic, topic.partition, min);
  });
});
